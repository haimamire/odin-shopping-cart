import { vi } from "vitest";

export const swalMockConfirm = vi.fn(() =>
  Promise.resolve({ isConfirmed: true }),
);
export const swalMockCancel = vi.fn(() =>
  Promise.resolve({ isConfirmed: false }),
);
