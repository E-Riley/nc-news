import { useState } from "react";
import { fetchArticleComments, deleteComment } from "../../api";
import { useEffect } from "react";
import CommentCard from "./CommentCard";

export default function CommentsList({
  articleId,
  refresh,
  username,
  handleDelete,
}) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticleComments(articleId).then((comments) => {
      setComments(comments);
      setLoading(false);
    });
  }, [articleId, refresh]);

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId).then(() => {
      setComments((currComments) => {
        return currComments.filter(
          (comment) => comment.comment_id !== commentId
        );
      });
      handleDelete();
    });
  };

  return loading ? (
    <p>Loading comments...</p>
  ) : (
    <section className="comment-list-holder">
      <ul className="comment-list">
        {comments.map((comment) => {
          return (
            <CommentCard
              comment={comment}
              key={comment.comment_id}
              username={username}
              deleteComment={handleDeleteComment}
            />
          );
        })}
      </ul>
    </section>
  );
}
