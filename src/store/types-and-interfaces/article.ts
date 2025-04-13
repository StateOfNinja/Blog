export interface IArticle {
  slug: string;
  body: string;
  author: IAuthor;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  tagList: string[];
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthor {
  following: boolean;
  image: string;
  username: string;
}

export interface IDataResponse {
  article: IArticle;
}

export interface ICreatForm {
  body: string;
  description: string;
  title: string;
}
