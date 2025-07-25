import TurndownService from 'turndown';

// De-escape links, see:
// https://github.com/mixmark-io/turndown#escaping-markdown-characters
// https://github.com/mixmark-io/turndown/blob/97e4535ca76bb2e70d9caa2aa4d4686956b06d44/src/turndown.js

const escapes: Array<[RegExp, string]> = [
  [/\\/g, '\\\\'],
  [/\*/g, String.raw`\*`],
  [/^-/g, String.raw`\-`],
  [/^\+ /g, String.raw`\+ `],
  [/^(=+)/g, String.raw`\$1`],
  [/^(#{1,6}) /g, String.raw`\$1 `],
  [/`/g, '\\`'],
  [/^~~~/g, String.raw`\~~~`],
  [/\[/g, String.raw`\[`],
  [/]/g, String.raw`\]`],
  [/^>/g, String.raw`\>`],
  [/_/g, String.raw`\_`],
  [/^(\d+)\. /g, String.raw`$1\. `],
];

const URL_REGEX =
  /[\w#%+.:=@~-]{1,256}\.[\d()a-z]{1,6}\b([\w#%&()+./:=?@~-]*)?/gi;  
const regex = new RegExp(URL_REGEX);

TurndownService.prototype.escape = function (string) {
  if (string.match(regex)) {return string;}
  return escapes.reduce((accumulator, escape) => {
    return accumulator.replace(escape[0], escape[1]);
  }, string);
};

const turndownService = new TurndownService();

const htmlToMarkdown = (html: string) => turndownService.turndown(html);

export default htmlToMarkdown;
