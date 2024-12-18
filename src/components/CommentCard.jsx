import { Link } from "react-router-dom";
import { useState } from "react";

export default function CommentCard({ comment, username, deleteComment }) {
  const commentDate = new Date(comment.created_at);
  const formattedDate = commentDate.toLocaleString();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    deleteComment(comment.comment_id);
  };
  return (
    <li>
      <h3>By {comment.author}</h3>
      <p>{comment.body}</p>
      <p>{comment.votes} votes</p>
      <p>Written at {formattedDate}</p>
      {comment.author === username && (
        <button onClick={handleDelete}>
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </li>
  );
}
