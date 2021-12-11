import { useEffect } from "react";
import { Link } from "react-router-dom";
import Box from '../../components/Box/Box'
import styles from './Dashboard.module.scss'
import { Movie } from '../../types/Movie'
import MovieThumb from '../../components/Movie/MovieThumb';
import { fetchMovies } from "../../features/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const MovieCategoryBox = ({...props}) =>{
    return (
        <Box>
            <div className={styles.head}>
                <h1>{props.title}</h1>
                <Link to={props.link}>
                    See all
                </Link>
            </div>
            
            <div className={styles.list}>
                {props.data && props.data.slice(0, 10).map((movie: Movie) => (
                    <div key={movie.id} 
                        className={styles.thumb}>
                        <MovieThumb movie={movie}></MovieThumb>
                    </div>
                ))}
            </div>
        </Box>
    )
}

const Dashboard = () => {
    const movies = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMovies('COMING'));
        dispatch(fetchMovies('POPULAR'));
        dispatch(fetchMovies('RATED'));
    }, [dispatch]);
    
    return(
        <div className={styles.wrapper}>
            <MovieCategoryBox data={movies.comingSoonMovies}
                title='Upcoming movies'
                link='/upcoming-movies'></MovieCategoryBox>
            <MovieCategoryBox data={movies.mostPopularMovies}
                title='Popular movies'
                link='/popular-movies'></MovieCategoryBox>
            <MovieCategoryBox data={movies.topRatedMovies}
                title='Top rated movies'
                link='/top-rated-movies'></MovieCategoryBox>
        </div>
    )
}

export default Dashboard;