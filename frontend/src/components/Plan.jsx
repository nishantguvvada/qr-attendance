import { useEffect, useState } from "react"
import axios from "axios";
import { Card } from "./Card";

export const Plan = () => {

    const [plans, setPlans] = useState([]);
    const [clientEmail, setClientEmail] = useState('');

    useEffect(()=> {
        try {
            const getPlans = async () => {
                const response = await axios.get('http://localhost:3000/api/plans/list', { headers: { 'Authorization': `Bearer ${import.meta.env.VITE_TEST_TOKEN}`}});
                setPlans(response.data.plans);
            }
            getPlans();
        } catch(err) {
            console.log(err);
        }
    }, []);

    return <>
        <div className="h-full w-full p-12">
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="email-alternative" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
                    <input onChange={(e) => { setClientEmail(e.target.value) }} value={clientEmail} type="email" id="email-alternative" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="name@example.com" required />
                </div>
            </form>
            <div className="flex flex-col gap-4 justify-center items-center w-full">
                {plans.map((plan, ix) => {
                    return (
                        <div key={ix} ><Card plan={plan} clientEmail={clientEmail}/></div>
                    );
                })}
            </div>
        </div>
    </>
}