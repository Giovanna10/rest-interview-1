import { queryOptions } from "@tanstack/react-query";
import { getArticles } from "../api/getArticles";
import { Article, ArticleData, ArticleResponse } from "../types/Article";

export const selectArticles = ({
  data,
  page,
  total_pages,
}: ArticleResponse) => {
  const list = data.reduce((acc: Article[], article: ArticleData) => {
    if (article.title || article.story_title) {
      acc.push({
        id: Math.random(),
        title: article.title ?? article.story_title ?? "",
        url: article.url ?? article.story_url,
        author: article.author,
        nComments: article.num_comments,
        dateCreation: new Date(article.created_at * 1000).toLocaleDateString(),
      });
    }
    return acc;
  }, []);

  return {
    list,
    page,
    totalPages: total_pages,
  };
};

export const createArticlesQueryOptions = ({
  page,
  author,
}: {
  page?: number;
  author?: string;
}) => {
  return queryOptions({
    queryKey: ["articles", page, author],
    queryFn: () => getArticles({ page, author }),
    select: selectArticles,
  });
};
