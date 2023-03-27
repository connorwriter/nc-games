const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const request = require("supertest");
const app = require("../db/app.js");
const { getCategories } = require("../db/controllers/categories-controller.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) db.end();
});

describe("GET: /api/categories", () => {
  it("Should return an array of 4 objects with 2 keys each", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((result) => {
        expect(result.body.categories).toHaveLength(4);
        result.body.categories.forEach((category) => {
          expect(category).toHaveProperty("slug", expect.any(String));
          expect(category).toHaveProperty("description", expect.any(String));
        });
      });
  });
});
it("should return an error message if there is an spelling error in the endpoint", () => {
  return request(app)
    .get("/api/caetgories", getCategories)
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe("Invalid input");
    });
});
