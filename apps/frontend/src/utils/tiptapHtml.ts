import { getSchema } from '@tiptap/vue-3';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { DOMOutputSpec, Mark } from '@tiptap/pm/model';
import { getExtensions } from '@/utils/tiptap';

// generateHTML from tiptap needs window, and @tiptap/static-renderer neither escapes text nor
// attribute values, so answers written by students would inject markup. This walks the same
// renderHTML specs with proper escaping, and gives identical output on the server and in the browser.

const VOID_ELEMENTS = new Set([
  'area',
  'br',
  'col',
  'hr',
  'img',
  'input',
  'wbr',
]);

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const renderAttrs = (attrs: Record<string, unknown>) =>
  Object.entries(attrs)
    .filter(
      ([, value]) => value !== null && value !== undefined && value !== false,
    )
    .map(([key, value]) =>
      value === true ? ` ${key}` : ` ${key}="${escapeHtml(String(value))}"`,
    )
    .join('');

const isAttrs = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// `content` fills the hole (0) of the spec, that's where child nodes go
const renderSpec = (spec: DOMOutputSpec, content: string): string => {
  if (typeof spec === 'string') return escapeHtml(spec);
  if (!Array.isArray(spec)) {
    throw new TypeError('Only array DOM output specs can be rendered to HTML');
  }

  const [tag, ...rest] = spec as [string, ...unknown[]];
  const attrs = isAttrs(rest[0])
    ? (rest.shift() as Record<string, unknown>)
    : {};
  // Namespaced tags look like "http://www.w3.org/2000/svg svg"
  const name = tag.split(' ').at(-1) ?? tag;

  if (VOID_ELEMENTS.has(name)) return `<${name}${renderAttrs(attrs)}>`;

  const children = rest
    .map((child) =>
      child === 0 ? content : renderSpec(child as DOMOutputSpec, content),
    )
    .join('');

  return `<${name}${renderAttrs(attrs)}>${children}</${name}>`;
};

const renderMarks = (marks: readonly Mark[], html: string) =>
  marks.reduceRight((inner, mark) => {
    const toDOM = mark.type.spec.toDOM;
    return toDOM ? renderSpec(toDOM(mark, true), inner) : inner;
  }, html);

const renderNode = (node: ProseMirrorNode): string => {
  if (node.isText) return renderMarks(node.marks, escapeHtml(node.text ?? ''));

  const children: string[] = [];
  node.forEach((child) => children.push(renderNode(child)));

  const toDOM = node.type.spec.toDOM;
  const html = toDOM
    ? renderSpec(toDOM(node), children.join(''))
    : children.join('');

  return renderMarks(node.marks, html);
};

// The schema never changes, so one instance serves every render
let schema: ReturnType<typeof getSchema> | undefined;

export const tiptapToHtml = (content: Record<string, unknown>) => {
  schema ??= getSchema(getExtensions({ placeholder: '' }));
  return renderNode(ProseMirrorNode.fromJSON(schema, content));
};
