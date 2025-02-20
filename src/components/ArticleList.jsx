import { useEffect, useState } from "react";
import { fetchArticles, fetchTopics } from "../../api";
import ArticleCard from "./ArticleCard";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function ArticleList() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setError(null);
    fetchTopics()
      .then((topics) => {
        setTopics(topics);
      })
      .catch(() => {
        setError("Could not load articles, please try again");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArticles(topic, { sort_by: sortBy, order: order })
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError(
            "The topic you are searching for does not exist, or does not have any articles"
          );
        }
        setLoading(false);
      });
  }, [topic, sortBy, order]);

  const handleTopicChange = (e) => {
    const chosenTopic = e.target.value;
    if (chosenTopic) {
      navigate(`/articles/topic/${chosenTopic}`);
    } else {
      navigate("/articles");
    }
  };

  const handleSortBy = (e) => {
    const newSortBy = e.target.value;
    searchParams.set("sort_by", newSortBy);
    setSearchParams(searchParams);
  };

  const handleOrder = (e) => {
    const newOrder = e.target.value;
    searchParams.set("order", newOrder);
    setSearchParams(searchParams);
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
      <label>
        Sort by:
        <select
          value={sortBy}
          onChange={handleSortBy}
          className="dropdown-select"
        >
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>
      </label>

      <label>
        Order:
        <select
          value={order}
          onChange={handleOrder}
          className="dropdown-select"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
      {loading ? (
        <section className="loading">
          <h2>Loading!!!</h2>
        </section>
      ) : error ? (
        <section className="error">
          <h2>There was an error</h2>
          <p>{error}</p>
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
