import MainHead from "../components/MainHead";
import SubHead from "../components/SubHead";
import InputLabel from "../components/InputLabel";
import Button from "../components/Button";
import BottomMessage from "../components/BottomMessage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center bg-slate-300 h-screen">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <MainHead label={"Sign Up"}></MainHead>
            <SubHead
              label={"Enter your information to create an account"}
            ></SubHead>
            <InputLabel onInput={(e) => setFirstName(e.target.value)} label={"First Name"} placeHolder={"Enter First Name"}></InputLabel>
            <InputLabel onInput={(e) => setLastName(e.target.value)} label={"Last Name"} placeHolder={"Enter LastName"}></InputLabel>
            <InputLabel onInput={(e) => setEmail(e.target.value)} label={"Email"} placeHolder={"Enter Email"}></InputLabel>
            <InputLabel onInput={(e) => setPassword(e.target.value)} label={"Password"} placeHolder={"Enter Password"}></InputLabel>
            <Button label={"Sign up"} onClick={()=>{
               axios.post("http://localhost:3000/api/v1/user/signup", {
                 userName: email || "",
                 password: password || "",
                 firstName: firstName || "",
                 lastName: lastName || ""
               })
               .then((response) => {
                 console.log("signin response", response.data);
                 if(response.status === 200 && response?.data?.token){
                   localStorage.setItem('token', response.data.token);
                   navigate("/dashboard");
                 }
               }).catch((err)=> console.log("err",err))
            }}></Button>
            <BottomMessage label={"Already have an account?"} pathTo={"/signin"} pathText={'Sign In'}></BottomMessage>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
