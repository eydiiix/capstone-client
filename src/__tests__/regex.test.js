import { passwordRegex } from "@/utils/regex";
import { test, expect } from "vitest";

test("Password Test Pass", () => {
    expect(passwordRegex.test('AGGGGGg1@B')).toBe(true);
});
