import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import mockPg1 from "./mockPg1.json";
import mockLastPage from "./mockLastPage.json";
import mockSearch from "./mockSearch.json";

export const server = setupServer(
  http.get("https://jsonmock.hackerrank.com/api/articles", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const author = url.searchParams.get("author");
    if (author === "pkiller") {
      return HttpResponse.json(mockSearch);
    }
    if (page === "1") {
      return HttpResponse.json(mockPg1);
    }
    if (page === "5") {
      return HttpResponse.json(mockLastPage);
    }
  })
);
