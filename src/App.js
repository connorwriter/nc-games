import "./App.css";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Reviews } from "./components/Reviews/Reviews";
import { ReviewsByCategory } from "./components/Reviews/Reviews-by-category";
import { Routes, Route } from "react-router-dom";
import { SingleReview } from "./components/Reviews/Single-review";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route
          path="/category/reviews/:category"
          element={<ReviewsByCategory />}
        />
        <Route path="/reviews/:review_id" element={<SingleReview />} />
      </Routes>
    </div>
  );
}

export default App;
