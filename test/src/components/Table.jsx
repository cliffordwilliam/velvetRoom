export default function Table({rows, headers, caption}) {
    return (
        <>
            <div className="table-con">
                <table>
                    <caption>{caption}</caption>
                    <thead>
                        <tr>
                            {headers?.map((header, i)=>{
                                return <th key={i} scope="col">{header}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map((row, rowI)=>{
                            return <tr key={rowI}>{row?.map((col, colI)=>{
                                return <td key={colI}>{col}</td>
                            })}</tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}