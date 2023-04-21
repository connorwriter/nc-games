import { getReviews } from "../../api";
import { Header } from "../Header/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterReviewsByCategory } from "./Filter-reviews-by-category";
import { SortBy } from "../Sort-By/Sort-by";
import { useNavigate } from "react-router-dom";

export const Reviews = () => {
    
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    
    const fetchReviews = async () => {
        setIsLoading(true);
        const reviews = await getReviews()
            setReviews(reviews);
            navigate(`/reviews?sort_by=title&order=asc`)
            setIsLoading(false);
            
      }
      
      useEffect(() => {
          fetchReviews();
        }, []);
        
        
        return (
            
            <main>
        <Header />
        <section>
        <h2 className="review-list-title">Reviews</h2>
        <div className="options-bar">
        <FilterReviewsByCategory />
        <SortBy setReviews={setReviews} setIsLoading={setIsLoading}/>
        </div>
        <ul className="review-list">
            {isLoading ? <li>Loading</li> : reviews.map(review => {
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