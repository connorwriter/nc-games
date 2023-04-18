import { getReviewById, patchReviewVote } from "../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Comments } from "../Comments/Comments";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';


export const SingleReview = (props) => {
    const [review, setReview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [voteDisabled, setVoteDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [votes, setVotes] = useState(review.votes)

    const formattedDate = new Date(review.created_at).toDateString();
    const {review_id} = useParams();

    const fetchReview = async (id) => {
        setIsLoading(true);
        const review = await getReviewById(id)
            setReview(review);
            setVotes(review.votes);
            setIsLoading(false);
          
      }

      const updateReviewVote = async (id, increment) => {
        try {

          const review = await patchReviewVote(id, increment)
          setReview(review)
        }
        catch (error){
          setError(error)
        }
      }

      const handleClick = () => {
        updateReviewVote(review_id, 1);
        setVoteDisabled(true);
        setVotes(votes + 1)
      }

      useEffect(() => {
        fetchReview(review_id);
      }, []);

      if (error) {
        return <p>{error}</p>;
      }
      return (
        
        <main>
        <Header />
        {isLoading ? <p>Loading</p> : 
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
        <p className="votes"><span>votes: {votes}</span> <button disabled={voteDisabled} onClick={handleClick}className="upvote-btn"><FontAwesomeIcon className="upvote" icon={faChevronUp} /></button></p>
        <p className="review-body">{review.review_body}</p>
      
        </section>}
        
        <section className="comments">
          <Comments review_id={review_id}/>
        </section>
        </main>
    )
    }
