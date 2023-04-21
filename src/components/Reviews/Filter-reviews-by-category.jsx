import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api";

export const FilterReviewsByCategory = () => {
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
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
        let styledCategory = e.target[0].value.charAt(0).toLowerCase() + e.target[0].value.slice(1);
        styledCategory = styledCategory.replace(/\s/g, '-')
        navigate(`/category/reviews/${styledCategory}`)

    }

    useEffect(()=> {
        setLoading(true);
        fetchCategories().then(res => {
            setLoading(false);
            setCategories(res);
        });
    }, [])

    if (loading) {
        return <p className="categories-loading">Category filter loading</p>
    }

    return (
        <form className="filter-reviews" onSubmit={handleSubmit}>
    

        <select className="box" name="categories" id="categories" onChange={e => setCategory(e.target.value)} required>
                <option value="">Choose category</option>
                {categories.map(category => {
                    let categoryTitle = category.slug.charAt(0).toUpperCase() + category.slug.slice(1);
                    categoryTitle = categoryTitle.replace(/-/g, ' ');
                    return <option key={category.slug} value={categoryTitle}>{categoryTitle}</option>
                })}
            </select>
            
            <button>Filter</button>
        </form>
    )
}