import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
    const location = useLocation();

    const buttonOneBg = () => {
        if (location.pathname == '/') return 'bg-slate-700 rounded-lg'
        else return 'bg-slate-800 rounded'
    }

    const buttonTwoBg = () => {
        if (location.pathname == '/patient-list') return 'bg-slate-700 rounded-lg'
        else return 'bg-slate-800 rounded'
    }
    return (
        <div>
            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 h-screen transition-transform w-[53px] sm:translate-x-0 sm:w-[53px] lg:w-[300px]" aria-label=" Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
                    <ul class="space-y-2 font-medium">
                        <li className={buttonOneBg()}>
                            <Link to="/" className="h-[100px] flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 group">
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Patient Registration</span>
                            </Link>
                        </li>
                        <hr />
                        <li className={buttonTwoBg()}>
                            <Link to="/patient-list" class="h-[100px] flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 group">
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Patients</span>
                            </Link>
                        </li>
                    </ul>
                    <div className='sm:visible md:visible w-10'>
                        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcms.infra.medblocks.com%2Fassets%2Fa4bdf22d-2032-42fd-b1cb-43afe533cc1d&f=1&nofb=1&ipt=f282c68aa39d94ee6fb08321abb5f3c03678065444e704e6755dcd5013f5b4a3" className='h-auto' alt="" />
                        <h1 className='text-white font-bold md:invisible lg:visible invisible'>Medblocks</h1>
                    </div>
                </div>
                <div>
                </div>
            </aside>
        </div >
    )
}
