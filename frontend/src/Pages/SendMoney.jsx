import axios from "axios";
import { Heading } from "../Components/Heading";
import { InputField } from "../Components/InputField";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "../Components/Button";

export function SendMoney() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for controlling pop-up visibility
    const [respMessage, Setmessage] = useState("");

    const handleTransfer = async () => {
        const response = await axios.put("http://localhost:3000/api/v1/account/transfer", {
            to: id,
            amount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        console.log(response)
        Setmessage(response.data.message)
        if (response.status === 200) {
            setShowSuccessPopup(true);
        }
        setAmount(0);

    };

    return (
        <div className="bg-slate-200 h-screen flex justify-center">
            <div className=" bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base text-white p-3 absolute top-24 left-96 "
                onClick={(e) => {
                    navigate("/dashboard")
                }}>
                <button className="flex ">Back</button>
            </div>
            <div className=" flex flex-col justify-center ">
                <div className="rounded-lg bg-white w-96 text-center p-8 h-max px-4">
                    <div className="p-6">
                        <Heading label={"Send Money"} />
                    </div>
                    <div className=" flex items-center space-x-4 ">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center" >
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <div className="text-3xl font-medium ">
                            <span>{name}</span>
                        </div>
                    </div>
                    <InputField onChange={(e) => {
                        setAmount(e.target.value);
                    }} value={amount} label={"Amount (in Rs)"} placeholder={" Enter Amount "} />
                    <button onClick={handleTransfer} type="button" className="w-full text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-5 py-2.5 mt-4 me-2 mb-2">{"Initiate Transfer"}</button>
                </div>
            </div>
            {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`bg-white p-8 rounded-lg text-center ${respMessage === 'Transaction Successfull!' ? 'bg-green-100' : 'bg-red-100'}`}>
                        <p className={`text-2xl font-medium mb-4 ${respMessage === 'Transaction Successfull!' ? 'text-green-700' : 'text-red-700'}`}>{respMessage}</p>
                        <button onClick={() => setShowSuccessPopup(false)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Close</button>
                    </div>
                </div>
            )}

        </div>
    );
}
