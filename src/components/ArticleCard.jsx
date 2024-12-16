export default function ArticleCard({ article, index }) {
  return (
    <li className="article" id={index}>
      <img src={article.article_img_url} alt="article image" />
      <div className="article-content">
        <h2 className="article-info">{article.title}</h2>
        <p className="article-info">Author: {article.author}</p>
        <p className="article-info">Topic: {article.topic}</p>
        <p className="article-info">Votes: {article.votes}</p>
      </div>
    </li>
  );
}
