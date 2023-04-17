import { Link } from "react-router-dom";

export const Header = () => {
    return (
    <header>
        <nav>
            <h1>NC Games</h1>
            <ul>
            <Link to="/">Home</Link>
                <Link to="/reviews">Reviews</Link>
                <li>Users</li>
            </ul>
        </nav>
    </header>
    )
}