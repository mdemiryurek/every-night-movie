import styles from './MovieDetail.module.scss'
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MovieDetails } from "../../types/Movie";


const MovieDetail = () => {
    let { id } = useParams();
    const [ movie, setMovie ] = useState<MovieDetails>();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async() => {
        try {
            const config: AxiosRequestConfig = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/' + id,
                params: { api_key: process.env.REACT_APP_MOVIE_DB_API_KEY}
            };
            const response = await axios.request(config);
            const data: MovieDetails = response.data;
            setMovie(data);
        } catch (error: any) {
            console.log('error:', error);
        }
    }

    return(
        <>
            { !movie && (
                <p>No data to show!</p>
            )}
            { movie && (
                <div>
                <div className={styles.background}
                    style={{backgroundImage: 'url(https://www.themoviedb.org/t/p/w220_and_h330_face' + movie.backdrop_path + ')'}}></div>
                    <div className={styles.overview}>
                        {movie.backdrop_path && (
                            <img src={'https://www.themoviedb.org/t/p/w220_and_h330_face' + movie.backdrop_path}
                                alt={movie.title}
                                className={styles.image}></img>)}

                            <div>
                                <h1 className={styles.title}>
                                    {movie.title}
                                </h1>
                                <p className='fc-grey'>
                                    {movie.genres && movie.genres.map((genre, index) => (
                                        <span>{genre.name}{ index !== movie.genres.length - 1 && ', '}</span>
                                    ))}
                                </p>
                                
                                <h2 className={styles.overviewTitle}>Overview</h2>
                                <p>
                                    {movie.overview}
                                </p>
                            </div>
                    </div>
                </div>
                
            )}
        </>
    )
}

export default MovieDetail;