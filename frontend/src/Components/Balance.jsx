/* eslint-disable react/prop-types */
export default function Balance({ balance }) {
    
    return (
        <div>
            <div className=" mt-6 ml-4 text-2xl font-medium ">
                <label htmlFor="">Your Balance :₹{balance}</label>
            </div>
        </div>
    )
}