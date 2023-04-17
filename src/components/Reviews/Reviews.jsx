import { getReviews } from "../../api";
import { Header } from "../Header/Header";
import { useEffect, useState } from "react";

export const Reviews = () => {
    
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

      const fetchReviews = async () => {
        setIsLoading(true);
        const reviews = await getReviews()
            setReviews(reviews);
            setIsLoading(false);
      }

      useEffect(() => {
        fetchReviews();
      }, []);


    return (

        <main>
        <Header />
        <section>
        <h2>Reviews</h2>
        <ul>
            {isLoading ? <li>Loading</li> : reviews.map(review => {
                return <li key={review.review_id}>
                    <h3>{review.title}</h3>
                    <h4>{review.owner}</h4>
                    <p>{review.designer}</p>
                    <p>{review.category}</p>
                </li>
            })}
        </ul>
        </section> 
        </main>
    )
}