import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ArticlesSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentAuthor = useMemo(
    () => searchParams.get("author") ?? "",
    [searchParams]
  );
  const [author, setAuthor] = useState(currentAuthor);

  return (
    <div className="space-x-2">
      <label htmlFor="author" className="text-gray-800">
        Autore
      </label>
      <input
        id="author"
        className="p-2 text-gray-800 rounded-md bg-slate-100"
        type="text"
        onChange={(event) => setAuthor(event.currentTarget.value)}
        value={author}
      />
      <button
        className="p-2 rounded-md bg-slate-600 text-gray-50"
        onClick={() => setSearchParams({ author })}
      >
        Cerca
      </button>
    </div>
  );
};
