import "./App.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <section id="app">
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticleList />}></Route>
      </Routes>
    </section>
  );
}

export default App;
