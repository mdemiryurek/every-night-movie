import { FunctionComponent } from 'react'
import styles from './Box.module.scss';

const Box: FunctionComponent<{}> = (props) => {
    return(
        <div className={styles.box}>
            {props.children}
        </div>
    )
}

export default Box;