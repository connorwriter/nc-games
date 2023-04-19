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
export const patchReviewVote = (review_id, increment) => {
  return ncGamesApi
    .patch(`/reviews/${review_id}`, { inc_votes: increment })
    .then((res) => {
      console.log(res);
      return res.data.review;
    });
};
