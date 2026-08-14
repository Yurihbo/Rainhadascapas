import { describe, expect, it } from "vitest";

describe("Firebase configuration", () => {
  it("accepts the configured public API key", async () => {
    const apiKey = process.env.VITE_FIREBASE_API_KEY;
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID;

    expect(apiKey).toBeTruthy();
    expect(projectId).toBeTruthy();

    const response = await fetch(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=${encodeURIComponent(apiKey!)}`,
    );

    expect(response.ok).toBe(true);
  }, 15_000);
});
