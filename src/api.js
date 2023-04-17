import axios from "axios";

const ncGamesApi = axios.create({
  baseURL: "https://nc-games-8it8.onrender.com/api",
});

export const getReviews = () => {
  return ncGamesApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};
