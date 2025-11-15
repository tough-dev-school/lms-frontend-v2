import fs from 'node:fs';
import path from 'node:path';
import { parse, SgNode, Lang } from '@ast-grep/napi';

const typesDirectory = 'src/api/generated/';
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

      const name = nameNode.text().replace('?', '');
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

      const typeText = typeNode.text();

      // Primary keys (slug, id, uuid) can't be undefined
      if (['slug', 'id', 'uuid'].includes(name)) {
        const newText = text.replace('?:', ':');
        edits.push({
          start: node.range().start.index,
          end: node.range().end.index,
          replacement: newText,
        });
        return;
      }

      // name can't be undefined
      if (name === 'name') {
        const newText = text.replace('?:', ':');
        edits.push({
          start: node.range().start.index,
          end: node.range().end.index,
          replacement: newText,
        });
        return;
      }

      if (name === 'created') {
        const newText = text.replace('?:', ':');
        edits.push({
          start: node.range().start.index,
          end: node.range().end.index,
          replacement: newText,
        });
        return;
      }

      // nullable fields (string | null) can't be undefined
      if (typeText.includes('string | null')) {
        const newText = text.replace('?:', ':');
        edits.push({
          start: node.range().start.index,
          end: node.range().end.index,
          replacement: newText,
        });
        return;
      }

      // arrays can't be undefined, they can be empty
      if (typeText.includes('[]')) {
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

for (const file of files) {
  const filePath = path.join(typesDirectory, file);
  let fileContent = fs.readFileSync(filePath, 'utf8');
  const patches: ApplyPatch[] = [
    removeReadonlyModifiers,
    fixOptionalProperties,
  ];

  for (const patch of patches) {
    const ast = getAst(fileContent);
    const edits = patch(ast);
    fileContent = applyTransformations(edits, fileContent);
  }

  fs.writeFileSync(filePath, fileContent);
}
