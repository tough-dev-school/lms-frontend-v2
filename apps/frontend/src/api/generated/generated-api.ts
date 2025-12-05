/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum RecommendedVideoProviderEnum {
  Youtube = 'youtube',
  Rutube = 'rutube',
}

/**
 * * `RU` - Русский
 * * `EN` - Английский
 */
export enum LanguageEnum {
  RU = 'RU',
  EN = 'EN',
}

/**
 * * `male` - Мужчина
 * * `female` - Женщина
 */
export enum GenderEnum {
  Male = 'male',
  Female = 'female',
}

export enum DesiredBankEnum {
  B2B = 'b2b',
  Dolyame = 'dolyame',
  Stripe = 'stripe',
  StripeKz = 'stripe_kz',
  TinkoffBank = 'tinkoff_bank',
  ZeroPrice = 'zero_price',
}

export enum BlankEnum {
  Value = '',
}

export interface Answer {
  /** @format date-time */
  created: string;
  /** @format date-time */
  modified: string | null;
  /** @format uuid */
  slug: string;
  question: string;
  author: UserSafe;
  /** @format uuid */
  parent: string;
  legacy_text: string;
  content?: any;
  has_descendants: boolean;
  is_editable: boolean;
  reactions: ReactionDetailed[];
}

export interface AnswerCreate {
  /** @format uuid */
  question: string;
  /** @format uuid */
  parent?: string | null;
  content?: any;
}

export interface AnswerImage {
  /** @format uri */
  image: string;
}

export interface AnswerImageRequest {
  /** @format binary */
  image: File;
}

export interface AnswerSimple {
  /** @format uuid */
  slug: string;
  /** @format uri */
  url: string;
  author: UserSafe;
  question: Question;
}

export interface AnswerTree {
  /** @format date-time */
  created: string;
  /** @format date-time */
  modified: string | null;
  /** @format uuid */
  slug: string;
  question: string;
  author: UserSafe;
  /** @format uuid */
  parent: string;
  legacy_text: string;
  content?: any;
  has_descendants: boolean;
  is_editable: boolean;
  reactions: ReactionDetailed[];
  descendants: AnswerTree[];
}

export interface AnswerUpdate {
  content: Record<string, any>;
}

export interface Breadcrumbs {
  module: Module;
  course: LMSCourse;
  lesson: LessonPlain;
}

export interface Call {
  /**
   * Название
   * @maxLength 255
   */
  name: string;
  /**
   * Описание
   * @maxLength 512
   */
  description: string | null;
  /**
   * Ссылка
   * @format uri
   * @maxLength 255
   */
  url: string | null;
  video: VideoProvider[];
  /**
   * Дата
   * @format date-time
   */
  datetime: string | null;
  recommended_video_provider: RecommendedVideoProviderEnum | null;
}

export interface CommentStats {
  comments: number;
  hidden_before_crosscheck_completed: number | null;
}

export interface Course {
  id: number;
  /**
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  name: string;
  /**
   * Название
   * @maxLength 255
   */
  product_name: string;
  tariff_name: string | null;
  home_page_slug: string;
  /** @format uri */
  cover: string | null;
  /**
   * Чат
   * @format uri
   * @maxLength 200
   */
  chat: string | null;
  /**
   * Календарь (iOS)
   * @format uri
   * @maxLength 200
   */
  calendar_ios: string | null;
  /**
   * Календарь (Google)
   * @format uri
   * @maxLength 200
   */
  calendar_google: string | null;
  links: CourseLink[];
}

export interface CourseLink {
  /**
   * Название
   * @maxLength 255
   */
  name: string;
  /**
   * Ссылка
   * @maxLength 255
   */
  url: string;
}

export interface CourseSimple {
  name: string;
  /**
   * Название для международных покупок
   * @maxLength 255
   */
  name_international: string;
  /**
   * Название
   * @maxLength 255
   */
  product_name: string;
  /**
   * Тариф
   * @maxLength 64
   */
  tariff_name: string | null;
}

/** Course with commercial data. Requires bank context */
export interface CourseWithPrice {
  /**
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  name: string;
  /**
   * Название для международных покупок
   * @maxLength 255
   */
  name_international: string;
  /**
   * Название
   * @maxLength 255
   */
  product_name: string;
  /**
   * Тариф
   * @maxLength 64
   */
  tariff_name: string | null;
  price: Price;
}

export interface CrossCheck {
  id: number;
  answer: AnswerSimple;
  is_checked: boolean;
}

export interface CrossCheckStats {
  total: number;
  checked: number;
}

export interface Diploma {
  course: CourseSimple;
  /** @maxLength 32 */
  slug: string;
  /** Язык */
  language: LanguageEnum;
  /**
   * Обложка
   * @format uri
   */
  image: string;
  student: UserSafe;
  /** @format uri */
  url: string;
}

export interface DiplomaCreate {
  student: number;
  course: number;
  /** Язык */
  language: LanguageEnum;
  /**
   * Обложка
   * @format uri
   */
  image: string;
}

export interface DiplomaRetrieve {
  course: CourseSimple;
  /** @maxLength 32 */
  slug: string;
  /** Язык */
  language: LanguageEnum;
  /**
   * Обложка
   * @format uri
   */
  image: string;
  student: UserSafe;
  other_languages: Record<string, any>;
}

/** Requires *any* model annotaded with statistics. For annotation examples check homework.QuestionQuerySet */
export interface HomeworkStats {
  is_sent: boolean;
  crosschecks?: CrossCheckStats;
  comments?: CommentStats;
  question: TemporarySoonToBeDepricatedQuestion;
}

/**
 * Serializer class used to validate a username and password.
 *
 * 'username' is identified by the custom UserModel.USERNAME_FIELD.
 *
 * Returns a JSON Web Token that can be used to authenticate later calls.
 */
export interface JSONWebToken {
  password: string;
  token?: string;
  username: string;
}

export interface LMSCourse {
  id: number;
  /**
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  name: string;
  /**
   * Обложка
   * Обложка курса
   * @format uri
   */
  cover?: string;
  /**
   * Чат
   * @format uri
   * @maxLength 200
   */
  chat: string | null;
  /**
   * Календарь (iOS)
   * @format uri
   * @maxLength 200
   */
  calendar_ios: string | null;
  /**
   * Календарь (Google)
   * @format uri
   * @maxLength 200
   */
  calendar_google: string | null;
  /** Рекомендации по проверке домашки */
  homework_check_recommendations: string;
}

/** Serialize lesson for the user, lesson should be annotated with crosschecks stats */
export interface Lesson {
  id: number;
  material?: NotionMaterial;
  homework: HomeworkStats;
  question: Question;
  call?: Call;
}

export interface LessonPlain {
  id: number;
}

export interface MaterialSerilizer {
  breadcrumbs: Breadcrumbs;
  content: Record<string, any>;
}

export interface Module {
  id: number;
  /** @maxLength 255 */
  name: string;
  /**
   * Дата начала
   * @format date-time
   */
  start_date: string | null;
  has_started: boolean;
  /**
   * Подзаг
   * @maxLength 512
   */
  description: string | null;
  /** Текст */
  text: string | null;
}

export interface ModuleDetail {
  id: number;
  /** @maxLength 255 */
  name: string;
  /**
   * Дата начала
   * @format date-time
   */
  start_date: string | null;
  has_started: boolean;
  /**
   * Подзаг
   * @maxLength 512
   */
  description: string | null;
  /** Текст */
  text: string | null;
  lesson_count: number;
  single_lesson_id: number;
}

export interface NotionCacheEntryStatus {
  /** @format date-time */
  fetch_started: string | null;
  /** @format date-time */
  fetch_complete: string | null;
}

export interface NotionMaterial {
  id: string;
  /**
   * Заголовок страницы
   * Если не указать — попробуем скачать из ноушена
   * @maxLength 128
   */
  title?: string;
}

export interface Ok {
  ok: boolean;
}

export interface OrderDraft {
  course: CourseSimple;
  price: Price;
}

export interface OrderDraftRequest {
  course: string;
  promocode?: string;
  /**
   * * `b2b` - B2B
   * * `dolyame` - Долями
   * * `stripe` - Страйп
   * * `stripe_kz` - Страйп
   * * `tinkoff_bank` - Тинькофф
   * * `zero_price` - Бесплатно
   */
  desired_bank?: DesiredBankEnum;
}

export interface PaginatedAnswerList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous: string | null;
  results: Answer[];
}

export interface PaginatedCourseList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous: string | null;
  results: Course[];
}

export interface PaginatedDiplomaList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous: string | null;
  results: Diploma[];
}

export interface PaginatedLessonList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous: string | null;
  results: Lesson[];
}

export interface PaginatedModuleDetailList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous: string | null;
  results: ModuleDetail[];
}

export interface PaginatedUserList {
  /** @example 123 */
  count: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous: string | null;
  results: User[];
}

export interface PasswordChange {
  /** @maxLength 128 */
  new_password1: string;
  /** @maxLength 128 */
  new_password2: string;
}

/** Serializer for requesting a password reset e-mail. */
export interface PasswordReset {
  /** @format email */
  email: string;
}

/** Serializer for confirming a password reset attempt. */
export interface PasswordResetConfirm {
  /** @maxLength 128 */
  new_password1: string;
  /** @maxLength 128 */
  new_password2: string;
  uid: string;
  token: string;
}

export interface PatchedAnswerUpdate {
  content?: Record<string, any>;
}

export interface PatchedDiploma {
  course?: CourseSimple;
  /** @maxLength 32 */
  slug: string;
  /** Язык */
  language?: LanguageEnum;
  /**
   * Обложка
   * @format uri
   */
  image?: string;
  student?: UserSafe;
  /** @format uri */
  url?: string;
}

export interface PatchedUserSelfUpdate {
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Имя на английском
   * @maxLength 150
   */
  first_name_en?: string;
  /**
   * Фамилия на английском
   * @maxLength 150
   */
  last_name_en?: string;
  /** Пол */
  gender?: GenderEnum | BlankEnum;
  /** @maxLength 256 */
  github_username?: string;
  /** @maxLength 256 */
  linkedin_username?: string;
  /** @maxLength 256 */
  telegram_username?: string;
  /**
   * Аватар
   * @format uri
   */
  avatar?: string | null;
}

export interface Price {
  /**
   * @format decimal
   * @pattern ^-?\d{0,7}(?:\.\d{0,2})?$
   */
  price: string;
  formatted_price: string;
  /** @maxLength 4 */
  currency: string;
  /** @maxLength 1 */
  currency_symbol: string;
}

export interface Purchase {
  name: string;
  /** @format email */
  email: string;
  /**
   * * `b2b` - B2B
   * * `dolyame` - Долями
   * * `stripe` - Страйп
   * * `stripe_kz` - Страйп
   * * `tinkoff_bank` - Тинькофф
   * * `zero_price` - Бесплатно
   */
  desired_bank?: DesiredBankEnum;
  /** @maxLength 100 */
  promocode?: string;
  /** @maxLength 256 */
  success_url?: string;
  /** @maxLength 256 */
  redirect_url?: string;
  /**
   * @maxLength 5
   * @default ""
   */
  subscribe?: string;
  analytics?: string;
}

export interface Question {
  /** @format uuid */
  slug: string;
  /**
   * Название
   * @maxLength 256
   */
  name: string;
  markdown_text: string;
  /**
   * Дедлайн
   * @format date-time
   */
  deadline: string | null;
}

export interface QuestionCourse {
  id: number;
  /**
   * @maxLength 50
   * @pattern ^[-a-zA-Z0-9_]+$
   */
  slug: string;
  name: string;
  /**
   * Обложка
   * Обложка курса
   * @format uri
   */
  cover?: string;
  /**
   * Чат
   * @format uri
   * @maxLength 200
   */
  chat: string | null;
  /**
   * Календарь (iOS)
   * @format uri
   * @maxLength 200
   */
  calendar_ios: string | null;
  /**
   * Календарь (Google)
   * @format uri
   * @maxLength 200
   */
  calendar_google: string | null;
  /** Рекомендации по проверке домашки */
  homework_check_recommendations: string;
}

export interface QuestionDetail {
  breadcrumbs: Breadcrumbs;
  /** @format uuid */
  slug: string;
  /**
   * Название
   * @maxLength 256
   */
  name: string;
  markdown_text: string;
  /**
   * Дедлайн
   * @format date-time
   */
  deadline: string | null;
  /** Requires *any* model annotaded with statistics. For annotation examples check homework.QuestionQuerySet */
  homework: HomeworkStats;
  course: QuestionCourse;
}

export interface ReactionCreate {
  /** @maxLength 10 */
  emoji: string;
  /** @format uuid */
}

export interface ReactionDetailed {
  /** @format uuid */
  slug: string;
  /** @maxLength 10 */
  emoji: string;
  author: UserSafe;
  answer: string;
}

export interface RestAuthDetail {
  detail: string;
}

export interface TemporarySoonToBeDepricatedQuestion {
  /** @format uuid */
  slug: string;
  /**
   * Название
   * @maxLength 256
   */
  name: string;
  /**
   * Дедлайн
   * @format date-time
   */
  deadline: string | null;
}

export interface Token {
  token: string;
}

export interface User {
  id: number;
  /** @format uuid */
  uuid: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Имя на английском
   * @maxLength 150
   */
  first_name_en?: string;
  /**
   * Фамилия на английском
   * @maxLength 150
   */
  last_name_en?: string;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /** Пол */
  gender?: GenderEnum | BlankEnum;
  /** @maxLength 256 */
  github_username?: string;
  /** @maxLength 256 */
  linkedin_username?: string;
  /** @maxLength 256 */
  telegram_username?: string;
  /**
   * Аватар
   * @format uri
   */
  avatar: string | null;
}

export interface UserSafe {
  /** @format uuid */
  uuid: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Имя на английском
   * @maxLength 150
   */
  first_name_en?: string;
  /**
   * Фамилия на английском
   * @maxLength 150
   */
  last_name_en?: string;
  /**
   * Аватар
   * @format uri
   */
  avatar: string | null;
}

export interface UserSelf {
  id: number;
  /** @format uuid */
  uuid: string;
  /**
   * Имя пользователя
   * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Имя
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Фамилия
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Имя на английском
   * @maxLength 150
   */
  first_name_en?: string;
  /**
   * Фамилия на английском
   * @maxLength 150
   */
  last_name_en?: string;
  /**
   * Адрес электронной почты
   * @format email
   * @maxLength 254
   */
  email?: string;
  /** Пол */
  gender?: GenderEnum | BlankEnum;
  /** @maxLength 256 */
  github_username?: string;
  /** @maxLength 256 */
  linkedin_username?: string;
  /** @maxLength 256 */
  telegram_username?: string;
  /**
   * Аватар
   * @format uri
   */
  avatar: string | null;
  /**
   * Статус персонала
   * Отметьте, если пользователь может входить в административную часть сайта.
   */
  is_staff?: boolean;
}

export interface VideoProvider {
  provider: string;
  /** @format uri */
  embed: string;
  /** @format uri */
  src: string;
}

export interface CourseGroupsCoursesListParams {
  /** Optional bank to calculate price */
  desired_bank?: string;
  slug: string;
}

export interface CoursesPromocodeRetrieveParams {
  desired_bank?: DesiredBankEnum;
  promocode?: string;
  slug: string;
}

export enum CoursesPromocodeRetrieveParams1DesiredBankEnum {
  B2B = 'b2b',
  Dolyame = 'dolyame',
  Stripe = 'stripe',
  StripeKz = 'stripe_kz',
  TinkoffBank = 'tinkoff_bank',
  ZeroPrice = 'zero_price',
}

export interface DiplomasListParams {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface DocsSchemaRetrieveParams {
  format?: FormatEnum;
  lang?: LangEnum;
}

export enum FormatEnum {
  Json = 'json',
  Yaml = 'yaml',
}

export enum LangEnum {
  Af = 'af',
  Ar = 'ar',
  ArDz = 'ar-dz',
  Ast = 'ast',
  Az = 'az',
  Be = 'be',
  Bg = 'bg',
  Bn = 'bn',
  Br = 'br',
  Bs = 'bs',
  Ca = 'ca',
  Ckb = 'ckb',
  Cs = 'cs',
  Cy = 'cy',
  Da = 'da',
  De = 'de',
  Dsb = 'dsb',
  El = 'el',
  En = 'en',
  EnAu = 'en-au',
  EnGb = 'en-gb',
  Eo = 'eo',
  Es = 'es',
  EsAr = 'es-ar',
  EsCo = 'es-co',
  EsMx = 'es-mx',
  EsNi = 'es-ni',
  EsVe = 'es-ve',
  Et = 'et',
  Eu = 'eu',
  Fa = 'fa',
  Fi = 'fi',
  Fr = 'fr',
  Fy = 'fy',
  Ga = 'ga',
  Gd = 'gd',
  Gl = 'gl',
  He = 'he',
  Hi = 'hi',
  Hr = 'hr',
  Hsb = 'hsb',
  Hu = 'hu',
  Hy = 'hy',
  Ia = 'ia',
  Id = 'id',
  Ig = 'ig',
  Io = 'io',
  Is = 'is',
  It = 'it',
  Ja = 'ja',
  Ka = 'ka',
  Kab = 'kab',
  Kk = 'kk',
  Km = 'km',
  Kn = 'kn',
  Ko = 'ko',
  Ky = 'ky',
  Lb = 'lb',
  Lt = 'lt',
  Lv = 'lv',
  Mk = 'mk',
  Ml = 'ml',
  Mn = 'mn',
  Mr = 'mr',
  Ms = 'ms',
  My = 'my',
  Nb = 'nb',
  Ne = 'ne',
  Nl = 'nl',
  Nn = 'nn',
  Os = 'os',
  Pa = 'pa',
  Pl = 'pl',
  Pt = 'pt',
  PtBr = 'pt-br',
  Ro = 'ro',
  Ru = 'ru',
  Sk = 'sk',
  Sl = 'sl',
  Sq = 'sq',
  Sr = 'sr',
  SrLatn = 'sr-latn',
  Sv = 'sv',
  Sw = 'sw',
  Ta = 'ta',
  Te = 'te',
  Tg = 'tg',
  Th = 'th',
  Tk = 'tk',
  Tr = 'tr',
  Tt = 'tt',
  Udm = 'udm',
  Ug = 'ug',
  Uk = 'uk',
  Ur = 'ur',
  Uz = 'uz',
  Vi = 'vi',
  ZhHans = 'zh-hans',
  ZhHant = 'zh-hant',
}

export enum DocsSchemaRetrieveParams1FormatEnum {
  Json = 'json',
  Yaml = 'yaml',
}

export enum DocsSchemaRetrieveParams1LangEnum {
  Af = 'af',
  Ar = 'ar',
  ArDz = 'ar-dz',
  Ast = 'ast',
  Az = 'az',
  Be = 'be',
  Bg = 'bg',
  Bn = 'bn',
  Br = 'br',
  Bs = 'bs',
  Ca = 'ca',
  Ckb = 'ckb',
  Cs = 'cs',
  Cy = 'cy',
  Da = 'da',
  De = 'de',
  Dsb = 'dsb',
  El = 'el',
  En = 'en',
  EnAu = 'en-au',
  EnGb = 'en-gb',
  Eo = 'eo',
  Es = 'es',
  EsAr = 'es-ar',
  EsCo = 'es-co',
  EsMx = 'es-mx',
  EsNi = 'es-ni',
  EsVe = 'es-ve',
  Et = 'et',
  Eu = 'eu',
  Fa = 'fa',
  Fi = 'fi',
  Fr = 'fr',
  Fy = 'fy',
  Ga = 'ga',
  Gd = 'gd',
  Gl = 'gl',
  He = 'he',
  Hi = 'hi',
  Hr = 'hr',
  Hsb = 'hsb',
  Hu = 'hu',
  Hy = 'hy',
  Ia = 'ia',
  Id = 'id',
  Ig = 'ig',
  Io = 'io',
  Is = 'is',
  It = 'it',
  Ja = 'ja',
  Ka = 'ka',
  Kab = 'kab',
  Kk = 'kk',
  Km = 'km',
  Kn = 'kn',
  Ko = 'ko',
  Ky = 'ky',
  Lb = 'lb',
  Lt = 'lt',
  Lv = 'lv',
  Mk = 'mk',
  Ml = 'ml',
  Mn = 'mn',
  Mr = 'mr',
  Ms = 'ms',
  My = 'my',
  Nb = 'nb',
  Ne = 'ne',
  Nl = 'nl',
  Nn = 'nn',
  Os = 'os',
  Pa = 'pa',
  Pl = 'pl',
  Pt = 'pt',
  PtBr = 'pt-br',
  Ro = 'ro',
  Ru = 'ru',
  Sk = 'sk',
  Sl = 'sl',
  Sq = 'sq',
  Sr = 'sr',
  SrLatn = 'sr-latn',
  Sv = 'sv',
  Sw = 'sw',
  Ta = 'ta',
  Te = 'te',
  Tg = 'tg',
  Th = 'th',
  Tk = 'tk',
  Tr = 'tr',
  Tt = 'tt',
  Udm = 'udm',
  Ug = 'ug',
  Uk = 'uk',
  Ur = 'ur',
  Uz = 'uz',
  Vi = 'vi',
  ZhHans = 'zh-hans',
  ZhHant = 'zh-hant',
}

export interface HomeworkAnswersListParams {
  /** @format uuid */
  author?: string;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
  /** @format uuid */
  question?: string;
}

export interface HomeworkCrosschecksListParams {
  /**
   * Question id
   * @format uuid
   */
  question: string;
}

export interface LmsLessonsListParams {
  module?: number;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface LmsModulesListParams {
  course?: number;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface PurchasedCoursesListParams {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface StudiesPurchasedListParams {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface UsersListParams {
  email?: string;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { 'Content-Type': type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Tough dev school API
 * @version 0.0.0 (v2)
 *
 * So great, needs no docs
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * @description Get token for given user_id. Superuser only!
     *
     * @tags auth
     * @name AuthAsRetrieve
     * @request GET:/api/v2/auth/as/{user_id}/
     * @secure
     */
    authAsRetrieve: (userId: number, params: RequestParams = {}) =>
      this.http.request<Token, any>({
        path: `/api/v2/auth/as/${userId}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django Auth SetPasswordForm save method. Accepts the following POST parameters: new_password1, new_password2 Returns the success/fail message.
     *
     * @tags auth
     * @name AuthPasswordChangeCreate
     * @request POST:/api/v2/auth/password/change/
     * @secure
     */
    authPasswordChangeCreate: (
      data: PasswordChange,
      params: RequestParams = {},
    ) =>
      this.http.request<RestAuthDetail, any>({
        path: `/api/v2/auth/password/change/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django Auth PasswordResetForm save method. Accepts the following POST parameters: email Returns the success/fail message.
     *
     * @tags auth
     * @name AuthPasswordResetCreate
     * @request POST:/api/v2/auth/password/reset/
     * @secure
     */
    authPasswordResetCreate: (
      data: PasswordReset,
      params: RequestParams = {},
    ) =>
      this.http.request<PasswordReset, any>({
        path: `/api/v2/auth/password/reset/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Password reset e-mail link is confirmed, therefore this resets the user's password. Accepts the following POST parameters: token, uid, new_password1, new_password2 Returns the success/fail message.
     *
     * @tags auth
     * @name AuthPasswordResetConfirmCreate
     * @request POST:/api/v2/auth/password/reset/confirm/
     * @secure
     */
    authPasswordResetConfirmCreate: (
      data: PasswordResetConfirm,
      params: RequestParams = {},
    ) =>
      this.http.request<RestAuthDetail, any>({
        path: `/api/v2/auth/password/reset/confirm/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Exchange passwordless token to JWT
     *
     * @tags auth
     * @name AuthPasswordlessTokenRetrieve
     * @request GET:/api/v2/auth/passwordless-token/{token}/
     * @secure
     */
    authPasswordlessTokenRetrieve: (
      token: string,
      params: RequestParams = {},
    ) =>
      this.http.request<Token, any>({
        path: `/api/v2/auth/passwordless-token/${token}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthPasswordlessTokenRequestRetrieve
     * @request GET:/api/v2/auth/passwordless-token/request/{user_email}/
     * @secure
     */
    authPasswordlessTokenRequestRetrieve: (
      userEmail: string,
      params: RequestParams = {},
    ) =>
      this.http.request<Ok, any>({
        path: `/api/v2/auth/passwordless-token/request/${userEmail}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description API View that receives a POST with a user's username and password. Returns a JSON Web Token that can be used for authenticated requests.
     *
     * @tags auth
     * @name AuthTokenCreate
     * @request POST:/api/v2/auth/token/
     */
    authTokenCreate: (data: JSONWebToken, params: RequestParams = {}) =>
      this.http.request<JSONWebToken, any>({
        path: `/api/v2/auth/token/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description A list of courses with price
     *
     * @tags course-groups
     * @name CourseGroupsCoursesList
     * @request GET:/api/v2/course-groups/{slug}/courses/
     * @secure
     */
    courseGroupsCoursesList: (
      { slug, ...query }: CourseGroupsCoursesListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<CourseWithPrice[], any>({
        path: `/api/v2/course-groups/${slug}/courses/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CoursesPromocodeRetrieve
     * @request GET:/api/v2/courses/{slug}/promocode/
     * @secure
     */
    coursesPromocodeRetrieve: (
      { slug, ...query }: CoursesPromocodeRetrieveParams,
      params: RequestParams = {},
    ) =>
      this.http.request<Price, any>({
        path: `/api/v2/courses/${slug}/promocode/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CoursesPurchaseCreate
     * @request POST:/api/v2/courses/{slug}/purchase/
     * @secure
     */
    coursesPurchaseCreate: (
      slug: string,
      data: Purchase,
      params: RequestParams = {},
    ) =>
      this.http.request<any, void>({
        path: `/api/v2/courses/${slug}/purchase/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Add ability to disable response pagination with `disable_pagination=True` query param.
     *
     * @tags diplomas
     * @name DiplomasList
     * @request GET:/api/v2/diplomas/
     * @secure
     */
    diplomasList: (query: DiplomasListParams, params: RequestParams = {}) =>
      this.http.request<PaginatedDiplomaList, any>({
        path: `/api/v2/diplomas/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Always serialize response with the default serializer.
     *
     * @tags diplomas
     * @name DiplomasCreate
     * @request POST:/api/v2/diplomas/
     * @secure
     */
    diplomasCreate: (data: DiplomaCreate, params: RequestParams = {}) =>
      this.http.request<DiplomaCreate, any>({
        path: `/api/v2/diplomas/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Add ability to disable response pagination with `disable_pagination=True` query param.
     *
     * @tags diplomas
     * @name DiplomasRetrieve
     * @request GET:/api/v2/diplomas/{slug}/
     * @secure
     */
    diplomasRetrieve: (slug: string, params: RequestParams = {}) =>
      this.http.request<DiplomaRetrieve, any>({
        path: `/api/v2/diplomas/${slug}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Always serialize response with the default serializer.
     *
     * @tags diplomas
     * @name DiplomasUpdate
     * @request PUT:/api/v2/diplomas/{slug}/
     * @secure
     */
    diplomasUpdate: (slug: string, data: Diploma, params: RequestParams = {}) =>
      this.http.request<Diploma, any>({
        path: `/api/v2/diplomas/${slug}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Add ability to disable response pagination with `disable_pagination=True` query param.
     *
     * @tags diplomas
     * @name DiplomasPartialUpdate
     * @request PATCH:/api/v2/diplomas/{slug}/
     * @secure
     */
    diplomasPartialUpdate: (
      slug: string,
      data: PatchedDiploma,
      params: RequestParams = {},
    ) =>
      this.http.request<Diploma, any>({
        path: `/api/v2/diplomas/${slug}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Add ability to disable response pagination with `disable_pagination=True` query param.
     *
     * @tags diplomas
     * @name DiplomasDestroy
     * @request DELETE:/api/v2/diplomas/{slug}/
     * @secure
     */
    diplomasDestroy: (slug: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/v2/diplomas/${slug}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags docs
     * @name DocsSchemaRetrieve
     * @request GET:/api/v2/docs/schema/
     * @secure
     */
    docsSchemaRetrieve: (
      query: DocsSchemaRetrieveParams,
      params: RequestParams = {},
    ) =>
      this.http.request<Record<string, any>, any>({
        path: `/api/v2/docs/schema/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List allowed answers
     *
     * @tags homework
     * @name HomeworkAnswersList
     * @request GET:/api/v2/homework/answers/
     * @secure
     */
    homeworkAnswersList: (
      query: HomeworkAnswersListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PaginatedAnswerList, any>({
        path: `/api/v2/homework/answers/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create an answer
     *
     * @tags homework
     * @name HomeworkAnswersCreate
     * @request POST:/api/v2/homework/answers/
     * @secure
     */
    homeworkAnswersCreate: (data: AnswerCreate, params: RequestParams = {}) =>
      this.http.request<AnswerTree, any>({
        path: `/api/v2/homework/answers/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a reaction
     *
     * @tags homework
     * @name HomeworkAnswersReactionsCreate
     * @request POST:/api/v2/homework/answers/{answer_slug}/reactions/
     * @secure
     */
    homeworkAnswersReactionsCreate: (
      answerSlug: string,
      data: ReactionCreate,
      params: RequestParams = {},
    ) =>
      this.http.request<ReactionDetailed, any>({
        path: `/api/v2/homework/answers/${answerSlug}/reactions/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags homework
     * @name HomeworkAnswersReactionsDestroy
     * @request DELETE:/api/v2/homework/answers/{answer_slug}/reactions/{slug}/
     * @secure
     */
    homeworkAnswersReactionsDestroy: (
      answerSlug: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/api/v2/homework/answers/${answerSlug}/reactions/${slug}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Get an answer by slug (any answer can be accessible if user knows the slug
     *
     * @tags homework
     * @name HomeworkAnswersRetrieve
     * @request GET:/api/v2/homework/answers/{slug}/
     * @secure
     */
    homeworkAnswersRetrieve: (slug: string, params: RequestParams = {}) =>
      this.http.request<AnswerTree, any>({
        path: `/api/v2/homework/answers/${slug}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update answer text
     *
     * @tags homework
     * @name HomeworkAnswersUpdate
     * @request PUT:/api/v2/homework/answers/{slug}/
     * @secure
     */
    homeworkAnswersUpdate: (
      slug: string,
      data: AnswerUpdate,
      params: RequestParams = {},
    ) =>
      this.http.request<AnswerTree, any>({
        path: `/api/v2/homework/answers/${slug}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Answer CRUD
     *
     * @tags homework
     * @name HomeworkAnswersPartialUpdate
     * @request PATCH:/api/v2/homework/answers/{slug}/
     * @secure
     */
    homeworkAnswersPartialUpdate: (
      slug: string,
      data: PatchedAnswerUpdate,
      params: RequestParams = {},
    ) =>
      this.http.request<AnswerUpdate, any>({
        path: `/api/v2/homework/answers/${slug}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove an answer if allowed
     *
     * @tags homework
     * @name HomeworkAnswersDestroy
     * @request DELETE:/api/v2/homework/answers/{slug}/
     * @secure
     */
    homeworkAnswersDestroy: (slug: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/v2/homework/answers/${slug}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Upload an image
     *
     * @tags homework
     * @name HomeworkAnswersImageCreate
     * @request POST:/api/v2/homework/answers/image/
     * @secure
     */
    homeworkAnswersImageCreate: (
      data: AnswerImageRequest,
      params: RequestParams = {},
    ) =>
      this.http.request<AnswerImage, any>({
        path: `/api/v2/homework/answers/image/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Crosscheck status by question
     *
     * @tags homework
     * @name HomeworkCrosschecksList
     * @request GET:/api/v2/homework/crosschecks/
     * @secure
     */
    homeworkCrosschecksList: (
      query: HomeworkCrosschecksListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<CrossCheck[], any>({
        path: `/api/v2/homework/crosschecks/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags homework
     * @name HomeworkQuestionsRetrieve
     * @request GET:/api/v2/homework/questions/{slug}/
     * @secure
     */
    homeworkQuestionsRetrieve: (slug: string, params: RequestParams = {}) =>
      this.http.request<QuestionDetail, any>({
        path: `/api/v2/homework/questions/${slug}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List lessons, accessible to user. Better use it filtering by module
     *
     * @tags lms
     * @name LmsLessonsList
     * @request GET:/api/v2/lms/lessons/
     * @secure
     */
    lmsLessonsList: (query: LmsLessonsListParams, params: RequestParams = {}) =>
      this.http.request<PaginatedLessonList, any>({
        path: `/api/v2/lms/lessons/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a lesson by id
     *
     * @tags lms
     * @name LmsLessonsRetrieve
     * @request GET:/api/v2/lms/lessons/{id}/
     * @secure
     */
    lmsLessonsRetrieve: (id: number, params: RequestParams = {}) =>
      this.http.request<Lesson, any>({
        path: `/api/v2/lms/lessons/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List modules, accessible to user. Better use it filtering by course
     *
     * @tags lms
     * @name LmsModulesList
     * @request GET:/api/v2/lms/modules/
     * @secure
     */
    lmsModulesList: (query: LmsModulesListParams, params: RequestParams = {}) =>
      this.http.request<PaginatedModuleDetailList, any>({
        path: `/api/v2/lms/modules/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a module by id
     *
     * @tags lms
     * @name LmsModulesRetrieve
     * @request GET:/api/v2/lms/modules/{id}/
     * @secure
     */
    lmsModulesRetrieve: (id: number, params: RequestParams = {}) =>
      this.http.request<ModuleDetail, any>({
        path: `/api/v2/lms/modules/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fetch material
     *
     * @tags materials
     * @name MaterialsRetrieve
     * @request GET:/api/v2/materials/{page_id}/
     * @secure
     */
    materialsRetrieve: (pageId: string, params: RequestParams = {}) =>
      this.http.request<MaterialSerilizer, any>({
        path: `/api/v2/materials/${pageId}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get material update status
     *
     * @tags materials
     * @name MaterialsStatusRetrieve
     * @request GET:/api/v2/materials/{page_id}/status/
     * @secure
     */
    materialsStatusRetrieve: (pageId: string, params: RequestParams = {}) =>
      this.http.request<NotionCacheEntryStatus, any>({
        path: `/api/v2/materials/${pageId}/status/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Trigger material update
     *
     * @tags materials
     * @name MaterialsUpdateUpdate
     * @request PUT:/api/v2/materials/{page_id}/update/
     * @secure
     */
    materialsUpdateUpdate: (pageId: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/v2/materials/${pageId}/update/`,
        method: 'PUT',
        secure: true,
        ...params,
      }),

    /**
     * @description [DEPRECATED] Fetch notion materials
     *
     * @tags notion
     * @name NotionMaterialsRetrieve
     * @request GET:/api/v2/notion/materials/{page_id}/
     * @secure
     */
    notionMaterialsRetrieve: (pageId: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/api/v2/notion/materials/${pageId}/`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description Redirects user to the confirmation URL
     *
     * @tags orders
     * @name OrdersConfirmRetrieve
     * @request GET:/api/v2/orders/{slug}/confirm/
     * @secure
     */
    ordersConfirmRetrieve: (slug: string, params: RequestParams = {}) =>
      this.http.request<any, void>({
        path: `/api/v2/orders/${slug}/confirm/`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description Create an order draft with given bank and promocode
     *
     * @tags orders
     * @name OrdersDraftCreate
     * @request POST:/api/v2/orders/draft/
     * @secure
     */
    ordersDraftCreate: (data: OrderDraftRequest, params: RequestParams = {}) =>
      this.http.request<OrderDraft, any>({
        path: `/api/v2/orders/draft/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description List of courses, purchased by particular user
     *
     * @tags purchased-courses
     * @name PurchasedCoursesList
     * @request GET:/api/v2/purchased-courses/
     * @secure
     */
    purchasedCoursesList: (
      query: PurchasedCoursesListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PaginatedCourseList, any>({
        path: `/api/v2/purchased-courses/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description List of courses, purchased by particular user
     *
     * @tags studies
     * @name StudiesPurchasedList
     * @request GET:/api/v2/studies/purchased/
     * @secure
     */
    studiesPurchasedList: (
      query: StudiesPurchasedListParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PaginatedCourseList, any>({
        path: `/api/v2/studies/purchased/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @request GET:/api/v2/users/
     * @secure
     */
    usersList: (query: UsersListParams, params: RequestParams = {}) =>
      this.http.request<PaginatedUserList, any>({
        path: `/api/v2/users/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fetch user data
     *
     * @tags users
     * @name UsersMeRetrieve
     * @request GET:/api/v2/users/me/
     * @secure
     */
    usersMeRetrieve: (params: RequestParams = {}) =>
      this.http.request<UserSelf, any>({
        path: `/api/v2/users/me/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update user data
     *
     * @tags users
     * @name UsersMePartialUpdate
     * @request PATCH:/api/v2/users/me/
     * @secure
     */
    usersMePartialUpdate: (
      data: PatchedUserSelfUpdate,
      params: RequestParams = {},
    ) =>
      this.http.request<UserSelf, any>({
        path: `/api/v2/users/me/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
