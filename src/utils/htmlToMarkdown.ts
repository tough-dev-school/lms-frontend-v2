import TurndownService from 'turndown';

// De-escape links, see:
// https://github.com/mixmark-io/turndown#escaping-markdown-characters
// https://github.com/mixmark-io/turndown/blob/97e4535ca76bb2e70d9caa2aa4d4686956b06d44/src/turndown.js

const escapes: [RegExp, string][] = [
  [/\\/g, '\\\\'],
  [/\*/g, '\\*'],
  [/^-/g, '\\-'],
  [/^\+ /g, '\\+ '],
  [/^(=+)/g, '\\$1'],
  [/^(#{1,6}) /g, '\\$1 '],
  [/`/g, '\\`'],
  [/^~~~/g, '\\~~~'],
  [/\[/g, '\\['],
  [/\]/g, '\\]'],
  [/^>/g, '\\>'],
  [/_/g, '\\_'],
  [/^(\d+)\. /g, '$1\\. '],
];

const URL_REGEX =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(URL_REGEX);

TurndownService.prototype.escape = function (string) {
  if (string.match(regex)) return string;
  return escapes.reduce(function (accumulator, escape) {
    return accumulator.replace(escape[0], escape[1]);
  }, string);
};

const turndownService = new TurndownService();

const htmlToMarkdown = (html: string) => turndownService.turndown(html);

export default htmlToMarkdown;
