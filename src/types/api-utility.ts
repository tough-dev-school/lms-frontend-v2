type PaginationUrl = string;

export type PaginantedCollection<T> = {
  count: number;
  next: PaginationUrl;
  previous: PaginationUrl;
  results: T[];
};
