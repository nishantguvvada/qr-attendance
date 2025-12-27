export const Row = ({data}) => {

    return (
        <>
            <tr className="even:bg-blue-50">
                <td className="p-4 text-[15px] text-slate-900 font-medium">
                {data.name}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                {data.email}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                {data.planName}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                {data.endDate}
                </td>
                <td className="p-4 text-[15px] text-slate-600 font-medium">
                {data.membershipStatus}
                </td>
            </tr>
        </>
    )
}