export interface ArticleResponse {
  page: number;
  total_pages: number;
  data: ArticleData[];
}

export interface ArticleData {
  title: string | null;
  url: string | null;
  story_url: string | null;
  story_title: string | null;
  author: string;
  num_comments: number;
  created_at: number;
}

export interface Article {
  id: number;
  title: string;
  url: string | null;
  author: string;
  nComments: number;
  dateCreation: string;
}
