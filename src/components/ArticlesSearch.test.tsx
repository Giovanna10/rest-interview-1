import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArticlesSearch } from "./ArticlesSearch";
import { MemoryRouter } from "react-router";

describe("ArticlesSearch", () => {
  it("show the input with current article param", () => {
    render(<ArticlesSearch />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/?author=author"]}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(screen.getByRole("textbox")).toHaveValue("author");
  });
});
