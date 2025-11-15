import fs from 'node:fs';
import path from 'node:path';
import { parse, SgNode, Lang } from '@ast-grep/napi';

const typesDirectory = 'src/api/generated/types';
const files = fs.readdirSync(typesDirectory);

function applyTransformations(fileContent: string): string {
  const ast = parse(Lang.TypeScript, fileContent);
  const root = ast.root();

  const edits: { start: number; end: number; replacement: string }[] = [];

  // Kubb issues: Remove readonly modifiers
  root.findAll({ rule: { kind: 'readonly_type' } }).forEach((node: SgNode) => {
    const readonlyNode = node.child(0);
    if (readonlyNode?.text() === 'readonly') {
      edits.push({
        start: readonlyNode.range().start.index,
        end: readonlyNode.range().end.index + 1, // +1 for the space after
        replacement: '',
      });
    }
  });

  // Backend issues: Fix optional properties
  root
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

  // Sort edits by start position in descending order to apply from end to start
  edits.sort((a, b) => b.start - a.start);

  // Apply edits from end to start
  let result = fileContent;
  edits.forEach((edit) => {
    result =
      result.slice(0, edit.start) + edit.replacement + result.slice(edit.end);
  });

  return result;
}

files.forEach((file) => {
  const filePath = path.join(typesDirectory, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const transformedContent = applyTransformations(fileContent);
  fs.writeFileSync(filePath, transformedContent);
});
