import { useEffect, useState } from "react";
import { AppBar } from "../Components/AppBar";
import Balance from "../Components/Balance";
import { Users } from "../Components/User";
import axios from "axios";

export function Dashboard() {
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("fullname");
    const [balance, Setbalance] = useState(0);
    useEffect(() => {

        const fetchData = async () => {

            const response = await axios.get("https://paytm-backend-bay.vercel.app//api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            Setbalance(response.data.balance)
        }

        fetchData();
    }, [token])
    return (
        <div >

            <AppBar username={name} />
            <div className="m-8">
                <Balance balance={balance} />
                <Users />
            </div>


        </div>
    )
}