import React, { useEffect, useState, useRef } from "react";
import PageAdmin from "../../../Components/PageAdmin";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BiReceipt } from "react-icons/bi";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { subDays } from "date-fns";
import {
    TbSortAscending2,
    TbSortDescending2,
    TbSortAscendingNumbers,
    TbSortDescendingNumbers,
} from "react-icons/tb";
import {
    MdKeyboardArrowLeft,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { format } from "date-fns";
import axios from "axios";
import { API_URL } from "../../../helper";
import { useNavigate } from "react-router-dom";

const OrderReport = () => {
    const navigate = useNavigate();
    const [sortDateNewest, setSortDateNewest] = useState(true);
    const [sortInvAsc, setSortInvAsc] = useState(true);
    const [sortBy, setSortBy] = useState("created_at");
    const [invoiceNo, setInvoiceNo] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [branchValue, setBranchValue] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(0);
    const [countResult, setCountResult] = useState(0);
    const [openDate, setOpenDate] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const token = localStorage.getItem("xmart_login");
    const searchRef = useRef("");
    const nameRef = useRef("");

    const [dateRange, setDateRange] = useState([
        {
            startDate: subDays(new Date(), 31),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    useEffect(() => {
        axios.get(`${API_URL}/product/get-branch-list`).then((res) => {
            setBranchList(res.data);
        });
    }, []);

    const handleBranchNameChange = (e) => {
        const selected = e.target.value;
        if (selected === "Select Branch Name") {
            setBranchValue("");
        } else {
            setBranchValue(selected);
        }
    };

    useEffect(() => {
        axios
            .get(
                `${API_URL}/transaction/order-list-super-admin?inv=${invoiceNo}&user_name=${nameValue}&branch_name=${branchValue}&status=${status}&start_date=${format(
                    dateRange[0].startDate,
                    "yyyy-MM-dd"
                )}&end_date=${format(
                    dateRange[0].endDate,
                    "yyyy-MM-dd"
                )}&sort_by=${sortBy}&order=${sortBy === "invoice_no" ? sortInvAsc : sortDateNewest
                }&page=${page}`
            )
            .then((res) => {
                setOrderList(res.data.result);
                setLimit(res.data.limit);
                setCountResult(res.data.allResult.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [
        sortDateNewest,
        sortInvAsc,
        invoiceNo,
        nameValue,
        branchValue,
        status,
        dateRange,
        token,
        sortBy,
        page,
    ]);

    return (
        <PageAdmin>
            <div className="container">
                <div className="text-2xl font-bold">Order Report</div>
                <div className="flex flex-col py-5">
                    <div className="flex text-xl font-semibold ml-5 mb-2">
                        Order List
                    </div>
                    {/* Filter */}
                    <div className="flex flex-col ml-5 w-[720px] text-sm">
                        <div className="flex justify-between">
                            {/* Search Inv */}
                            <div className="relative w-[350px]">
                                <IoSearchOutline
                                    size={15}
                                    className="absolute top-[10px] left-2 text-slate-400"
                                />
                                <RxCross2
                                    size={15}
                                    className="absolute top-[10px] right-2 text-slate-400 cursor-pointer"
                                    onClick={() => {
                                        searchRef.current.value = "";
                                        setInvoiceNo("");
                                    }}
                                />
                                <input
                                    type="text"
                                    ref={searchRef}
                                    className="border w-full h-8 rounded-lg px-8 "
                                    placeholder="Order / Invoice No."
                                    onChange={(e) => setInvoiceNo(e.target.value)}
                                />
                            </div>
                            {/* Search Name */}
                            <div className="relative w-[350px]">
                                <IoSearchOutline
                                    size={20}
                                    className="absolute top-[6px] left-2 text-slate-400"
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
                        </div>
                        {/* Select Status & Sorting */}
                        <div className="flex flex-row mt-2 justify-between">
                            {/* Status filter */}
                            <select
                                className="w-[200px] border rounded-lg px-1 h-8 text-gray-900  focus:ring-[#6CC51D] focus:border-[#6CC51D] truncate"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">Semua Status</option>
                                <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                                <option value="Menunggu Konfirmasi Pembayaran">
                                    Menunggu Konfirmasi Pembayaran
                                </option>
                                <option value="Diproses">Diproses</option>
                                <option value="Dikirim">Dikirim</option>
                                <option value="Pesanan Dikonfirmasi">Pesanan Dikonfirmasi</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                            </select>
                            {/* Branch filter */}
                            <select
                                className="w-[200px] border rounded-lg px-1 h-8 text-gray-900  focus:ring-[#6CC51D] focus:border-[#6CC51D] truncate"
                                value={branchValue}
                                onChange={handleBranchNameChange}
                            >
                                <option value="Select Branch Name">Select Branch Name</option>
                                {branchList.map((branchList) => {
                                    return (
                                        <option key={branchList.id} value={branchList.name}>
                                            {branchList.name}
                                        </option>
                                    );
                                })}
                            </select>
                            {/* ASC/DESC sort */}
                            <div className="flex flex-row">
                                <div
                                    className={
                                        sortBy === "created_at"
                                            ? "flex flex-row items-center ml-1 cursor-pointer border-2 rounded-full font-bold px-2 bg-gradient-to-tl from-lime-300 shadow-emerald-400/70 shadow-md border-emerald-400/60"
                                            : "flex flex-row items-center ml-1 cursor-pointer border rounded-full font-bold px-2 bg-gradient-to-tl from-lime-300"
                                    }
                                    onClick={() => {
                                        setSortBy("created_at");
                                        setSortDateNewest(!sortDateNewest);
                                    }}
                                >
                                    {sortDateNewest ? (
                                        <>
                                            <TbSortAscending2 size={20} />
                                            <span className="text-sm mx-1 ">Newest to Oldest</span>
                                        </>
                                    ) : (
                                        <>
                                            <TbSortDescending2 size={20} />
                                            <span className="text-sm mx-1 ">Oldest to Newest</span>
                                        </>
                                    )}
                                </div>
                                <div
                                    className={
                                        sortBy === "invoice_no"
                                            ? "flex flex-row items-center ml-1 cursor-pointer border-2 rounded-full font-bold px-2 bg-gradient-to-tl from-lime-300 shadow-emerald-400/70 shadow-md border-emerald-400/60"
                                            : "flex flex-row items-center ml-1 cursor-pointer border rounded-full font-bold px-2 bg-gradient-to-tl from-lime-300 "
                                    }
                                    onClick={() => {
                                        setSortBy("invoice_no");
                                        setSortInvAsc(!sortInvAsc);
                                    }}
                                >
                                    {sortInvAsc ? (
                                        <>
                                            <TbSortAscendingNumbers size={20} />
                                            <span className="text-sm ml-1 ">Invoice Asc</span>
                                        </>
                                    ) : (
                                        <>
                                            <TbSortDescendingNumbers size={20} />
                                            <span className="text-sm ml-1 ">Invoice Desc</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Date Range */}
                        <div className="flex flex-col">
                            <div
                                className="border rounded-lg mt-2 px-2 w-[100%] h-8 flex items-center justify-center cursor-pointer"
                                onClick={() => setOpenDate(!openDate)}
                            >
                                <span className="relative">
                                    {openDate ? (
                                        <RiArrowDropUpLine size={28} className="absolute -right-10 -bottom-1" />
                                    ) : (
                                        <RiArrowDropDownLine
                                            size={28}
                                            className="absolute -right-10 -bottom-1"
                                        />
                                    )}
                                    <span className="font-bold">From</span>
                                    {format(dateRange[0].startDate, " d MMM yyyy ")}
                                    <span className="font-bold">To</span>
                                    {format(dateRange[0].endDate, " d MMM yyyy")}
                                </span>
                            </div>
                            <div className="relative flex justify-center">
                                {openDate && (
                                    <DateRange
                                        onChange={(item) => setDateRange([item.selection])}
                                        editableDateInputs={true}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        months={2}
                                        direction="horizontal"
                                        className="absolute w-[100%] border shadow-md"
                                        maxDate={new Date()}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="h-[6px] bg-slate-200 w-[720px] mt-4 mb-2 ml-5"></div>
                    {/* Result */}
                    <div className="flex flex-col px-5">
                        {orderList.map((val, idx) => {
                            return (
                                <div
                                    key={idx}
                                    onClick={() => navigate(`/admin/order-report/${val.id}`)}
                                    className="container rounded-xl shadow-md border h-min-[200px] w-full py-2 mx-2 mb-[5px]"
                                >
                                    <div className="flex flex-row items-center justify-between px-3">
                                        <div className="flex flex-row items-center">
                                            <BiReceipt size={30} />
                                            <div className="flex flex-col ml-2 ">
                                                <span className="text-xs font-bold text-slate-400">
                                                    {val.invoice_no}
                                                </span>
                                                <span className="text-sm font-bold text-[#6cc51d]">
                                                    {format(new Date(val.created_at), "d MMM yyyy")}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                ["Menunggu Pembayaran", "Dibatalkan"].includes(val.status)
                                                    ? "text-xs bg-red-300 bg-opacity-40 text-red-500 p-1 rounded-lg font-semibold"
                                                    : "text-xs bg-lime-300 bg-opacity-40 text-[#6CC51D] p-1 rounded-lg font-semibold"
                                            }
                                        >
                                            {val.status}
                                        </div>
                                    </div>
                                    <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-bold px-3 pt-2">
                                                Username&ensp;:&ensp;{val.user_name}
                                            </div>
                                            <div className="text-sm font-bold px-3 pt-2">
                                                Branch&emsp;&emsp;:&ensp;{val.branch_name}
                                            </div>
                                        </div>
                                        <div className="flex justify-right">
                                            <div className="flex flex-row px-3 items-center">
                                                <img
                                                    src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                                                    alt=""
                                                    className=" w-12 h-12 mt-2 border text-xs"
                                                />
                                                <div className="flex flex-col ml-2 mt-1 truncate">
                                                    <div className="text-sm font-bold w-[100%] truncate">
                                                        {val.name}
                                                    </div>
                                                    <span className="text-slate-400 text-xs font-semibold">
                                                        {val.quantity} {val.quantity > 1 ? "items" : "item"}
                                                    </span>
                                                </div>
                                            </div>
                                            {val.total_items === 0 ? null : (
                                                <div className="px-3 text-slate-400 text-xs font-semibold mt-1">
                                                    +{val.total_items - 1} produk lainnya
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-3 mt-1 text-sm text-center">
                                        <span className="font-bold">Total Purchase : </span>
                                        <span className="font-bold text-[#6CC51D]">
                                            Rp {val.total_purchased.toLocaleString("id")}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="self-center mt-8 mb-10 flex flex-row items-center">
                            <MdKeyboardDoubleArrowLeft
                                size={25}
                                className="mr-1 cursor-pointer"
                                onClick={() => setPage(1)}
                            />
                            <MdKeyboardArrowLeft
                                size={25}
                                className="mr-3 cursor-pointer"
                                onClick={() => page > 1 && setPage(page - 1)}
                            />
                            <span className="mb-[1px]">
                                Page {page} of {countResult && Math.ceil(countResult / limit)}
                            </span>
                            <MdKeyboardArrowRight
                                size={25}
                                className="ml-3 cursor-pointer"
                                onClick={() =>
                                    page < Math.ceil(countResult / limit) && setPage(page + 1)
                                }
                            />
                            <MdKeyboardDoubleArrowRight
                                size={25}
                                className="ml-1 cursor-pointer"
                                onClick={() => setPage(Math.ceil(countResult / limit))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageAdmin>
    );
};

export default OrderReport;