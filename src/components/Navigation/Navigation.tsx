import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from "../../store";
import styles from './Navigation.module.scss'
import { fetchPopularGenres } from "../../features/genresSlice";

const Navigation = () => {
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [subMenuVisibility, setSubMenuVisibility] = useState(false);
    const genres = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();

    const toggleMenu = () => {
        setMenuVisibility(!menuVisibility);
    }

    const toggleSubMenu = () => {
        setSubMenuVisibility(!subMenuVisibility);
    }

    useEffect(() => {
        dispatch(fetchPopularGenres());
    }, [dispatch]);

    return(
        <>
            <button id="menu-button"
                className={`${styles.menu} ${(menuVisibility && styles.active)}`}
                onClick={toggleMenu}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>

            <nav id="navigation"
                className={`${styles.navigation} ${(menuVisibility && styles.active)}`}
                aria-labelledby="main-menu-label"
                role="navigation">
                <label id="main-menu-label" className="visually-hidden">Main Menu</label>
                <ul>
                    <li>
                        <Link to="/">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to='#' onClick={toggleSubMenu}>
                            Categories
                            <MdKeyboardArrowDown></MdKeyboardArrowDown>
                        </Link>
                        
                            <ul className={`${(subMenuVisibility && styles.subActive)}`}>
                                {genres.loading && (
                                    <li>Loading</li>
                                )}
                                {genres.data && genres.data.map((genre) => (
                                <li key={genre.id}> 
                                    <Link to={'#'}
                                        title={genre.name}>
                                        {genre.name}
                                    </Link>
                                </li>//TODO: Link will be added after genre page completed
                                ))}
                            </ul>

                    </li>
                    
                </ul>
            </nav>
        </>
    )
}

export default Navigation;