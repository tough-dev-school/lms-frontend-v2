import TurndownService from 'turndown';

const turndownService = new TurndownService();

const htmlToMarkdown = (html: string) => turndownService.turndown(html);

export default htmlToMarkdown;
