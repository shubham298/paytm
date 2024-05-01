import MainHead from "../components/MainHead";
import SubHead from "../components/SubHead";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";
import BottomMessage from "../components/BottomMessage";
import axios from "axios";
import { useState, useEffect } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function triggerSignIn(params) {
    axios
      .post("http://localhost:3000/api/v1/user/signin", {
        userName: email || "",
        password: password || "",
      })
      .then((response) => {
        console.log("response", response.data);
        if(response.status === 200){
          localStorage.setItem('isLoggedIn', true);
        }
        setSignInResponse(response);
      }).catch((err)=> console.log("err",err))
  }
  return (
    <div className="flex justify-center bg-slate-300 h-screen">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <MainHead label={"Sign In"}></MainHead>
          <SubHead
            label={"Enter your information to create an account"}
          ></SubHead>
          <InputLabel
            value={email}
            label={"Email"}
            placeHolder={"shubhamdogra@gmail.com"}
            onInput={(e) => setEmail(e.target.value)}
          ></InputLabel>
          <InputLabel
            value={password}
            label={"Password"}
            placeHolder={"Enter Password"}
            onInput={(e) => setPassword(e.target.value)}
          ></InputLabel>
          <Button label={"Sign In"} onClick={() => triggerSignIn()}></Button>
          <BottomMessage
            label={"Don't have an account?"}
            pathTo={"/signup"}
            pathText={"Sign Up"}
          ></BottomMessage>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
