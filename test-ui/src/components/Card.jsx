import { useState } from "react";

export const Card = ({data}) => {

    const [clientEmail, setClientEmail] = useState('');

    const handleChange = (e) => {
        setClientEmail(e.target.value);
    };

    const handleClick = () => {
        console.log(data._id)
    }
    
    return (
        <>
            <div className="bg-white border border-gray-200 shadow-md p-6 w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <h3 className="text-xl font-semibold text-slate-900">{data.name}</h3>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{data.price.$numberDecimal}</p>

                <div className="relative flex items-center px-1 bg-gray-50 border-2 border-gray-200 focus-within:border-[#007bff] focus-within:bg-white rounded-lg mt-6">
                    <input name="email" type="email" required onChange={handleChange} value={clientEmail} placeholder="Enter client email"
                        className="p-3 text-slate-900 w-full text-sm bg-transparent outline-none" />
                    <button type="button" onClick={handleClick}
                        className="px-4 py-2.5 cursor-pointer rounded-lg text-white text-sm font-medium tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700">Send</button>
                </div>
            </div>
        </>
    )
}