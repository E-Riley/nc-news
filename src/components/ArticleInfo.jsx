import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, postComment, updateArticleVotes } from "../../api";
import { Link } from "react-router-dom";
import CommentsList from "./CommentsList";
import Collapsible from "./Collapsible";

export default function ArticleInfo() {
  const username = "cooljmessy"; //hard coded for now
  const { articleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [commentPosting, setCommentPosting] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArticleById(articleId)
      .then((article) => {
        setArticle(article);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError("The article you are looking for does not exist.");
        } else {
          setError("Something went wrong. Please try again");
        }
        setLoading(false);
      });
  }, []);

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

  const handleChange = (e) => {
    setCommentSubmitted(false);
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentSubmitted(false);
    setCommentError(null);

    if (newComment.trim() === "") {
      setCommentError("Comment cannot be empty");
      return;
    }
    setCommentPosting(true);
    postComment(articleId, {
      username,
      body: newComment,
    })
      .then(() => {
        setNewComment("");
        setCommentPosting(false);
        setCommentSubmitted(true);
        setRefreshComments((currValue) => !currValue);
        setArticle((currArticle) => {
          return {
            ...currArticle,
            comment_count: currArticle.comment_count + 1,
          };
        });
      })
      .catch(() => {
        setCommentPosting(false);

        setCommentError("Failed to post comment, please try again");
      });
  };

  const handleCommentDelete = () => {
    setArticle((currArticle) => {
      return { ...currArticle, comment_count: currArticle.comment_count - 1 };
    });
  };

  return loading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <section className="error-log">
      <h2>Error</h2>
      <p>{error}</p>
    </section>
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
        <div className="vote-buttons">
          <button
            onClick={() => handleVote(1)}
            className="btn btn-outline-primary"
          >
            <i className="bi bi-arrow-up"></i>
          </button>
          <p className="counts">{article.votes} votes</p>
          <button
            onClick={() => handleVote(-1)}
            className="btn btn-outline-danger"
          >
            <i className="bi bi-arrow-down"></i>
          </button>
        </div>
        <p className="counts">
          <i className="bi bi-chat-dots"></i> {article.comment_count} comments
        </p>
      </section>
      <section className="comment-form">
        <h3>Leave a comment</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={handleChange}
            placeholder="Your comment here"
            required
          ></textarea>
          <button type="submit">
            {commentPosting ? "Posting..." : "Post Comment"}
          </button>
        </form>
        {commentPosting && <p>Your comment is being posted...</p>}
        {commentSubmitted && <p>Comment successfully posted</p>}
        {commentError && <p>{commentError}</p>}
      </section>
      <Collapsible>
        <CommentsList
          articleId={article.article_id}
          refresh={refreshComments}
          username={username}
          handleDelete={handleCommentDelete}
        />
      </Collapsible>
    </>
  );
}
