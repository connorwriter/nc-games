import { getReviewById } from "../../api";
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";

export const SingleReview = (props) => {
    const [review, setReview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const formattedDate = new Date(review.created_at).toDateString();

    const review_id = /\d+/.exec(window.location.pathname);

    const fetchReview = async (id) => {
        setIsLoading(true);
        const review = await getReviewById(id)
            setReview(review);
            setIsLoading(false);
      }

      useEffect(() => {
        fetchReview(review_id);
      }, []);

      return (
        
        <main>
        <Header />
        <section className="review">
          <div className="review-flex">
        <p className="review-category">{review.category}</p>
        <p><i>by</i> <b>{review.owner}</b></p>
          </div>
        <div>

        <p className="publish-date"><i>Created:</i> <b>{formattedDate}</b></p>
        </div>
        <h2>{review.title}</h2>
        <img src={review.review_img_url} alt={review.title} />
        <p className="review-votes">votes: {review.votes}</p>
        <p className="review-body">{review.review_body}</p>



        </section> 
        </main>
    )
    }
