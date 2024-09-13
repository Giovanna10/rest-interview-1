import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./Pagination";
import userEvent from "@testing-library/user-event";

describe("Pagination", () => {
  it("shows as many buttons as there are pages", () => {
    render(<Pagination pages={5} currentPage={1} onChange={() => {}} />);
    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(5);

    screen.getAllByRole("button").forEach((button, index) => {
      expect(button).toHaveTextContent(`${index + 1}`);
    });
  });

  it("on select page button the on change function should retrieve the displayed number", async () => {
    const onChange = vi.fn();
    render(<Pagination pages={5} currentPage={1} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "2" }));

    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("disable the current page", () => {
    render(<Pagination pages={5} currentPage={3} onChange={() => {}} />);
    const buttons = screen.getAllByRole("button");

    expect(buttons[2]).toBeDisabled();
  });
});
