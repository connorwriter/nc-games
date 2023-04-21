import * as React from "react";
import { getReviews } from "../../api"


export const SortBy = ({setReviews, setIsLoading, category}) => {

    

    const handleChange = (e) => {
        const sortBy = e.target.value;
        fetchReviews(category, sortBy);
    }

    const fetchReviews = async (category, sortBy) => {
        setIsLoading(true);
        const reviews = await getReviews(category, sortBy)
            setReviews(reviews.data.reviews);
            setIsLoading(false);
      }

    return (
        <form className="sort-by">
            <select name="" id="" onChange={handleChange}>
            <option value="title">Sort by: Review Title</option>
            <option value="designer">Sort by: Designer</option>
            <option value="owner">Sort by: Owner</option>
            <option value="category">Sort by: Category</option>
            <option value="created_at">Sort by: Newest</option>
            <option value="created_at&order=desc">Sort by: Oldest</option>
            </select>
        </form>
    )
}