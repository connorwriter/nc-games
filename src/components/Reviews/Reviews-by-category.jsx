import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";
import { getReviews } from "../../api";
import { useEffect, useState } from "react";
import { FilterReviewsByCategory } from "./Filter-reviews-by-category";
import { SortBy } from "../Sort-By/Sort-by";

export const ReviewsByCategory = () => {

    const [reviewsByCategory, setReviewsByCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReviewsByCategory = async (category) => {
        console.log(category)
        setIsLoading(true);
        const reviews = await getReviews(category);
            setReviewsByCategory(reviews.data.reviews);
            setIsLoading(false);
      }
      
      const category = useParams();
      useEffect(() => {
        fetchReviewsByCategory(category.category);
      }, [category])

      let categoryTitle = category.category.charAt(0).toUpperCase() + category.category.slice(1);
      categoryTitle = categoryTitle.replace(/-/g, ' ');

    return ( 
        <main>
    <Header />
    <section>
    <h2 className="review-list-title">{categoryTitle} reviews</h2>
    <div className="options-bar">
    <FilterReviewsByCategory />
    <SortBy setReviews={setReviewsByCategory} setIsLoading={setIsLoading} category={category.category}/>
    </div>
    <ul className="review-list">
        {isLoading ? <li>Loading</li> : reviewsByCategory.map(review => {
            return <li key={review.review_id}>
                <h3><Link to={`/reviews/${review.review_id}`}>{review.title}</Link></h3>
                <img src={review.review_img_url} alt={review.title}/>
                <h4>{review.owner}</h4>
                <div>
                <p>Designer: {review.designer}</p>
                <Link to={`/category/reviews/${review.category}`}><p className="review-category">{review.category}</p></Link>
                </div>
            </li>
        })}
    </ul>
    </section> 
    </main>
)
}