import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://nc-games-8it8.onrender.com/api",
});

export const getReviews = (category) => {
  if (category) {
    return ncGamesApi.get(`/reviews?category=${category}`);
  } else {
    return ncGamesApi.get("/reviews").then((res) => {
      return res.data.reviews;
    });
  }
};

export const getReviewById = (review_id) => {
  return ncGamesApi.get(`/reviews/${review_id}`).then((res) => {
    return res.data.review;
  });
};

export const getCommentsById = (review_id) => {
  return ncGamesApi.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};
export const patchReviewVote = (review_id, increment) => {
  return ncGamesApi
    .patch(`/reviews/${review_id}`, { inc_votes: increment })
    .then((res) => {
      return res.data.review;
    });
};

export const postNewComment = (review_id, body, user) => {
  const comment = { username: user, body: body };
  return ncGamesApi
    .post(`/reviews/${review_id}/comments`, comment)
    .then((res) => {
      return res.data.comment;
    });
};

export const getUsers = () => {
  return ncGamesApi.get(`/users`);
};

export const getCategories = () => {
  return ncGamesApi.get(`/categories`).then((res) => {
    return res.data.categories;
  });
};
