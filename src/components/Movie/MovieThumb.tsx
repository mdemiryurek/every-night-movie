import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/Movie';
import styles from './Movie.module.scss';

interface IMovieThumb{
    movie: Movie
}

const MovieThumb: FunctionComponent<IMovieThumb> = (props) => {
    const {movie} = props;
    return(
        <>
            {movie && (
                <Link to={'/detail/' + movie.id}
                className={styles.thumb}>
                    {movie.backdrop_path && (
                        <img src={'https://www.themoviedb.org/t/p/w220_and_h330_face'+movie.backdrop_path}
                            alt={movie.title}
                            className={styles.image}></img>)}
                    <div className={styles.description}>
                        <p className={styles.average}>{movie.vote_average}</p>
                        <p className={styles.title}>{movie.title}</p>
                    </div>
                </Link>
                
            )}
        </>
    )
}

export default MovieThumb;