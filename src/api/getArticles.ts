import { ArticleResponse } from "../types/Article";

export const getArticles = async ({
  page,
  author,
}: {
  page?: number;
  author?: string;
}): Promise<ArticleResponse> => {
  const response = await fetch(
    `https://jsonmock.hackerrank.com/api/articles${page || author ? "?" : ""}${
      page ? `page=${page}` : ""
    }${page && author ? "&" : ""}${author ? `author=${author}` : ""}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const articlesData = await response.json();

  return articlesData as ArticleResponse;
};
