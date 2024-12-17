import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../api";
import { Link } from "react-router-dom";

export default function ArticleInfo() {
  const { articleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchArticleById(articleId).then((article) => {
      setArticle(article);
      setLoading(false);
    });
  }, [articleId]);

  const articleDate = new Date(article.created_at);

  const formattedDate = articleDate.toLocaleString();

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <section>
      <div className="article-information">
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
      </div>
    </section>
  );
}
