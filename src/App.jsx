import "./App.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import ArticleInfo from "./components/ArticleInfo";

function App() {
  return (
    <section id="app">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/articles" element={<ArticleList />}></Route>
        <Route path="/articles/topic/:topic" element={<ArticleList />}></Route>
        <Route path="/articles/:articleId" element={<ArticleInfo />} />
      </Routes>
    </section>
  );
}

export default App;
