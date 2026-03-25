import { test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("show 6 products by default", async () => {
  render(<App />);
  const countProducts = await screen.findAllByRole("heading");
  expect(countProducts).toHaveLength(6);
});
test("click on button adds 6 more products", async () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /Load More/i });
  await user.click(button);
  await waitFor(
    () => {
      expect(screen.getAllByRole("heading")).toHaveLength(12);
    },
    {
      timeout: 2000, // Wait up to 2 seconds instead of 1
      interval: 100, // Check every 100ms instead of 50ms
    },
  );
});
