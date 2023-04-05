import React from "react";
import { Link } from "react-router-dom";
import {
    BiUser,
    BiKey,
    BiHome,
    BiLogOutCircle
} from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

const SettingSection = () => {
    return (
        <div className="flex flex-col justify-center mx-20 my-10">
            <div className="text-xl font-bold">
                Settings
            </div>
            <div className="flex justify-between text-base font-semibold mt-10 mb-3">
                <BiUser className="my-auto" size={25} />
                <div className="my-auto pl-2 pr-32">
                    Personal Data
                </div>
                <Link to='/personal-data'>
                    <IoIosArrowForward className="my-auto" size={22} />
                </Link>
            </div>
            <div className="flex justify-between text-base font-semibold my-3">
                <BiKey className="my-auto" size={25} />
                <div className="my-auto pl-4 pr-28">
                    Change Password
                </div>
                <Link to='/change-password'>
                    <IoIosArrowForward className="my-auto" size={22} />
                </Link>
            </div>
            <div className="flex justify-between text-base font-semibold my-3">
                <BiHome className="my-auto" size={25} />
                <div className="my-auto pl-2 pr-36">
                    My Address
                </div>
                <Link to='/my-address'>
                    <IoIosArrowForward className="my-auto" size={22} />
                </Link>
            </div>
            <div className="flex justify-between text-base font-semibold my-3">
                <BiLogOutCircle className="my-auto" size={25} />
                <div className="my-auto pr-40">
                    Sign out
                </div>
                <IoIosArrowForward className="my-auto" size={22} />
            </div>
        </div>
    )
}

export default SettingSection;