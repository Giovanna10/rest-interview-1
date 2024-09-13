import { Article } from "../types/Article";

interface CardProps {
  article: Article;
}

export const Card = ({ article }: CardProps) => {
  return (
    <div
      data-testid="articles-item"
      className="w-full p-4 space-y-4 rounded-md md:w-card-width-2 lg:w-card-width-3 bg-slate-100"
    >
      <div className="space-y-2">
        <p data-testid="item-date" className="text-xs text-gray-500">
          {article.dateCreation}
        </p>
        <p
          data-testid="item-title"
          className="text-xl font-medium text-gray-800"
        >
          {article.title}
        </p>
        <p data-testid="item-author" className="text-sm text-gray-800">
          {article.author}
        </p>
        <p className="text-sm text-gray-500">{article.nComments} commenti</p>
      </div>
      <div className="flex justify-end w-full">
        {article.url ? (
          <a
            href={article.url}
            target="_blank"
            className="text-gray-500 underline"
          >
            Leggi di piú
          </a>
        ) : null}
      </div>
    </div>
  );
};
