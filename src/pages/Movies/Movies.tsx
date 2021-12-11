import styles from './Movies.module.scss'

import { useAppSelector } from "../../store";
import { Movie } from '../../types/Movie'
import { useEffect, useState } from 'react';
import MovieThumb from '../../components/Movie/MovieThumb'
import { useLocation } from 'react-router';

const MovieDetail = ({...props}) => {
    const { category } = props;
    const movies = useAppSelector(state => state.movies);
    const [ movieData, setMovieData] = useState<Movie[]>([]);
    const [ pageTitle, setPageTitle] = useState('');
    const { state } = useLocation();

    
    useEffect(() => {
        if (category)
            handlePageProperties();
        else if (state && state.keyword)
            handleSearch();
    }, []);

    const handlePageProperties = () => {
        if (category === 'upcoming'){
            setMovieData(movies.comingSoonMovies);
            setPageTitle('Upcoming movies');
        }
        else if (category === 'popular'){
            setMovieData(movies.mostPopularMovies);
            setPageTitle('Popular movies');
        }
        else if (category === 'rated') {
            setMovieData(movies.topRatedMovies);
            setPageTitle('Top rated movies');
        } 
    }

    const handleSearch = () => {
        setPageTitle('Results for ' + state.keyword);
    }

    return(
        <>
            <h1>{pageTitle}</h1>
            <div className={styles.list}>
                {movieData && movieData.map((movie: Movie) => (
                    <div key={movie.id} 
                        className={styles.thumb}>
                        <MovieThumb movie={movie}></MovieThumb>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MovieDetail;