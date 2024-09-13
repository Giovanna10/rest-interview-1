import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticlesList } from "./ArticlesList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { server } from "../test/server";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";

describe("ArticlesList", () => {
  it("should render the list of articles", async () => {
    render(<ArticlesList />, {
      wrapper: ({ children }) => {
        const queryClient = new QueryClient();
        return (
          <MemoryRouter>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });
    await screen.findByText("Loading...");
    const articles = await screen.findAllByTestId("articles-item");

    expect(articles).toHaveLength(10);

    articles.forEach((article) => {
      expect(within(article).getByTestId("item-date")).toHaveTextContent(
        new RegExp(/\d{2}\/\d{2}\/\d{4}/)
      );
      expect(within(article).getByTestId("item-title")).toBeInTheDocument();
      expect(within(article).getByTestId("item-author")).toBeInTheDocument();
    });
  });

  it("should render the list error", async () => {
    server.use(
      http.get("https://jsonmock.hackerrank.com/api/articles", () => {
        return HttpResponse.error();
      })
    );

    render(<ArticlesList />, {
      wrapper: ({ children }) => {
        const queryClient = new QueryClient({
          defaultOptions: { queries: { retry: false } },
        });
        return (
          <MemoryRouter>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });
    await screen.findByText("Loading...");

    expect(await screen.findByText("Error")).toBeInTheDocument();
  });

  it("should render last page with one article", async () => {
    render(<ArticlesList />, {
      wrapper: ({ children }) => {
        const queryClient = new QueryClient({
          defaultOptions: { queries: { retry: false } },
        });
        return (
          <MemoryRouter initialEntries={["?page=5"]}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });
    await screen.findByText("Loading...");
    const articles = await screen.findAllByTestId("articles-item");

    expect(articles).toHaveLength(1);
  });

  it("should render all articles by searched author", async () => {
    render(<ArticlesList />, {
      wrapper: ({ children }) => {
        const queryClient = new QueryClient({
          defaultOptions: { queries: { retry: false } },
        });
        return (
          <MemoryRouter>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        );
      },
    });
    await screen.findByText("Loading...");
    const articles = await screen.findAllByTestId("articles-item");

    expect(articles).toHaveLength(10);

    const searchInput = screen.getByLabelText("Autore");
    await userEvent.type(searchInput, "pkiller");
    await userEvent.click(screen.getByText("Cerca"));
    const authorElements = await screen.findAllByTestId("item-author");

    expect(
      authorElements.forEach((authorElement) =>
        expect(authorElement).toHaveTextContent("pkiller")
      )
    );
  });
});
