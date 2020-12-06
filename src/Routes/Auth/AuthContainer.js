import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const secret = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET);
  const [localLoginMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {

          const { data: {requestSecret} } = await requestSecretMutation({ variables: { email: email.value } });

          if (!requestSecret) {
            toast.error("You dont have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          }else{
            toast.success("Check your email box for login secret");
            setAction("confirm");
          }
        } catch {
          toast.error("Can't request secret, try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        userName.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const { data: { createAccount } } = await createAccountMutation({
              variables: {
                  email: email.value,
                  userName: userName.value,
                  firstName: firstName.value,
                  lastName: lastName.value
              }
          });

          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required");
      }
    } else if(action === "confirm"){

      if(secret.value !== ""){
        try{
          const { data: {confirmSecret : token} } = await confirmSecretMutation({
            variables: {
              secret: secret.value,
              email: email.value
            }
          });

          if(token !== "" || token !== undefined){
            localLoginMutation({ variables: { token: token } });
          }

        }catch(error){
          console.log(error);
          toast.error("Can't confirm secret");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret = {secret}
      onSubmit={onSubmit}
    />
  );
};