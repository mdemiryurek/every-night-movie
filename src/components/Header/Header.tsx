import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Textbox from "../Textbox/Textbox";
import styles from './Header.module.scss';
import { useInput } from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
    const navigate = useNavigate();
    const INITIAL_VALUE = {
        search: ''
    }
    const [inputs, setInputs] = useInput('inputs', INITIAL_VALUE);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        navigate('/search/', { state: {keyword: inputs.search} })
    }

    return(
        <>
            <form className={styles.searchBox} onSubmit={onSubmit}>
                <Textbox name='search'
                    value={inputs.search}
                    onChange={setInputs}
                    placeHolder='Search a movie'
                    fieldStyle='secondary'
                    type='search'></Textbox>
            </form>
            
        </>
    )
}

const Header = () => {
    return(
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <Link to='/'
                    className={styles.logo}>
                    Every Night Movie
                </Link>

                <Navigation></Navigation>

                <Searchbox></Searchbox>
            </div>
            
        </header>
    )
}

export default Header;