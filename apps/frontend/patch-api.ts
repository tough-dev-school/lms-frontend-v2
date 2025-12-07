import fs from 'node:fs';
import path from 'node:path';
import { parse, SgNode, Lang } from '@ast-grep/napi';

const typesDirectory = 'src/api/generated/types';
const files = fs.readdirSync(typesDirectory);

interface Edit {
  start: number;
  end: number;
  replacement: string;
}

type ApplyPatch = (ast: SgNode) => Edit[];

const getAst = (fileContent: string) => {
  const ast = parse(Lang.TypeScript, fileContent);
  return ast.root();
};

const applyTransformations = (edits: Edit[], fileContent: string) => {
  edits.sort((a, b) => b.start - a.start);

  // Apply edits from end to start
  let result = fileContent;
  edits.forEach((edit) => {
    result =
      result.slice(0, edit.start) + edit.replacement + result.slice(edit.end);
  });

  return result;
};

const removeReadonlyModifiers: ApplyPatch = (ast) => {
  const edits: Edit[] = [];

  // Handle readonly in property signatures (e.g., readonly price?: Price)
  ast
    .findAll({ rule: { kind: 'property_signature' } })
    .forEach((node: SgNode) => {
      const children = node.children();
      for (const child of children) {
        if (child.text() === 'readonly') {
          edits.push({
            start: child.range().start.index,
            end: child.range().end.index + 1,
            replacement: '',
          });
          break;
        }
      }
    });

  // Handle readonly_type for type-level readonly (e.g., readonly string[])
  ast.findAll({ rule: { kind: 'readonly_type' } }).forEach((node: SgNode) => {
    const readonlyNode = node.child(0);
    if (readonlyNode?.text() === 'readonly') {
      edits.push({
        start: readonlyNode.range().start.index,
        end: readonlyNode.range().end.index + 1,
        replacement: '',
      });
    }
  });

  return edits;
};

const fixOptionalProperties: ApplyPatch = (ast) => {
  const edits: Edit[] = [];

  ast
    .findAll({ rule: { kind: 'property_signature' } })
    .forEach((node: SgNode) => {
      const text = node.text();
      const nameNode = node.child(0);
      if (!nameNode) return;

      // const name = nameNode.text().replace('?', '');
      const questionMark = text.includes('?:');

      if (!questionMark) return;

      // Skip transformation for Patched/Create types (partial updates/creation)
      let parent = node.parent();
      while (parent) {
        const parentText = parent.text();
        if (
          (parent.kind() === 'interface_declaration' ||
            parent.kind() === 'type_alias_declaration') &&
          (parentText.includes('Patched') || parentText.includes('Create'))
        ) {
          return;
        }
        parent = parent.parent();
      }

      const children = node.children();
      const typeNode = children.at(-1);
      if (!typeNode) return;

      let typeText = typeNode.text();

      // Remove the leading colon and space from type annotation
      if (typeText.startsWith(': ')) {
        typeText = typeText.slice(2);
      }

      // nullable fields (string | null) can't be undefined
      if (/\w+ \| null/.test(typeText)) {
        const newText = text.replace('?:', ':');
        edits.push({
          start: node.range().start.index,
          end: node.range().end.index,
          replacement: newText,
        });
      }
    });

  return edits;
};

const omitAnswerFields: ApplyPatch = (ast) => {
  const edits: Edit[] = [];
  const fullText = ast.text();

  const interfaces = ast.findAll({
    rule: {
      any: [
        { kind: 'interface_declaration' },
        { kind: 'type_alias_declaration' },
      ],
    },
  });

  const targetInterfaces = new Set(['Answer', 'AnswerTree', 'AnswerCreate']);

  for (const interfaceNode of interfaces) {
    const nameNode = interfaceNode.child(1);
    const interfaceName = nameNode?.text();

    if (!interfaceName || !targetInterfaces.has(interfaceName)) continue;

    // For type_alias_declaration, we need to find the object_type node
    // For interface_declaration, body is at child(2)
    let bodyNode = interfaceNode.find({ rule: { kind: 'object_type' } });
    if (!bodyNode) {
      bodyNode = interfaceNode.child(2);
    }
    if (!bodyNode) continue;

    bodyNode.children().forEach((child: SgNode) => {
      if (child.kind() !== 'property_signature') return;

      const propertyName = child.child(0);
      if (!propertyName) return;

      const name = propertyName.text().replace('?', '');
      if (name !== 'text' && name !== 'src') return;

      const nodeStart = child.range().start.index;
      const nodeEnd = child.range().end.index;

      // Find the start of the line
      let lineStart = nodeStart;
      while (lineStart > 0 && fullText[lineStart - 1] !== '\n') {
        lineStart -= 1;
      }

      // Find the end of the line (including newline)
      let lineEnd = nodeEnd;
      while (lineEnd < fullText.length && fullText[lineEnd] !== '\n') {
        lineEnd += 1;
      }
      if (lineEnd < fullText.length && fullText[lineEnd] === '\n') {
        lineEnd += 1;
      }

      edits.push({
        start: lineStart,
        end: lineEnd,
        replacement: '',
      });
    });
  }

  return edits;
};

const fixAnswerTreeDescendants: ApplyPatch = (ast) => {
  const edits: Edit[] = [];

  const interfaces = ast.findAll({
    rule: {
      any: [
        { kind: 'interface_declaration' },
        { kind: 'type_alias_declaration' },
      ],
    },
  });

  for (const interfaceNode of interfaces) {
    const nameNode = interfaceNode.child(1);
    const interfaceName = nameNode?.text();

    if (interfaceName !== 'AnswerTree') continue;

    // For type_alias_declaration, we need to find the object_type node
    // For interface_declaration, body is at child(2)
    let bodyNode = interfaceNode.find({ rule: { kind: 'object_type' } });
    if (!bodyNode) {
      bodyNode = interfaceNode.child(2);
    }
    if (!bodyNode) continue;

    bodyNode.children().forEach((child: SgNode) => {
      if (child.kind() !== 'property_signature') return;

      const propertyName = child.child(0);
      if (!propertyName) return;

      const name = propertyName.text().replace('?', '');
      if (name !== 'descendants') return;

      // Find the type annotation
      const children = child.children();
      const typeNode = children.at(-1);
      if (!typeNode) return;

      const typeText = typeNode.text();

      // Replace Answer[] with AnswerTree[]
      if (typeText.includes('Answer[]')) {
        const newTypeText = typeText.replace('Answer[]', 'AnswerTree[]');
        edits.push({
          start: typeNode.range().start.index,
          end: typeNode.range().end.index,
          replacement: newTypeText,
        });
      }
    });
  }

  return edits;
};

const makeJWTTokenOptional: ApplyPatch = (ast) => {
  const edits: Edit[] = [];

  const interfaces = ast.findAll({
    rule: {
      any: [
        { kind: 'interface_declaration' },
        { kind: 'type_alias_declaration' },
      ],
    },
  });

  for (const interfaceNode of interfaces) {
    const nameNode = interfaceNode.child(1);
    const interfaceName = nameNode?.text();

    if (interfaceName !== 'JSONWebToken') continue;

    // For type_alias_declaration, we need to find the object_type node
    // For interface_declaration, body is at child(2)
    let bodyNode = interfaceNode.find({ rule: { kind: 'object_type' } });
    if (!bodyNode) {
      bodyNode = interfaceNode.child(2);
    }
    if (!bodyNode) continue;

    bodyNode.children().forEach((child: SgNode) => {
      if (child.kind() !== 'property_signature') return;

      const propertyName = child.child(0);
      if (!propertyName) return;

      const name = propertyName.text().replace('?', '');
      if (name !== 'token') return;

      // Check if it's already optional
      const text = child.text();
      if (text.includes('?:')) return;

      // Make it optional by replacing : with ?:
      const newText = text.replace('token:', 'token?:');
      edits.push({
        start: child.range().start.index,
        end: child.range().end.index,
        replacement: newText,
      });
    });
  }

  return edits;
};

const removeSlugFromReactionCreate: ApplyPatch = (ast) => {
  const edits: Edit[] = [];
  const fullText = ast.text();

  const interfaces = ast.findAll({
    rule: {
      any: [
        { kind: 'interface_declaration' },
        { kind: 'type_alias_declaration' },
      ],
    },
  });

  for (const interfaceNode of interfaces) {
    const nameNode = interfaceNode.child(1);
    const interfaceName = nameNode?.text();

    if (interfaceName !== 'ReactionCreate') continue;

    // For type_alias_declaration, we need to find the object_type node
    // For interface_declaration, body is at child(2)
    let bodyNode = interfaceNode.find({ rule: { kind: 'object_type' } });
    if (!bodyNode) {
      bodyNode = interfaceNode.child(2);
    }
    if (!bodyNode) continue;

    bodyNode.children().forEach((child: SgNode) => {
      if (child.kind() !== 'property_signature') return;

      const propertyName = child.child(0);
      if (!propertyName) return;

      const name = propertyName.text().replace('?', '');
      if (name !== 'slug') return;

      const nodeStart = child.range().start.index;
      const nodeEnd = child.range().end.index;

      // Find the start of the line
      let lineStart = nodeStart;
      while (lineStart > 0 && fullText[lineStart - 1] !== '\n') {
        lineStart -= 1;
      }

      // Find the end of the line (including newline)
      let lineEnd = nodeEnd;
      while (lineEnd < fullText.length && fullText[lineEnd] !== '\n') {
        lineEnd += 1;
      }
      if (lineEnd < fullText.length && fullText[lineEnd] === '\n') {
        lineEnd += 1;
      }

      edits.push({
        start: lineStart,
        end: lineEnd,
        replacement: '',
      });
    });
  }

  return edits;
};

const removeQuestionFromHomeworkStats: ApplyPatch = (ast) => {
  const edits: Edit[] = [];
  const fullText = ast.text();

  const interfaces = ast.findAll({
    rule: {
      any: [
        { kind: 'interface_declaration' },
        { kind: 'type_alias_declaration' },
      ],
    },
  });

  for (const interfaceNode of interfaces) {
    const nameNode = interfaceNode.child(1);
    const interfaceName = nameNode?.text();

    if (interfaceName !== 'HomeworkStats') continue;

    // For type_alias_declaration, we need to find the object_type node
    // For interface_declaration, body is at child(2)
    let bodyNode = interfaceNode.find({ rule: { kind: 'object_type' } });
    if (!bodyNode) {
      bodyNode = interfaceNode.child(2);
    }
    if (!bodyNode) continue;

    bodyNode.children().forEach((child: SgNode) => {
      if (child.kind() !== 'property_signature') return;

      const propertyName = child.child(0);
      if (!propertyName) return;

      const name = propertyName.text().replace('?', '');
      if (name !== 'question') return;

      const nodeStart = child.range().start.index;
      const nodeEnd = child.range().end.index;

      // Find the start of the line
      let lineStart = nodeStart;
      while (lineStart > 0 && fullText[lineStart - 1] !== '\n') {
        lineStart -= 1;
      }

      // Find the end of the line (including newline)
      let lineEnd = nodeEnd;
      while (lineEnd < fullText.length && fullText[lineEnd] !== '\n') {
        lineEnd += 1;
      }
      if (lineEnd < fullText.length && fullText[lineEnd] === '\n') {
        lineEnd += 1;
      }

      edits.push({
        start: lineStart,
        end: lineEnd,
        replacement: '',
      });
    });
  }

  return edits;
};

for (const file of files) {
  const filePath = path.join(typesDirectory, file);
  let fileContent = fs.readFileSync(filePath, 'utf8');
  const patches: ApplyPatch[] = [
    removeReadonlyModifiers,
    fixOptionalProperties,
    omitAnswerFields,
    fixAnswerTreeDescendants,
    makeJWTTokenOptional,
    removeSlugFromReactionCreate,
    removeQuestionFromHomeworkStats,
  ];

  for (const patch of patches) {
    const ast = getAst(fileContent);
    const edits = patch(ast);
    fileContent = applyTransformations(edits, fileContent);
  }

  fs.writeFileSync(filePath, fileContent);
}
