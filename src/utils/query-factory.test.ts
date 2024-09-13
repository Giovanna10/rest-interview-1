import { describe, expect, it } from "vitest";
import { selectArticles } from "./query-factory";

describe("QueryFactory", () => {
  it("selectArticles should remaps only articles with title or story_title", () => {
    const articles = {
      data: [
        {
          title: "title1",
          story_title: null,
          url: "url",
          story_url: "story_url",
          author: "author1",
          num_comments: 0,
          created_at: new Date().getTime(),
        },
        {
          title: null,
          story_title: null,
          url: "url",
          story_url: "story_url",
          author: "author2",
          num_comments: 0,
          created_at: new Date().getTime(),
        },
      ],
    };
    const result = selectArticles({
      data: articles.data,
      page: 1,
      total_pages: 1,
    });

    expect(result.list).toHaveLength(1);
    expect(result.list[0].title).toBe("title1");
  });
});
