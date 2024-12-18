import { useEffect, useState } from "react";
import { fetchArticles, fetchTopics } from "../../api";
import ArticleCard from "./ArticleCard";
import { useNavigate, useParams } from "react-router-dom";

export default function ArticleList() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics()
      .then((topics) => {
        setTopics(topics);
      })
      .catch(() => {
        setError(true);
      });
  });

  useEffect(() => {
    setLoading(true);
    fetchArticles(topic)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [topic]);

  const handleTopicChange = (e) => {
    const chosenTopic = e.target.value;
    if (chosenTopic) {
      navigate(`/articles/topic/${chosenTopic}`);
    } else {
      navigate("/articles");
    }
  };

  return (
    <>
      <select
        value={topic || ""}
        onChange={handleTopicChange}
        className="dropdown-select"
      >
        <option value="">All Topics</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
      {loading ? (
        <section className="loading">
          <h2>Loading!!!</h2>
        </section>
      ) : error ? (
        <section className="error">
          <h2>There was an error</h2>
        </section>
      ) : (
        <>
          <section className="article-list-holder">
            <ul id="article-list">
              {articles.map((article, index) => {
                return (
                  <ArticleCard article={article} key={article.article_id} />
                );
              })}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
