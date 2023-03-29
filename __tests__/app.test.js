const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const request = require("supertest");
const app = require("../db/app.js");
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
      .get("/api/caetgories")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("GET: /api/reviews/:review_id", () => {
  it("should return the review asked for in the get request", () => {
    return request(app)
      .get("/api/reviews/1")
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
      .get("/api/reviews/1000")
      .expect(404)
      .then((result) => {
        expect(result.text).toInclude("No review found for review_id:");
      });
  });
  it("should return an error message when there is a request for an invalid review_id", () => {
    return request(app)
      .get("/api/reviews/review")
      .expect(400)
      .then((result) => {
        expect(result.text).toInclude("Please enter a valid review_id");
      });
  });
});
describe("GET /api/reviews", () => {
  it("should return a reviews array of review objects with comment count", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toHaveLength(13);
        body.reviews.forEach((review) => {
          expect(review).toHaveProperty("review_id");
          expect(review).toHaveProperty("title", expect.any(String));
          expect(review).toHaveProperty("category", expect.any(String));
          expect(review).toHaveProperty("designer", expect.any(String));
          expect(review).toHaveProperty("owner", expect.any(String));
          expect(review).toHaveProperty("review_body", expect.any(String));
          expect(review).toHaveProperty("created_at", expect.any(String));
          expect(review).toHaveProperty("votes", expect.any(Number));
          expect(review).toHaveProperty("comment_count");
        });
      });
  });
  it("should return reviews sorted by date in descending order", () => {
    return request(app)
      .get("/api/reviews")
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});
describe("GET: /api/reviews/:review_id/comments", () => {
  it("should return the comments for the inputted review", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .then((result) => {
        const { comments } = result.body;
        expect(comments).toHaveLength(3);
      });
  });
  it("should include the following properties", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .then((result) => {
        const { comments } = result.body;
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("review_id", 2);
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
        });
      });
  });
  it("should return results in order of most recent comments first", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .then((result) => {
        const { comments } = result.body;
        expect(comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  it("should return an error message when there is a request for an invalid review_id", () => {
    return request(app)
      .get("/api/reviews/review/comments")
      .expect(400)
      .then((result) => {
        expect(result.text).toInclude("Please enter a valid review_id");
      });
  });
  it("should return 200 for an article that exists but has no comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then((result) => {
        expect(result.text).toInclude("No comments found for review_id:");
      });
  });
});
