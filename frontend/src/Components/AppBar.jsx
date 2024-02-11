/* eslint-disable react/prop-types */
export function AppBar({username})
{ 
    

    return (
        <div>
            <div className="flex justify-between items-center p-4 shadow-md">
                <label className="text-3xl font-bold " > Payments App</label>
                <div>
                    <div className="text-lg flex items-center">
                        Hello , {username}
                        <div className="m-2 w-10 h-10 rounded-full bg-slate-400 flex items-center justify-center" >
                            <span className="text-2xl text-white">{username[0].toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}