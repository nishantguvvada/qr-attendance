import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Row } from "./Row";

export const Table = () => {

    const [clientList, setClientList] = useState([]);

    useEffect(() => {

        const getUserDetails = async () => {

            try {

                const response = await axios.get('http://localhost:3000/api/clients/list', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setClientList(response.data.data);

            } catch(err) {

                toast.error(err.message);

            }
        }

        getUserDetails();        
        
    }, []);
    return (
        <>
        <div className="mt-4 border border-slate-300 rounded-lg p-6 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto">
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 whitespace-nowrap">
                <tr>
                    <th className="p-4 text-left text-sm font-medium text-white">
                    Name
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                    Email
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                    Plan
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                    End Date
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                    Membership Expiration
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-white">
                    Status
                    </th>
                </tr>
                </thead>

                <tbody className="whitespace-nowrap">
                    {clientList.length > 0 ? clientList.map((client, id) => { return <Row key={id} data={client} /> }) : <tr className="even:bg-blue-50">
                    <td className="p-4 text-[15px] text-slate-900 font-medium">
                    -
                    </td>
                    <td className="p-4 text-[15px] text-slate-600 font-medium">
                    -
                    </td>
                    <td className="p-4 text-[15px] text-slate-600 font-medium">
                    -
                    </td>
                    <td className="p-4 text-[15px] text-slate-600 font-medium">
                    -
                    </td>
                    <td className="p-4 text-[15px] text-slate-600 font-medium">
                    -
                    </td>
                    <td className="p-4 text-[15px] text-slate-600 font-medium">
                    -
                    </td>
                    </tr>}
                </tbody>
            </table>
            </div>
        </div>
        </>
    )
}