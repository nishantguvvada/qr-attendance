import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export const Row = ({data}) => {

    const [plan, setPlan] = useState('');

    useEffect(() => {
        try {
            const getPlans = async () => {
                const response = await axios.get(`http://localhost:3000/api/plans/${data.planId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setPlan(response.data.plan);
            }

            getPlans();

        } catch(err) {

            toast.error(err.message);

        }
    }, []);

    return (
        <>
            <tr className="even:bg-blue-50">
                <td className="p-4 text-[15px] text-slate-900 font-medium">
                {data.clientName}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                {data.clientEmail}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                {plan.name}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                {data.startDate}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                {data.membershipStatus}
                </td>
            </tr>
        </>
    )
}