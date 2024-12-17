import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, updateArticleVotes } from "../../api";
import { Link } from "react-router-dom";
import CommentsList from "./CommentsList";
import Collapsible from "./Collapsible";

export default function ArticleInfo() {
  const { articleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticleById(articleId)
      .then((article) => {
        setArticle(article);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [articleId]);

  const articleDate = new Date(article.created_at);

  const formattedDate = articleDate.toLocaleString();

  const handleVote = (inc_votes) => {
    const optimisticVote = article.votes + inc_votes;
    setArticle((currArticle) => {
      return { ...currArticle, votes: optimisticVote };
    });
    updateArticleVotes(articleId, { inc_votes }).catch(() => {
      setError(true);
    });
  };

  return loading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <h2>There was an error, please try again.</h2>
  ) : (
    <>
      <section className="article-information">
        <div className="back-link">
          <Link to="/articles">
            <h1>Back to articles</h1>
          </Link>
        </div>
        <h2>{article.title}</h2>
        <h3>By {article.author}</h3>
        <p>{article.body}</p>
        <p>Written at {formattedDate}</p>
        <p>{article.votes} votes</p>
        <p>{article.comment_count} comments</p>
        <div className="vote-buttons">
          <button onClick={() => handleVote(1)}>Upvote</button>
          <button onClick={() => handleVote(-1)}>Downvote</button>
        </div>
      </section>
      <Collapsible>
        <CommentsList articleId={article.article_id} />
      </Collapsible>
    </>
  );
}
