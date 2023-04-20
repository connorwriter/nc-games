import { useEffect } from "react"
import { getCommentsById } from "../../api"
import { useState } from "react";

export const Comments = ({review_id, comments, setComments, commentError}) => {

    const [isLoading, setIsLoading] = useState(true);
    
    const fetchComments = async (review_id) => {
        setIsLoading(true);
        const commentsData = await getCommentsById(review_id)
            setIsLoading(false);
            setComments(commentsData);
      }
    useEffect(() => {
        fetchComments(review_id)
    }, [])

    // if(commentError) {
    //     return <p className="comment-error">{commentError}</p>
    // }
    return (
        isLoading ? <p>Loading</p> :
        comments ?
        <ul className="comment-list">
            {commentError ? <p className="comment-error">{commentError}</p> : null}
            {comments.map(comment => {
                return <li key={comment.comment_id}>
                    <div>
                    <h4>{comment.author}</h4>
                    <p>{new Date(comment.created_at).toDateString()}</p>
                    </div>
                    <p>{comment.body}</p>
                    <p className="votes">votes: {comment.votes}</p>
                </li>
            })}
        </ul> : <h4 className="no-comments">This post has no comments</h4>
    )

}