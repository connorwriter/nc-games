import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://nc-games-8it8.onrender.com/api",
});

export const getReviews = () => {
  return ncGamesApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
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
