import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api";

export const FilterReviewsByCategory = () => {
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
           return await getCategories();
           
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCategory(e.target[0].value);
        navigate(`/category/reviews/${category}`)

    }

    useEffect(()=> {
        fetchCategories().then(res => {
            setCategories(res);
        });
    }, [])

    return (
        <form className="filter-reviews" onSubmit={handleSubmit}>
        <select name="categories" id="categories" onChange={e => setCategory(e.target.value)} required>
                <option value="">Choose category</option>
                {categories.map(category => {
                    return <option key={category.slug} value={category.slug}>{category.slug}</option>
                })}
            </select>
            <button>Filter</button>
        </form>
    )
}