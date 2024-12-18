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
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentPosting, setCommentPosting] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [refreshComments, setRefreshComments] = useState(false);

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
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentSubmitted(false);
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
      .catch((error) => {
        console.log(error);
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
      </section>
      <Collapsible>
        <CommentsList
          articleId={article.article_id}
          refresh={refreshComments}
        />
      </Collapsible>
    </>
  );
}
