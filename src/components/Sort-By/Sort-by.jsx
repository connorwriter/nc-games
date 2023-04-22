import * as React from "react";
import { getReviews } from "../../api"


export const SortBy = ({setReviews, setIsLoading, category}) => {

    const handleChange = (e) => {
        const params = e.target.value;
        fetchReviews(category, params);
    }

    const fetchReviews = async (category, params) => {
        setIsLoading(true);
        const reviews = await getReviews(category, params)
            setReviews(reviews.data.reviews);
            setIsLoading(false);
      }

    return (
        <form className="sort-by">
            <select name="" id="" onChange={handleChange}>
            <option value='{"sort_by": "title", "order": "asc"}'>Sort by: Title (A - Z)</option>
            <option value='{"sort_by": "title", "order": "desc"}'>Sort by: Title (Z - A)</option>
            <option value='{"sort_by": "designer", "order": "asc"}'>Sort by: Designer (A - Z)</option>
            <option value='{"sort_by": "designer", "order": "desc"}'>Sort by: Designer (Z - A)</option>
            <option value='{"sort_by": "owner", "order": "asc"}'>Sort by: Owner (A - Z)</option>
            <option value='{"sort_by": "owner", "order": "desc"}'>Sort by: Owner (Z - A)</option>
            <option value='{"sort_by": "category", "order": "asc"}'>Sort by: Category (A -Z)</option>
            <option value='{"sort_by": "category", "order": "desc"}'>Sort by: Category (Z - A)</option>
            <option value='{"sort_by": "created_at", "order": "asc"}'>Sort by: Newest</option>
            <option value='{"sort_by": "created_at", "order": "desc"}'>Sort by: Oldest</option>
            </select>
        </form>
    )
}