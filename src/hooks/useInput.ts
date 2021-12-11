import { useState } from "react";

export const useInput = (key: string, INITIAL_VALUE: any) => {
    const [inputs, setInputs] = useState(INITIAL_VALUE);

    const handleChange = (event: any) => {
        setInputs({...inputs, [event.target.name]: event.target.value })
    }

    return [inputs, handleChange];
}