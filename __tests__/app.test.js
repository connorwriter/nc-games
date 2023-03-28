const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const request = require("supertest");
const app = require("../db/app.js");
const { getCategories } = require("../db/controllers/categories-controller.js");
const { getReviews } = require("../db/controllers/reviews-controller.js");
require("jest-sorted");

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
describe("errors", () => {
  it("should return an error message if there is an spelling error in the endpoint", () => {
    return request(app)
      .get("/api/caetgories", getCategories)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("GET: /api/reviews/:review_id", () => {
  it("should return the review asked for in the get request", () => {
    return request(app)
      .get("/api/reviews/1", getReviewsById)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toHaveProperty("review_id", 1);
        expect(body.review).toHaveProperty("title", expect.any(String));
        expect(body.review).toHaveProperty("category", expect.any(String));
        expect(body.review).toHaveProperty("designer", expect.any(String));
        expect(body.review).toHaveProperty("owner", expect.any(String));
        expect(body.review).toHaveProperty("review_body", expect.any(String));
        expect(body.review).toHaveProperty(
          "review_img_url",
          expect.any(String)
        );
        expect(body.review).toHaveProperty("created_at", expect.any(String));
        expect(body.review).toHaveProperty("votes", expect.any(Number));
      });
  });
  it("should return an error message when there is a request for an invalid review_id", () => {
    return request(app)
      .get("/api/reviews/1000", getReviewsById)
      .expect(404)
      .then((result) => {
        expect(result.text).toInclude("No review found for review_id:");
      });
  });
  it("should return an error message when there is a request for an invalid review_id", () => {
    return request(app)
      .get("/api/reviews/review", getReviewsById)
      .expect(400)
      .then((result) => {
        expect(result.text).toInclude("Please enter a valid review_id");
      });
  });
});
describe.only("GET /api/reviews", () => {
  it("should return a reviews array of review objects", () => {
    return request(app)
      .get("/api/reviews", getReviews)
      .expect(200)
      .then(({ _body }) => {
        _body.reviews.forEach((review) => {
          expect(review).toHaveProperty("review_id");
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("review_body", expect.any(String));
          expect(review).toHaveProperty("review_img_url", expect.any(String));
          expect(review).toHaveProperty("created_at");
          expect(review).toHaveProperty("votes");
          expect(review).toHaveProperty("comment_id");
          expect(review).toHaveProperty("body");
          expect(review).toHaveProperty("author");
        });
      });
  });
  it("should return reviews sorted by date in descending order", () => {
    return request(app)
      .get("/api/reviews", getReviews)
      .then((result) => {
        expect(result._body.reviews).toBeSorted();
      });
  });
});
