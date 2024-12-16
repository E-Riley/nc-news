import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://ethans-nc-backend-news-project.onrender.com/api",
  timeout: 1000,
});

export function fetchArticles() {
  return articlesAPI.get("/articles").then(({ data: { articles } }) => {
    return articles;
  });
}
