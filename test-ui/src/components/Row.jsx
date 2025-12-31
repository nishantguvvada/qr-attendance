export const Row = ({data}) => {

    const calculateDays = (endDate) => {

        console.log(new Date(endDate))
        const diffInMs = new Date(endDate) - new Date();
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays >= 0 ? diffInDays : 0;

    }

    return (
        <>
            <tr className="even:bg-blue-50 hover:cursor-pointer">
                <td className="p-4 text-[15px] text-slate-900 font-medium hover:text-blue-800">
                {data.name}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium hover:text-blue-800">
                {data.email}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium hover:text-blue-800">
                {data.planName}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium hover:text-blue-800">
                {data.endDate}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium hover:text-blue-800">
                {calculateDays(data.endDate)} (days left)
                </td>
                <td className={`${calculateDays(data.endDate) > 0 ? "text-green-800": "text-rose-800"} p-4 text-[15px] font-medium hover:text-blue-800`}>
                {calculateDays(data.endDate) > 0 ? "Active": "Expired"}
                </td>
            </tr>
        </>
    )
}