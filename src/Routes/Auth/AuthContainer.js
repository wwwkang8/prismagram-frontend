import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("wwwkang5@gmail.com");
  const [requestSecretMutation] = useMutation(LOG_IN);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {

          const requestSecretResult = await requestSecretMutation({ variables: { email: email.value } });
          const requestSecret = requestSecretResult.data.requestSecret;

          if (!requestSecret) {
            toast.error("You dont have an account yet, create one");
            setTimeout(() => setAction("signUp"), 3000);
          }else{
            toast.success("Check your inbox for login secret");
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
          const { createAccount } = await createAccountMutation({
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
      onSubmit={onSubmit}
    />
  );
};