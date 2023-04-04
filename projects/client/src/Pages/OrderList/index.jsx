import React, { useEffect, useState, useRef } from "react";
import Page from "../../Components/Page";
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

const OrderList = () => {
  const [sortDateNewest, setSortDateNewest] = useState(true);
  const [sortInvAsc, setSortInvAsc] = useState(true);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [status, setStatus] = useState("");
  const [openDate, setOpenDate] = useState(false);

  const searchRef = useRef("");

  const [dateRange, setDateRange] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {}, [
    sortDateNewest,
    sortInvAsc,
    invoiceNo,
    status,
    dateRange,
  ]);
  return (
    <Page isFooter={false} navTitle="Order">
      <div className="flex flex-col px-5">
        {/* Search Inv */}
        <div className="relative">
          <IoSearchOutline
            size={20}
            className="absolute top-[6px] left-2 text-slate-400"
          />
          <RxCross2
            size={20}
            className="absolute top-[6px] right-2 text-slate-400 cursor-pointer"
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
        {/* Select Status & Sorting */}
        <div className="flex flex-row mt-2 justify-between">
          <select
            className="w-[33%] border rounded-lg px-1 h-8 text-gray-900  focus:ring-[#6CC51D] focus:border-[#6CC51D] truncate"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Semua Status</option>
            <option value="menunggu-pembayaran">Menunggu Pembayaran</option>
            <option value="menunggu-konfirmasi">
              Menunggu Konfirmasi Pembayaran
            </option>
            <option value="diproses">Diproses</option>
            <option value="dikirim">Dikirim</option>
            <option value="pesanan-dikonfirmasi">Pesanan Dikonfirmasi</option>
            <option value="dibatalkan">Dibatalkan</option>
          </select>
          <div
            className={
              sortDateNewest
                ? "flex flex-row items-center ml-1 cursor-pointer border rounded-full font-bold px-2 bg-gradient-to-tl from-lime-300 "
                : "flex flex-row items-center ml-1 cursor-pointer border rounded-full font-bold px-2 bg-gradient-to-br from-lime-300 "
            }
            onClick={() => setSortDateNewest(!sortDateNewest)}
          >
            {sortDateNewest ? (
              <>
                <TbSortAscending2 size={20} />
                <span className="text-sm ml-1 ">Newest to Oldest</span>
              </>
            ) : (
              <>
                <TbSortDescending2 size={20} />
                <span className="text-sm ml-1 ">Oldest to Newest</span>
              </>
            )}
          </div>
          <div
            className={
              sortInvAsc
                ? "flex flex-row items-center ml-1 cursor-pointer border rounded-full font-bold px-2 bg-gradient-to-tl from-lime-300 "
                : "flex flex-row items-center ml-1 cursor-pointer border rounded-full font-bold px-2 bg-gradient-to-br from-lime-300 "
            }
            onClick={() => setSortInvAsc(!sortInvAsc)}
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
        {/* Date Range */}
        <div className="flex flex-col">
          <div
            className="border rounded-lg mt-2 px-2 w-[100%] h-8 flex items-center justify-center cursor-pointer"
            onClick={() => setOpenDate(!openDate)}
          >
            <span className="relative">
              {openDate ? (
                <RiArrowDropUpLine size={28} className="absolute -right-10 " />
              ) : (
                <RiArrowDropDownLine
                  size={28}
                  className="absolute -right-10 "
                />
              )}
              <span className="font-bold mr-2">From</span>
              {format(dateRange[0].startDate, " d MMM yyyy ")}
              <span className="font-bold ml-2 mr-2">To</span>
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
      <div className="h-[6px] bg-slate-200 w-[100%] mt-4 mb-2 "></div>
      {/* Result */}
      <div className="flex flex-col px-5">
        <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-2 mb-8 mt-2 ">
          <div className="flex flex-row items-center justify-between px-3">
            <div className="flex flex-row items-center">
              <BiReceipt size={30} />
              <div className="flex flex-col ml-2 ">
                <span className="text-xs font-bold text-slate-400">
                  INV.20230404/XM/000000001
                </span>
                <span className="text-sm font-bold">4 April 2023</span>
              </div>
            </div>
            <div className="text-xs bg-lime-300 bg-opacity-40 text-[#6CC51D] p-1 rounded-lg font-semibold ">
              Menunggu Pembayaran
            </div>
          </div>
          <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
          <div className="flex flex-row px-3 items-center">
            <img
              src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
              alt=""
              className=" w-12 h-12 mt-2 border text-xs"
            />
            <div className="flex flex-col ml-2 mt-1 truncate">
              <div className="text-sm font-bold w-[100%] truncate">
                RELX PIXEL DISPOSABLE - watermelon ice
              </div>
              <span className="text-slate-400 text-xs font-semibold">
                1 item
              </span>
            </div>
          </div>
          <div className="px-3 text-slate-400 text-xs font-semibold mt-1">
            + 2 produk lainnya
          </div>
          <div className="px-3 mt-1 text-center">
            <span className="font-bold">Total Purchase : </span>
            <span className="font-bold text-[#6CC51D]">Rp 180.000</span>
          </div>
        </div>
        <div className="self-center absolute bottom-5 flex flex-row items-center">
          <MdKeyboardDoubleArrowLeft
            size={25}
            className="mr-1 cursor-pointer"
          />
          <MdKeyboardArrowLeft size={25} className="mr-3 cursor-pointer" />
          <span className="mb-[1px]">Page 1 of 3</span>
          <MdKeyboardArrowRight size={25} className="ml-3 cursor-pointer" />
          <MdKeyboardDoubleArrowRight
            size={25}
            className="ml-1 cursor-pointer"
          />
        </div>
      </div>
    </Page>
  );
};

export default OrderList;
