import { useAppSelector } from "../../store";
import { Movie } from '../../types/Movie'
import { useEffect, useState } from 'react';
import MovieThumb from '../../components/Movie/MovieThumb'
import styles from './Search.module.scss'
import { useLocation } from 'react-router';

const Search: React.FunctionComponent = () => {
    const movies = useAppSelector(state => state.movies);
    const [ movieData, setMovieData] = useState<Movie[]>([]);
    const { state } = useLocation();

    useEffect(() => {
        async function searchData() {
            const comingSoonSearch = await search(movies.comingSoonMovies);
            const popularSearch = await search(movies.mostPopularMovies);
            const ratedSearch = await search(movies.topRatedMovies);

            let filteredData: Movie[] = [];
            if(comingSoonSearch.length > 0)
                filteredData = filteredData.concat(comingSoonSearch);
            if(popularSearch.length > 0)
                filteredData = filteredData.concat(popularSearch);
            if(ratedSearch.length > 0)
                filteredData = filteredData.concat(ratedSearch);
            setMovieData(filteredData);
        }

        searchData();
        
    }, []);

    const search = async(data: Movie[]): Promise<Movie[]>  => {
        const filtered: Movie[] = data.filter((movie => {
            return filterInTitle(movie);
        }));

        return filtered;
    }

    const filterInTitle = (movie: Movie) => {
        if (movie.title.toLowerCase().includes(state.keyword.toLowerCase()))
            return true;
        else if (movie.original_title.toLowerCase().includes(state.keyword.toLowerCase()))
            return true;
        else
            return false;
    }

    return(
        <>
            <h1>Results for '{state && state.keyword}'</h1>
            <div className={styles.list}>
                {movieData.length === 0 && (<p>No result to show!</p>)}
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

export default Search;