import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>NC Articles</h1>
      <div className="navigation">
        <Link to="/">
          <p className="link">Home</p>
        </Link>

        <Link to="/articles">
          <p className="link">Articles</p>
        </Link>
      </div>
    </header>
  );
}
