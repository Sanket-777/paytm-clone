/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
export function BottomWarning({ label, buttontext, to }) {
    return (
        <div className="flex justify-center ">
            <div>
                {label}
            </div>
            <Link className=" underline ml-2" to={to}>
                {buttontext}
            </Link>
        </div>
    )
}