import VMailSentView from './VMailSentView.vue';

interface EmailProvider {
  keyword: string;
  label: string;
  url: string;
}

const GMAIL: EmailProvider = {
  keyword: 'gmail.com',
  label: 'GMail',
  url: 'https://mail.google.com/',
};

const MAILRU: EmailProvider = {
  keyword: 'mail.ru',
  label: 'Mail.ru',
  url: 'https://e.mail.ru/inbox/',
};

const KNOWN_EMAIL_PROVIDERS = [GMAIL, MAILRU];

export { GMAIL, KNOWN_EMAIL_PROVIDERS, MAILRU, VMailSentView };
