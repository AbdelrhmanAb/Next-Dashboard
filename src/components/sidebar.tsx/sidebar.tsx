'use client'

import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation'

import { GiHamburgerMenu } from "react-icons/gi";

import {
    IoHome,
    IoSettingsSharp,
    IoHelpCircle,
} from "react-icons/io5";

import {
    FaBox,
    FaUsers,
    FaShoppingCart,
    FaBell,
} from "react-icons/fa";

import { MdMessage, MdAttachMoney } from "react-icons/md";
import { HiChevronDoubleRight } from "react-icons/hi2";
import { TbError404 } from "react-icons/tb";

type Tlink = {
    id: number,
    text: string,
    icon: React.ReactNode,
    link: string
}


export const linksList: Tlink[] = [
    {
        id: 1,
        text: "Dashboard",
        icon: <IoHome />,
        link: '/'
    },
    {
        id: 2,
        text: "Products",
        icon: <FaBox />,
        link: '/products'

    },
    {
        id: 3,
        text: "Clients",
        icon: <FaUsers />,
        link: '/clients'

    },
    {
        id: 4,
        text: "Sales",
        icon: <MdAttachMoney />,
        link: '/sales'
    },
    {
        id: 5,
        text: "Orders",
        icon: <FaShoppingCart />,
        link: '/orders'
    },
        {
        id: 10,
        text: "404",
        icon: <TbError404 />,
        link: '/404'

    },
    {
        id: 6,
        text: "Settings",
        icon: <IoSettingsSharp />,
        link: '#'

    },
    {
        id: 7,
        text: "Messages",
        icon: <MdMessage />,
        link: '#'

    },
    {
        id: 8,
        text: "Notifications",
        icon: <FaBell />,
        link: '#'
    },
    {
        id: 9,
        text: "Help",
        icon: <IoHelpCircle />,
        link: '#'
    },
];

const Sidebar = () => {

    const [open, setOpen] = React.useState(true)

    const pathname = usePathname()

    return (
        <aside className=" h-screen bg-[#1e1e1e] flex flex-col p-5 gap-5  ">
            <span
                className="text-2xl p-1"
                onClick={() => { setOpen(prev => !prev) }}
            >

                {
                    open ? <HiChevronDoubleRight />
                        : <GiHamburgerMenu />


                }


            </span>

            <div className="flex flex-col gap-2">
                {
                    linksList.map(i =>
                        <Link
                            href={i.link}
                            className={`flex items-center  gap-4 p-4 transition duration-200 hover:bg-[#2f2f2f] rounded-2xl ${pathname === i.link ? 'bg-[#2f2f2f]' : ''} `}
                            key={i.id}>
                            <span className="text-xl">
                                {i.icon}
                            </span>
                            <span
                                className={`
                                            overflow-hidden
                                            whitespace-nowrap
                                            transition-all
                                            duration-500
                                            
                                            ${open
                                        ? "opacity-100 max-w-50 ml-2 pr-20"
                                        : "opacity-0 max-w-0 ml-0"
                                    }
                                    `}
                            >
                                {i.text}
                            </span>
                        </Link>
                    )
                }
            </div>

            {open &&
                <button
                    className="px-2 py-1 capitalize rounded-xl text-xl bg-red-500 text-white">
                    log out
                </button>
            }

        </aside>
    )
}

export default Sidebar