// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";
import NewsNotFound from "./tin-tuc/[slug]/not-found";

describe("Trang 404 tiếng Việt", () => {
  it("404 chung: 'Không tìm thấy trang' + nút 'Về Trang chủ', không lập chỉ mục", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: "Không tìm thấy trang" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Về Trang chủ" })).toHaveAttribute("href", "/");
    expect(metadata.robots).toEqual({ index: false });
  });

  it("404 bài viết: 'Không tìm thấy bài viết' + nút 'Quay lại Tin tức' → /#tin-tuc", () => {
    render(<NewsNotFound />);
    expect(screen.getByRole("heading", { level: 1, name: "Không tìm thấy bài viết" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Quay lại Tin tức" })).toHaveAttribute("href", "/#tin-tuc");
  });
});
