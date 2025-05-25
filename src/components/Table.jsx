import { useEffect, useState } from "react";
import { escapeSqlString, getDb } from "../db/Index";


export default function Table({ refresh, onDbChange }) {
    const headings = ["First Name", "Last Name", "Email", "Phone", "Blood Group", "Concern", "Allergies"];
    const [patients, setPatients] = useState([]);
    const [sql, setSql] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([]);

    function isSelect(sql) {
        return /^\s*select\b/i.test(sql);
    }
    function isMutating(sql) {
        return /^\s*(insert|update|delete)\b/i.test(sql);
    }

    const fetchHistory = async () => {
        const db = await getDb();
        const res = await db.query(
            "SELECT command FROM sql_history ORDER BY id DESC"
        );
        setHistory(res.rows.map(row => row.command));
    };

    useEffect(() => {
        fetchHistory()
    }, [])

    const handleFunc = async (e) => {
        e.preventDefault();
        // console.log(sql)
        setError(null);
        setResult(null);

        try {
            const db = await getDb();
            await db.query(
                `INSERT INTO sql_history (command) VALUES ('${escapeSqlString(sql)}')`
            );
            let res = await db.query(sql);
            setResult(res);
            // console.log(result)
            if (onDbChange && isMutating(sql)) {
                onDbChange();
            }
            fetchHistory();
        } catch (err) {
            setError(err.message || String(err));
            fetchHistory()
            console.log(err)
        }
    };
    // Fetch patients from Database upon each 'refresh'
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const db = await getDb();
                const result = await db.query("SELECT * FROM patients");
                if (mounted) setPatients(result.rows || []);
            } catch (err) {
                setPatients([]);
            }
        })();
        return () => { mounted = false; };
    }, [refresh]);

    return (
        <div>
            <div className='bg-black pl-20 lg:pl-80 h-auto pt-20 pr-4 lg:pr-20 flex flex-col justify-space-around md:pl-20 sm:pl-20 min-h-screen lg:min-h-screen'>
                <div className="flex justify-center gap-4">
                    <div className='mb-10 lg:w-3/4 md:w-3/4'>
                        <form onSubmit={handleFunc}>
                            <div className="lg:w-[50%] md:w-3/4 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea id="comment" rows={4} value={sql} onChange={e => setSql(e.target.value)} className="w-full px-0 text-sm resize-none text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a query..." required />
                                </div>
                                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                        Search Query
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {history.length > 0 ? <div class="relative rounded-lg overflow-x-auto h-80 shadow-md sm:rounded-lg lg:w-1/2 md:w-3/4 mb-10">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Previous Query/Queries
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="overflow-y-scroll">
                                {history?.map((ele, key) => (<tr key={key} class="border-b border-gray-200 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                        {ele}
                                    </th>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : <div className="text-white mt-4 w-full">No queries executed yet.</div>}
                </div>
                {patients.length > 0 ? <div>
                    <h1 className="text-white uppercase text-2xl mb-2">Patients</h1>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg rounded-lg h-auto">
                        <table class="w-full my-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    {headings?.map((value, key) => (
                                        // <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        <th key={key} scope="col" className={key % 2 == 0 ? "px-6 py-3 bg-gray-50 dark:bg-gray-800" : "px-6 py-3"}>
                                            {value}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {patients?.map((value, key) => (
                                    <tr class="border-b border-gray-200 dark:border-gray-700" key={key}>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                            {value.first_name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {value.last_name}
                                        </td>
                                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            {value.email}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.phone}
                                        </td>
                                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            {value.blood_group}
                                        </td>
                                        <td class="px-6 py-4">
                                            {value.concern}
                                        </td>
                                        <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                            {value.allergies}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    {sql.trim() !== "" && result != null && (result?.rows?.length > 0 ? <div>
                        {(result && isSelect(sql)) && <h1 className="text-white my-4 text-2xl">Query Results</h1>}
                        {(result && isSelect(sql)) && <table class="w-full mb-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
                            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    {result?.fields?.map((value, key) => (
                                        // <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        <th key={key} scope="col" className={key % 2 == 0 ? "px-6 py-3 bg-gray-50 dark:bg-gray-800" : "px-6 py-3"}>
                                            {/* {Object.keys(value)} */}
                                            {value.name}
                                        </th>
                                    ))}

                                </tr>
                            </thead>
                            <tbody>
                                {result?.rows?.map((value, key) => (
                                    <tr key={key} className="border-b border-gray-200 dark:border-gray-700">
                                        {Object.values(value).map((value, key) => (
                                            <td key={key} className={`px-6 py-4 ${key % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""}`}>
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>}

                    </div> : isSelect(sql) ? (<div className="text-white mt-4">No data found for this query.</div>) : null)}
                    {error && <div className="text-white mt-4">{error}</div>}
                </div> : <div className="text-white mt-4">No patients registered yet.</div>}
            </div>
        </div >
    )
}
