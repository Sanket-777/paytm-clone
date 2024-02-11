import { Heading } from "../Components/Heading"
import { InputField } from "../Components/InputField"
import { SubHeading } from "../Components/SubHeading"
import { Button } from "../Components/Button"
import { BottomWarning } from "../Components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className=" flex flex-col justify-center ">

            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account "} />
                <InputField onChange={(e) => {
                    setUsername(e.target.value)
                }} placeholder={"sanket@gmail.com"} label={" Email "} />
                <InputField onChange={(e) => {
                    setPassword(e.target.value)
                }} label={" Password "} />
                <Button onPress={async () => {

                    try {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        console.log(response) //
                        if (response.status === 200) {
                            navigate("/dashboard")
                        }
                        else {
                            console.error("Status is not 200 ")
                        }
                    }
                    catch (error) {
                        console.error("Error sending request:", error);

                    }

                }} label={"Sign In"} />
                <BottomWarning label={"Don't Have an account !"} buttontext={" Sign Up"} to={"/signup"} />

            </div>
        </div>
    </div >
}