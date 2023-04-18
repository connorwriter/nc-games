import { useEffect } from "react"
import { getComments } from "../../api"
import { useState } from "react";

export const Comments = ({review_id}) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    const fetchComments = async (review_id) => {
        setIsLoading(true);
        const commentsData = await getComments(review_id)
            setComments(commentsData);
            setIsLoading(false);
      }
    useEffect(() => {
        fetchComments(review_id)
    }, [])

    return (
        comments ?
        <ul className="comments">
            <li><h3>Comments</h3></li>
            {comments.map(comment => {
                console.log(comment)
                return <li key={comment.comment_id}>
                    <div>
                    <h4>{comment.author}</h4>
                    <p>{new Date(comment.created_at).toDateString()}</p>
                    </div>
                    <p>{comment.body}</p>
                    <p className="votes">votes: {comment.votes}</p>
                </li>
            })}
        </ul> : null
    )

}