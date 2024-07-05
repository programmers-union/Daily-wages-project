import React from 'react'

const DashboardPage:React.FC = () => {
    const sideNav = [
        'Dashboard',
        'Reports',
        'Charts',
        'Products',
        'Inbox',
        'Settings'
    ];
      
    const topNavLeft = [
        'Home',
        'Name'
    ];
      
    const topNavRight = [
        'jin',
        'hungu'
    ];
      
    const mdIcons = [
        'mdi-ansible',
        'mdi-apple',
        'mdi-anvil',
        'mdi-android-studio',
        'mdi-meteor',
        'mdi-flask',
        'mdi-charity',
        'mdi-rake',
        'mdi-snake',
        'mdi-chart-areaspline',
        'mdi-chair-rolling',
        'mdi-shield-sun'
    ];
      
    return (
        <div className='min-w-[1024px] flex content-center sm:max-w-screen-xl mx-auto'>
            <div className="one w-[240px] px-2 pl-5 h-screen py-3 fixed top-0 left-0">
                <div className="store text-blue-800 font-medium px-1 py-2 mb-3">
                    <div className="flex items-center gap-2">
                        <img className='w-6 h-6' src="https://cdn-icons-png.flaticon.com/128/1828/1828673.png" alt="" /> 
                        Gets Global 
                        <span className="font-black mdi mdi-chevron-down"></span>
                    </div>
                </div>
                <nav className="pt-3">
                    <p className="title uppercase text-xs text-gray-600 tracking-wider">Main</p>
                    <ul className="ml-2 mt-2">
                        <li className="flex-grow px-2 py-1">
                            <a className="text-sm tracking-wide text-blue-900 hover:text-blue-700 active" href="#">
                                <i className="mdi mdi-account"></i> Super
                            </a>
                        </li>
                        {sideNav.map((nav, index) => (
                            <li className="flex-grow px-2 py-1 p-[.75rem]" key={index}>
                                <a className="text-sm font-light text-blue-900 hover:text-blue-700" href="#">
                                    <i className={`mdi ${mdIcons[index]}`}></i> {nav}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="title uppercase text-xs text-gray-600 mt-3">Store</p>
                    <ul className="ml-2 mt-2">
                        {sideNav.map((nav, index) => (
                            <li className="flex-grow px-2 py-1 p-[.75rem]" key={index + 6}>
                                <a className="text-core font-light tracking-wide text-blue-900 hover:text-blue-700" href="#">
                                    <i className={`mdi ${mdIcons[index + 6]}`}></i> {nav}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <section className="box-border relative w-full ml-[240px] h-screen overflow-y-scroll">
                <nav className=" bg-white shadow-sm z-[11] sticky top-0 box-border inline-flex flex-grow w-full h-16 py-4 pr-6 overflow-hidden">
                    <div className="top-nav-left flex flex-grow items-start">
                        <ul className="flex self-center">
                            {topNavLeft.map((nav, index) => (
                                <li className="text-gray-700" key={index}>{nav}</li>
                            ))}
                        </ul>
                        <div className="inline-flex self-center">
                            <input className="min-w-[250px] ml-2 px-4 h-8 content-center shadow rounded-l" type="text" placeholder="Press / to focus search" />
                            <button className="btn inline-block text-white text-core bg-green-500 hover:bg-green-600 h-8 px-2 py-1 -ml-1 rounded-r shadow">
                                <i className="mdi mdi-magnify text-2xl text-center leading-none"></i>
                            </button>
                        </div>
                    </div>
                    <div className="top-nav-right">
                        <ul className="flex justify-end items-center">
                            {topNavRight.map((nav, index) => (
                                <li className="inline-block" key={index}>
                                    <a className="text-gray-700" href="#">
                                        <i className="mdi mdi-login"></i> {nav}
                                    </a>
                                </li>
                            ))}
                            <li className="inline-block">
                                <a href="#">
                                    <img className="h-8 rounded-full shadow" src="https://gravatar.com/avatar/d69aae377ffa1f6fd90935a888933070" alt="Profile" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="main box-border my-10">
                    <div className="card my-2 bg-white shadow-lg rounded">
                        <div className="card-header p-5 border-b">
                            <h2 className="text-xl text-gray-700 font-medium tracking-wide">Today</h2>
                        </div>
                        <div className="bg-[#f7fafc] p-5">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                {[...Array(9)].map((_, index) => (
                                    <div className="bg-gray-200 p-2 text-gray-500" key={index}>{index + 1}</div>
                                ))}
                            </div>
                        </div>
                        <div className="card-footer border-t p-5">
                            <a className="inline-block" href="#">
                                <i className="mdi mdi-newspaper"></i> Something happened today...
                            </a>
                        </div>
                    </div>
                    <div className="card mt-5 bg-white shadow-lg">
                        <div className="card-header p-5 border-b">
                            <h2 className="text-xl text-gray-700 font-medium tracking-wide">Yesterday</h2>
                        </div>
                        <div className="card-content p-5">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                {[...Array(9)].map((_, index) => (
                                    <div className="bg-gray-200 p-2 text-gray-500" key={index}>{index + 1}</div>
                                ))}
                            </div>
                        </div>
                        <div className="card-footer border-t p-5">
                            <a className="inline-block" href="#">
                                <i className="mr-2 mdi mdi-newspaper-variant"></i>Something happened yesterday...
                            </a>
                        </div>
                        <div className="card-footer border-t p-5">
                            <a className="inline-block" href="#">
                                <i className="mr-2 mdi mdi-newspaper-variant-multiple-outline"></i>Something happened last year...
                            </a>
                        </div>
                    </div>
                    <div className="card mt-5 bg-white shadow-lg">
                        <div className="card-header p-5 border-b">
                            <h2 className="text-xl text-gray-700 font-medium tracking-wide">Scroll Test~</h2>
                        </div>
                        <div className="card-content p-5">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                {[...Array(9)].map((_, index) => (
                                    <div className="bg-gray-200 p-2 text-gray-500" key={index}>{index + 1}</div>
                                ))}
                            </div>
                        </div>
                        <div className="card-footer border-t p-5">
                            <a className="inline-block" href="#">
                                <i className="mr-2 mdi mdi-newspaper-variant"></i>Something happened yesterday...
                            </a>
                        </div>
                        <div className="card-footer border-t p-5">
                            <a className="inline-block" href="#">
                                <i className="mr-2 mdi mdi-newspaper-variant-multiple-outline"></i>Something happened last year...
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DashboardPage
