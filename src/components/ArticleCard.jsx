import { Link } from "react-router-dom";
export default function ArticleCard({ article, index }) {
  return (
    <Link to={`/articles/${article.article_id}`}>
      <li className="article" id={index}>
        <img src={article.article_img_url} alt={`image for ${article.title}`} />
        <div className="article-content">
          <h2 className="article-info">{article.title}</h2>
          <h3 className="article-info">By {article.author}</h3>
          <p className="article-info">About {article.topic}</p>
          <p className="article-info">{article.votes} votes</p>
        </div>
      </li>
    </Link>
  );
}
