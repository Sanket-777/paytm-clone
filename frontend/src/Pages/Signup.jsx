import { Heading } from "../Components/Heading"
import { InputField } from "../Components/InputField"
import { SubHeading } from "../Components/SubHeading"
import { Button } from "../Components/Button"
import { BottomWarning } from "../Components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
export function Signup() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className=" flex flex-col justify-center ">

            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create your account "} />
                <InputField onChange={e => {
                    setFirstName(e.target.value)
                }} placeholder={"Enter your FirstName  here"} label={" FirstName "} />
                <InputField onChange={e => {
                    setLastname(e.target.value)
                }} placeholder={"Enter your LastName  here"} label={" LastName "} />
                <InputField onChange={e => {
                    setUsername(e.target.value)
                }} placeholder={"Enter your Email address here"} label={" Email "} />
                <InputField onChange={e => {
                    setPassword(e.target.value)
                }} label={" Password "} />
                <Button onPress={async () => {
                    const response = await axios.post("http://paytm-backend-bay.vercel.app/api/v1/user/signup", {
                        username,
                        firstName,
                        lastName,
                        password
                    })
                    console.log(response.data)
                    if (response.status === 200) {
                        navigate("/signin")
                    }
                    // else {
                    //     console.log("Something went wrong during signup")
                    // }
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("fullname", firstName + " " +lastName);

                }} label={"Sign Up"} />
                <BottomWarning label={"Already Have an account !"} buttontext={"Sign In"} to={"/signin"} />

            </div>
        </div>
    </div >
}