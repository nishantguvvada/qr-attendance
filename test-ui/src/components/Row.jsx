export const Row = ({data}) => {

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
                {data.planDetails.name}
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