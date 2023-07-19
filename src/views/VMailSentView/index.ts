import VMailSentView from './VMailSentView.vue';

interface EmailProvider {
  label: string;
  url: string;
  keyword: string;
}

const GMAIL: EmailProvider = {
  label: 'GMail',
  url: 'https://mail.google.com/',
  keyword: 'gmail.com',
};

const MAILRU: EmailProvider = {
  label: 'Mail.ru',
  url: 'https://e.mail.ru/inbox/',
  keyword: 'mail.ru',
};

const KNOWN_EMAIL_PROVIDERS = [GMAIL, MAILRU];

export { VMailSentView, GMAIL, MAILRU, KNOWN_EMAIL_PROVIDERS };
