import { getCategories } from "../../api";
import { Header } from "../Header/Header";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FilterReviewsByCategory } from "../Reviews/Filter-reviews-by-category";

export const Home = () => {
    return (
        <>
        <Header />
        <FilterReviewsByCategory />
        </>
    )
    
}