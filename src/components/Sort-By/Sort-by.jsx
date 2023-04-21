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
            <option value="title&order=asc">Sort by: Title (A - Z)</option>
            <option value="title&order=desc">Sort by: Title (Z - A)</option>
            <option value="designer&order=asc">Sort by: Designer (A - Z)</option>
            <option value="designer&order=desc">Sort by: Designer (Z - A)</option>
            <option value="owner&order=asc">Sort by: Owner (A - Z)</option>
            <option value="owner&order=desc">Sort by: Owner (Z - A)</option>
            <option value="category&order=asc">Sort by: Category (A -Z)</option>
            <option value="category&order=desc">Sort by: Category (Z - A)</option>
            <option value="created_at&order=asc">Sort by: Newest</option>
            <option value="created_at&order=desc">Sort by: Oldest</option>
            </select>
        </form>
    )
}