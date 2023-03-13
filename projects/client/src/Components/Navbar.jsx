import React, { useState } from 'react'
import { BiMenuAltLeft, BiChevronsLeft, BiShoppingBag, BiCartAlt, BiArrowToRight } from 'react-icons/bi';
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

const Navbar = () => {
    const [nav, setNav] = useState(false)

    return (
        <div>
            <div onClick={() => setNav(!nav)}
                className="cursor-pointer">
                <BiMenuAltLeft size={30} />
            </div>
            {/* Overlay */}
            {nav ? <div className="bg-black/75 fixed w-[460px] h-screen z-10 top-0">
            </div> : ""}
            {/* Sidebar */}
            <div className={nav ? "bg-white fixed top-0 w-[230px] h-screen z-10 duration-200"
                : "bg-white fixed top-0 w-[230px] h-screen z-10 duration-300 left-[-100%]"}>
                <BiChevronsLeft
                    onClick={() => setNav(!nav)}
                    size={30}
                    className="absolute right-5 top-5 cursor-pointer" />
                <div className="text-xl font-bold py-5 px-2">
                    Xmart
                </div>
                <nav className="text-lg font-semibold px-2">
                    <ul className="flex flex-col text-gray-600">
                        <li className="flex py-2">
                            <BiShoppingBag size={24} className="mr-4" />
                            Products
                        </li>
                        <li className="flex py-2">
                            <BiCartAlt size={24} className="mr-4" />
                            My Cart
                        </li>
                        <li className="flex py-2">
                            <HiOutlineDocumentDuplicate size={24} className="mr-4" />
                            Order
                        </li>
                        <li className="flex py-2">
                            <BiArrowToRight size={24} className="mr-4" />
                            Sign in
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;