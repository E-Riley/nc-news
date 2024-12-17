import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://ethans-nc-backend-news-project.onrender.com/api",
});

export function fetchArticles() {
  return articlesAPI.get("/articles").then(({ data: { articles } }) => {
    return articles;
  });
}

export function fetchArticleById(articleId) {
  return articlesAPI
    .get(`/articles/${articleId}`)
    .then(({ data: { articles } }) => {
      return articles;
    });
}

export function fetchArticleComments(articleId) {
  return articlesAPI
    .get(`/articles/${articleId}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
}
