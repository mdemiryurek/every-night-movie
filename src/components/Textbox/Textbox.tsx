import { FunctionComponent } from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import styles from './Textbox.module.scss'

interface ITextboxProps {
    name: string,
    value: string,
    type?: "text" | "password" | "email" | "number" | "search" | undefined,
    title?: string,
    disabled?: boolean,
    onChange: Function,
    required?: boolean,
    validation?: string,
    placeHolder?: string,
    fieldStyle: "default" | "secondary"
}
  
const Textbox: FunctionComponent<ITextboxProps> = (props) => {
    const invalid = props.validation && props.validation.toString() !== "" ? true : false;

    return(
        <div className={`${(styles.container)} ${(styles[props.fieldStyle])} ${(invalid ? styles.invalid : null)}`}>
            { props.title &&
            (<label htmlFor={props.name}
                className={styles.title}>
                {props.title} {props.required && " *"}
            </label>)}
            {props.type==='search' && (
                <BiSearchAlt className={styles.search}
                    width='24px'></BiSearchAlt>
            )}
            <input type={props.type}
                id={props.name}
                name={props.name}
                onChange={(e) => props.onChange(e)}
                disabled={props.disabled}
                className={styles.field}
                placeholder={props.placeHolder}></input>
            {invalid && (
                <p aria-live="polite">
                    {props.validation}
                </p>
            )}
        </div>
    )
}

Textbox.defaultProps = {
    type: 'text',
    fieldStyle: 'default' 
}
export default Textbox;