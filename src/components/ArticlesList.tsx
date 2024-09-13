import { useSuspenseQuery } from "@tanstack/react-query";
import { PropsWithChildren, Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router-dom";
import { createArticlesQueryOptions } from "../utils/query-factory";
import { Card } from "./Card";
import { Pagination } from "./Pagination";
import { ArticlesSearch } from "./ArticlesSearch";

const ArticlesListSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentAuthor = useMemo(
    () => searchParams.get("author") ?? "",
    [searchParams]
  );
  const page = useMemo(
    () => (searchParams.get("page") ? Number(searchParams.get("page")) : 1),
    [searchParams]
  );
  const { data } = useSuspenseQuery(
    createArticlesQueryOptions({
      page,
      author: currentAuthor,
    })
  );
  return (
    <div className="flex flex-col justify-between w-full h-full space-y-8">
      <div className="flex flex-wrap w-full gap-4">
        {data.list.map((article) => (
          <Card key={article.id} article={article} />
        ))}
      </div>
      <Pagination
        pages={data.totalPages}
        currentPage={data.page}
        onChange={(page) =>
          setSearchParams((sP) => {
            sP.set("page", String(page));
            return sP;
          })
        }
      />
    </div>
  );
};

const ArticlesListErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      fallbackRender={() => (
        <div className="flex items-center justify-center w-full">
          <p className="text-gray-300">Error</p>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

const ArticlesListLoading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p className="text-gray-300">Loading...</p>
    </div>
  );
};

export const ArticlesList = () => {
  return (
    <ArticlesListErrorBoundary>
      <div className="flex justify-between w-full">
        <h1 className="text-4xl font-bold text-gray-300">Articoli</h1>
        <ArticlesSearch />
      </div>
      <Suspense fallback={<ArticlesListLoading />}>
        <ArticlesListSuccess />
      </Suspense>
    </ArticlesListErrorBoundary>
  );
};
