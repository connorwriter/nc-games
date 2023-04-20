import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getUsers, postNewComment } from '../../api';

export const AddComment = ({review_id, setComments, comments}) => {

    const [showAddComment, setShowAddComment] = useState(false);
    const [commentBody, setCommentBody] = useState();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [commentPosted, setCommentPosted] = useState(false);

    useEffect(() => {
        fetchUsers().then(res => {
            setUsers(res);
        })
    }, [])

    const handleClick = () => {
        if(showAddComment) {
            setShowAddComment(false);
        } else {
            setShowAddComment(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createNewComment(review_id, e.target[0].value, user)
        if(showAddComment) {
            setShowAddComment(false);
            setCommentBody("");
            
        }
    }

    const createNewComment = async (review_id, body, user) => {
        try {
            const created_at = new Date();
            const comment = {review_id: review_id, body: body, author: user, created_at: created_at, votes: 0 }
            setComments((currComments) => [comment, ...currComments])
            await postNewComment(review_id, body, user)
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchUsers = async () => {
        try {
           return (await getUsers()).data.users;
        } catch (error) {
            console.log(error)
        }
    }

    if(commentPosted) {
        return <p className="comment-success-msg">Comment Posted <FontAwesomeIcon className="comment-success-icon" icon={faCheck} /></p>
    }

    return ( <>
    <button className="add-comment-btn" onClick={handleClick}><h2 className="add-comment-title"><FontAwesomeIcon className="add-comment-icon" icon={faPlus} />Add Comment</h2></button>
    <section className="add-comment">
        
        { showAddComment ? <form onSubmit={handleSubmit}>
            <textarea value={commentBody} onChange={e => setCommentBody(e.target.value)} required></textarea>
            <button>Comment</button>
            <select name="users" onChange={e => setUser(e.target.value)} required>
                <option value="">Choose user</option>
                {users.map(user => {
                    return <option key={user.username} value={user.username}>{user.username}</option>
                })}
            </select>
        </form> : null }
    </section>
    </>
    )

}