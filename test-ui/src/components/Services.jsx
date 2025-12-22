import { useEffect, useState } from "react"
import { Card } from "./Card"
import axios from "axios";

export const Services = () => {

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        try {
            const getPlans = async () => {

                const response = await axios.get('http://localhost:3000/api/plans/list', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data.plans);
                setPlans(response.data.plans)
            }

            getPlans();
        } catch(err) {
            console.log(err);
        }
    }, []);
    return (
        <>
            <div className="mt-12 w-full h-full flex flex-row justify-center items-center">
                <div className="bg-gray-50">
                    <div className="min-h-screen flex flex-col items-start justify-center py-6 px-4">
                        <div className="max-w-[480px] w-full">

                            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                                <h1 className="text-slate-900 text-center text-3xl font-semibold">Select a plan</h1>
                                <div className="mt-12 space-y-6">
                                    {plans.length > 0 ? plans.map((plan, id) => { return <Card key={id} data={plan} /> }) : "-"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}