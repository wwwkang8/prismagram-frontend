import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {LOG_IN, CREATE_ACCOUNT} from "./AuthQueries";
import { toast } from "react-toastify";


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
            update: (_, {data}) => {
                const { requestSecret } = data;
                if(!requestSecret){
                    console.log("dsfsdfsdfs");
                    toast.error("You don't have an account yet, create one");
                    setTimeout(() => setAction("signup"), 3000);
                }
            },
            variables: { email: email.value }

        }
    );

    const createAccount = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    })

    const onSubmit = e => {
        e.preventDefault();
        if(action === "logIn"){
            if(email !== ""){
                requestSecret();
            }else {
                toast.error("Email is required");
            }
        }else if(action === "signUp"){
            if(email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value){
                    createAccount();
                }
        }else{
            toast.error("All fields are required");
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
            onSubmit={onSubmit}
            />
    );
};