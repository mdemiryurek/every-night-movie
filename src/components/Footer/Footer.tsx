import { Link } from "react-router-dom";
import styles from './Footer.module.scss';

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <label className={styles.label}>A React tutorial project</label>

                <a href="https://github.com/mdemiryurek?tab=repositories"
                    className="fs-small"
                    target='_blank'
                    rel='noreferrer'>
                    GitHub repository
                </a>
            </div>
            
        </footer>
    )
}

export default Footer;