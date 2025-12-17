import axios from "axios";

export const Card = ({plan, clientEmail}) => {

    const selectPlan = async (plan) => {

        if(!clientEmail) {
            alert("Email required");
            return;
        }

        console.log("client", clientEmail);
        console.log("plan", plan._id);

        try {
            const response = await axios.post('http://localhost:3000/api/payments/create', {
                planId: plan._id,
                clientEmail: clientEmail
            }, { headers: { 'Authorization': `Bearer ${import.meta.env.VITE_TEST_TOKEN}`}})

            console.log("create response:", response);
            window.location.href = response.data.paymentLink;
        } catch(err) {
            console.log(err);
            alert(err.response.data.error)
        }
    }


    return (
        <>
            <div className="w-full max-w-sm p-6 bg-neutral-primary-soft border border-default rounded-base shadow-xs">
                <h5 className="mb-4 text-xl font-medium text-body">{plan.name}</h5>
                <div className="flex items-baseline text-heading">
                    <span className="text-3xl font-extrabold tracking-tight">INR {plan.price.$numberDecimal}</span>
                    <span className="ms-2 font-medium text-body">/ {plan.duration} days</span>
                </div>
                <ul role="list" className="space-y-4 my-6">
                    <li className="flex items-center">
                        <svg className="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <span className="text-body">Dedicated Warm-up</span>
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <span className="text-body">Strength & Conditioning</span>
                    </li>
                    <li className="flex items-center">
                        <svg className="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <span className="text-body">Integration help</span>
                    </li>
                    <li className="flex items-center decoration-body">
                        <svg className="w-5 h-5 shrink-0 text-fg-brand me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                        <span className="text-body">Recovery</span>
                    </li>
                </ul>
                <button onClick={() => { selectPlan(plan) }} type="button" className="cursor-pointer w-full text-white bg-black hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Choose {plan.name}</button>
            </div>
        </>
    )
}