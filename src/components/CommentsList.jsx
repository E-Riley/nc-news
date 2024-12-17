import { useState } from "react";
import { fetchArticleComments } from "../../api";
import { useEffect } from "react";
import CommentCard from "./CommentCard";

export default function CommentsList({ articleId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArticleComments(articleId).then((comments) => {
      setComments(comments);
      setLoading(false);
    });
  }, [articleId]);

  return loading ? (
    <p>Loading comments...</p>
  ) : (
    <section className="comment-list-holder">
      <ul className="comment-list">
        {comments.map((comment) => {
          return <CommentCard comment={comment} key={comment.comment_id} />;
        })}
      </ul>
    </section>
  );
}
