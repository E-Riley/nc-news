import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticles()
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return loading ? (
    <section className="loading">
      <h2>Loading!!!</h2>
    </section>
  ) : (
    <>
      <section className="article-list-holder">
        <ul id="article-list">
          {articles.map((article, index) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
      </section>
    </>
  );
}
