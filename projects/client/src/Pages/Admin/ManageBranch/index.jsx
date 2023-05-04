import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../helper";
import PageAdmin from "../../../Components/PageAdmin";
import {
    AiOutlineEye,
    AiOutlineEyeInvisible
} from "react-icons/ai";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const ManageBranch = () => {
    const [admin, setAdmin] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [branch_id, setBranchId] = useState("");
    const [branchList, setBranchList] = useState([]);
    const [eyeOpen, setEyeOpen] = useState(false);
    const [nameValue, setNameValue] = useState("");
    const nameRef = useRef("");
    const [branchValue, setBranchValue] = useState("");
    const [orderBy, setOrderBy] = useState("u.id");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(0);
    const [isModal, setIsModal] = useState(false);

    const getDataAdmin = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/user/get-branch-admin?order_by=${orderBy}&page=${page}&name=${nameValue}&branch=${branchValue}`);
            setAdmin(data.data);
            setLimit(data.limit)
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        getDataAdmin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderBy, page, name, nameValue, branchValue]);

    useEffect(() => {
        axios.get(`${API_URL}/product/get-branch-list`).then((res) => {
            setBranchList(res.data);
        });
    }, []);

    const onSubmit = async () => {
        try {
            const result = await axios.post(`${API_URL}/user/add-branch-admin`, {
                name,
                phone,
                email,
                password,
                branch_id
            });
            alert(result.data.message);
            getDataAdmin();
        } catch (error) {
            alert(error.response.data.message);
        };
    };

    const handleSortById = () => {
        setOrderBy("u.id");
        getDataAdmin();
    };

    const handleSortByName = () => {
        setOrderBy("u.name");
        getDataAdmin();
    };

    const handleSortByBranchName = () => {
        setOrderBy("b.name");
        getDataAdmin();
    };

    const handleNextPage = () => {
        setPage(page + 1);
        getDataAdmin();
    };

    const handlePrevPage = () => {
        setPage(page - 1);
        getDataAdmin();
    };

    const handleBranchNameChange = (e) => {
        const selected = e.target.value;
        if (selected === "Select Branch") {
            setBranchValue("");
        } else {
            setBranchValue(selected);
        }
    };

    return (
        <PageAdmin>
            <div className="container">
                <div className="text-2xl font-bold">Manage Branch</div>
                <div className="flex">
                    {/* Branch Admin List */}
                    <div className="flex flex-col py-5">
                        <div className="flex text-xl font-semibold ml-5 mb-2">
                            Branch Admin List
                        </div>
                        <div className="flex justify-between mb-2">
                            <div className="relative w-[360px] pl-5">
                                <IoSearchOutline
                                    size={20}
                                    className="absolute top-[6px] left-6 text-slate-400"
                                />
                                <RxCross2
                                    size={20}
                                    className="absolute top-[6px] right-2 text-slate-400 cursor-pointer"
                                    onClick={() => {
                                        nameRef.current.value = "";
                                        setNameValue("");
                                    }}
                                />
                                <input
                                    type="text"
                                    ref={nameRef}
                                    className="border w-full h-8 rounded-lg px-8 "
                                    placeholder="Username"
                                    onChange={(e) => setNameValue(e.target.value)}
                                />
                            </div>
                            <select
                                className="w-[340px] border rounded-lg px-1 h-8 focus:ring-black focus:border-black truncate mr-5"
                                value={branchValue}
                                onChange={handleBranchNameChange}
                            >
                                <option value="Select Branch" className="text-slate-400">Select Branch</option>
                                {branchList.map((branchList) => {
                                    return (
                                        <option key={branchList.id} value={branchList.name}>
                                            {branchList.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex justify-start font-semibold bg-blue-200 mx-5">
                            <button
                                className="flex justify-between block border w-[50px] px-2"
                                onClick={handleSortById}
                            >
                                ID
                                <MdKeyboardArrowDown className="my-auto" />
                            </button>
                            <button
                                className="flex justify-between block border w-[175px] px-2"
                                onClick={handleSortByName}
                            >
                                Name
                                <MdKeyboardArrowDown className="my-auto" />
                            </button>
                            <div className="block border w-[125px] px-2">
                                Phone
                            </div>
                            <div className="block border w-[175px] px-2">
                                Email
                            </div>
                            <button
                                className="flex justify-between block border w-[175px] px-2"
                                onClick={handleSortByBranchName}
                            >
                                Branch Name
                                <MdKeyboardArrowDown className="my-auto" />
                            </button>
                        </div>
                        {admin.map((admin) => (
                            <div key={admin.id}>
                                <div className="flex justify-start ml-5">
                                    <div className="block border w-[50px] text-center">
                                        {admin.id}
                                    </div>
                                    <div className="block border w-[175px] pl-2">
                                        {admin.name}
                                    </div>
                                    <div className="block border w-[125px] pl-2">
                                        {admin.phone}
                                    </div>
                                    <div className="block border w-[175px] pl-2">
                                        {admin.email}
                                    </div>
                                    <div className="block border w-[175px] pl-2">
                                        {admin.branch_id}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center my-5 font-semibold">
                            <button
                                className="mx-10"
                                onClick={handlePrevPage}
                                disabled={page <= 1}
                            >
                                <MdKeyboardArrowLeft size={25} />
                            </button>
                            <div className="mx-5">
                                {page}
                            </div>
                            <button
                                className="mx-10"
                                onClick={handleNextPage}
                                disabled={admin.length < limit}
                            >
                                <MdKeyboardArrowRight size={25} />
                            </button>
                        </div>
                    </div>
                    {/* Add Branch Admin */}
                    <div className="flex flex-col py-5">
                        <div className="flex text-xl font-semibold ml-5 mb-2">
                            Add Branch Admin
                        </div>
                        <div className="block border-white w-[400px] rounded-md px-5 shadow-md ml-5 my-2">
                            {/* Name */}
                            <div className="flex justify-start my-2">
                                <label htmlFor="name" className="mr-12 pt-1">
                                    Name
                                </label>
                                <input
                                    className="block border w-full h-[32px] pl-2"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="name or username"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            {/* Phone */}
                            <div className="flex justify-start mb-2">
                                <label htmlFor="phone" className="mr-[45px] pt-1">
                                    Phone
                                </label>
                                <input
                                    className="block border w-full h-[32px] pl-2"
                                    id="phone"
                                    name="name"
                                    type="text"
                                    placeholder="phone number"
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                />
                            </div>
                            {/* Email */}
                            <div className="flex justify-start mb-2">
                                <label htmlFor="email" className="mr-12 pt-1">
                                    Email
                                </label>
                                <input
                                    className="block border w-full h-[32px] ml-1 pl-2"
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="email@mail.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            {/* Password */}
                            <div className="flex justify-start mb-2">
                                <label htmlFor="password" className="mr-6 pt-1">
                                    Password
                                </label>
                                <input
                                    className="block border w-full h-[32px] pl-2"
                                    id="password"
                                    name="password"
                                    type={eyeOpen ? "text" : "password"}
                                    placeholder="▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️▪️"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                {eyeOpen ? (
                                    <AiOutlineEye
                                        className="my-auto mx-1"
                                        fontSize={25}
                                        color="gray"
                                        cursor="pointer"
                                        onClick={() => setEyeOpen(!eyeOpen)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="my-auto mx-1"
                                        fontSize={25}
                                        color="gray"
                                        cursor="pointer"
                                        onClick={() => setEyeOpen(!eyeOpen)}
                                    />
                                )}
                            </div>
                            {/* Branch */}
                            <div className="flex justify-start">
                                <label htmlFor="branch_id" className="mr-[38px] pt-1 mb-2">
                                    Branch
                                </label>
                                <select
                                    className="block border w-full h-[32px] focus:ring-black focus:border-black truncate ml-1 pl-1"
                                    value={branch_id}
                                    onChange={(e) => {
                                        setBranchId(e.target.value);
                                    }}
                                >
                                    <option>Select Branch</option>
                                    {branchList.map((value, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={value.id}
                                            >
                                                {value.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {/* Button Add */}
                            <div className="flex justify-center">
                                {!isModal ? (
                                    <button
                                        type="submit"
                                        className="rounded-md bg-blue-400 w-[165px] h-[32px]
                                    text-white font-[500]
                                    leading-6 shadow-md
                                    hover:opacity-50
                                    mt-4 mb-2"
                                        onClick={() => setIsModal(!isModal)}
                                    >
                                        Add Branch Admin
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        {isModal ? (
                            <div className="container flex justify-center mx-auto">
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                                    <div className="max-w-sm p-6 bg-white divide-y divide-gray-500 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl">Add Branch Admin</h3>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                cursor="pointer"
                                                onClick={() => setIsModal(!isModal)}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-4">
                                            <p className="mb-4 text-sm mt-4 text-center">
                                                Please check Branch Admin Data before continue,<br />
                                                Are you sure you want to continue ?
                                            </p>
                                            <div className="flex flex-row justify-center">
                                                <button
                                                    className="px-4 py-1 mx-2 text-white bg-red-400 rounded-md hover:opacity-50"
                                                    type="submit"
                                                    onClick={() => setIsModal(!isModal)}
                                                >
                                                    Discard
                                                </button>
                                                <button
                                                    className="px-4 py-1 mx-2 text-white bg-blue-400 rounded-md hover:opacity-50"
                                                    type="submit"
                                                    onClick={() => {
                                                        setIsModal(!isModal);
                                                        onSubmit();
                                                    }
                                                    }
                                                >
                                                    Confirm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div >
        </PageAdmin>
    );
};

export default ManageBranch;
