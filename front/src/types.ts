export interface IShort {
  _id: string;
  originalUrl: string;
  shortUrl: string;
}

export type IShortMutation = Omit<IShort, 'shortUrl' | '_id'>;
