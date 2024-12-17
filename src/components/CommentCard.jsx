import { Link } from "react-router-dom";

export default function CommentCard({ comment }) {
  const commentDate = new Date(comment.created_at);
  const formattedDate = commentDate.toLocaleString();
  return (
    <li>
      <h3>By {comment.author}</h3>
      <p>{comment.body}</p>
      <p>{comment.votes} votes</p>
      <p>Written at {formattedDate}</p>
    </li>
  );
}
