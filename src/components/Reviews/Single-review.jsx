import { getReviewById, patchReviewVote } from "../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Comments } from "../Comments/Comments";
import { AddComment } from "../Comments/Add-comment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


export const SingleReview = (props) => {
    const [review, setReview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [upvoteDisabled, setUpvoteDisabled] = useState(false);
    const [downvoteDisabled, setDownvoteDisabled] = useState(false);
    const [error, setError] = useState(null);
    const [votes, setVotes] = useState(review.votes);
    const [comments, setComments] = useState([]);

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

          await patchReviewVote(id, increment)
        }
        catch (error){
          setError("something went wrong")
          setVotes((currentVotes) => {
            return currentVotes - 1
          })
        }
      }


      const handleUpvote = () => {
        updateReviewVote(review_id, 1);
        if (downvoteDisabled) {
          setDownvoteDisabled(false);
        } else {

          setUpvoteDisabled(true);
          setDownvoteDisabled(false);
        }
        setVotes(votes + 1)
      }

      const handleDownvote = () => {
        updateReviewVote(review_id, -1);
        if(upvoteDisabled) {
          setUpvoteDisabled(false)
        } else {

          setDownvoteDisabled(true);
          setUpvoteDisabled(false);
        }
        setVotes(votes - 1)
      }

      useEffect(() => {
        fetchReview(review_id);
      }, []);

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
        <h2 className="review-title">{review.title}</h2>
        <img src={review.review_img_url} alt={review.title} />
        <p className="votes"><button disabled={upvoteDisabled} onClick={handleUpvote}className="vote-btn"><FontAwesomeIcon className="vote" icon={faChevronUp} /></button><span>votes: {votes}</span><button disabled={downvoteDisabled} onClick={handleDownvote}className="vote-btn"><FontAwesomeIcon className="vote" icon={faChevronDown} /></button>{error && <p>something went wrong</p>}</p>
        
        <p className="review-body">{review.review_body}</p>
      
        </section>}
        
        <section className="comments">
          <AddComment review_id={review_id} comments={comments} setComments={setComments}/>
          <Comments review_id={review_id} comments={comments} setComments={setComments}/>
        </section>
        </main>
    )
    }
