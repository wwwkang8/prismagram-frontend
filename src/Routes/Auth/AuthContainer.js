import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {LOG_IN} from "./AuthQueries";


export default () => {

    /* useState는 Hook이다
    Hook을 사용하여 변수의 상태값을 지정해준다 */
    const [action, setAction] = useState("logIn");
    const username = useInput("");
    const password = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const [requestSecret] = useMutation(LOG_IN, {
            variables: { email: email.value }
        }
    );

    const onLogin = e => {
        e.preventDefault();
        if(email !== ""){
            requestSecret();
        }
    }


    return (
        // AuthPresenter에 이 변수들을 전달
        <AuthPresenter 
            setAction={setAction} 
            action={action} 
            username={username}
            password={password}
            firstName={firstName}
            lastName={lastName}
            email={email}
            onLogin={onLogin}
            />
    );
};