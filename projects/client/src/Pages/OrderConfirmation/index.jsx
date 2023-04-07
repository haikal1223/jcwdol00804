import React from "react";
import Page from "../../Components/Page";
import BackButton from "../../Components/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { FcShop } from "react-icons/fc";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Page isFooter={false} isNavbar={false}>
      <div className="relative">
        <BackButton />
        <div className="text-center text-xl py-5 font-bold z-10 relative">
          Order Confirmation
        </div>
      </div>
      <div className="flex flex-col justify-center items-start">
        <div className="flex flex-col px-5 mt-2">
          {/* Card */}
          {/* Order Details and Delivery Details */}
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-8">
            <div className="flex flex-row justify-between items-center ">
              <div className="font-bold px-5">Order Details</div>
              <span className="px-5 font-bold text-slate-400">
                <FcShop className="mb-1 mr-1 inline" />
                {location.state.shopName}
              </span>
            </div>
            <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
            {location.state.items.map((val2, idx2) => {
              return (
                <div
                  className="flex flex-row items-center justify-between px-5"
                  key={idx2}
                >
                  <div className="flex flex-row items-center mt-1 ">
                    <img
                      src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                      alt={val2.name}
                      className=" w-12 h-12 mt-2 border text-xs"
                    />
                    <div className="flex flex-col ml-2">
                      <span className="font-bold text-sm w-[210px]">
                        {val2.name}
                      </span>
                      <span className="text-[#6CC51D] font-bold text-sm">
                        {val2.quantity} x Rp {val2.price.toLocaleString("id")}
                      </span>
                    </div>
                  </div>
                  <div className="font-bold text-[#6CC51D]">
                    Rp {(val2.price * val2.quantity).toLocaleString("id")}
                  </div>
                </div>
              );
            })}
            <div className="h-[6px] bg-slate-200 w-[100%] mt-3 mb-2 "></div>
            <div className="flex flex-col">
              <div className="font-bold px-5">Delivery Details</div>
              <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
              <div className="flex flex-row justify-between items-center px-5 mt-3">
                <span className="text-[#6CC51D] font-bold">Address</span>
                <div className="w-[50%] border rounded-full bg-slate-100 border-[#6CC51D]  text-center cursor-pointer">
                  Select address
                </div>
              </div>
              <div className="px-5 max-h-[80px] mt-2 address">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore unde perspiciatis tempore amet, sunt culpa reiciendis
                tempora aliquid assumenda maxime Lorem, ipsum.
              </div>
              <div className="flex flex-row justify-between items-center px-5 mt-4 mb-2">
                <span className="text-[#6CC51D] font-bold">Courier</span>
                <div className="w-[50%] border rounded-full bg-slate-100 border-[#6CC51D] text-center cursor-pointer">
                  Select available courier
                </div>
              </div>
            </div>
          </div>
          {/* Voucher */}
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-8 ">
            <div className="flex flex-row justify-between items-center px-5">
              <span className="font-bold">Voucher</span>
              <div className="w-[50%] border rounded-full bg-slate-100 border-[#6CC51D]  text-center cursor-pointer">
                Select voucher
              </div>
            </div>
          </div>
          {/* Shopping Summary */}
          <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-2 ">
            <div className="flex flex-col">
              <div className="px-5 font-bold">Shopping Summary</div>
              <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
              <div className="flex flex-row justify-between px-5 mt-2">
                <span>
                  Total Price{" "}
                  {`(${location.state.items.length} ${
                    location.state.items.length > 1 ? "items" : "item"
                  })`}
                </span>
                <span>Rp {location.state.totalPrice.toLocaleString("id")}</span>
              </div>
              <div className="flex flex-row justify-between px-5 mt-2">
                <span>Total Delivery Cost</span>
                <span>Rp 40.000</span>
              </div>
              <div className="flex flex-row justify-between px-5 mt-2">
                <span>Discount Delivery Cost</span>
                <span>-Rp 40.000</span>
              </div>
              <div className="flex flex-row justify-between px-5 mt-2">
                <span>Voucher Applied</span>
                <span>-Rp 20.000</span>
              </div>
              <div className="h-[1px] bg-slate-200 w-[95%] mt-2 ml-3"></div>
            </div>
            <div className="flex flex-row justify-between px-5 mt-2">
              <span className="font-bold">Total Shopping</span>
              <span className="font-bold">
                Rp{" "}
                {location.state.totalPrice - 20000 <= 0
                  ? "0"
                  : (location.state.totalPrice - 20000).toLocaleString("id")}
              </span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={() => navigate("/payment")}
          className="bg-[#82cd47] h-[38px] w-8/12 rounded-full px-3 mt-10 mb-16 self-center text-[22px] font-[600] shadow-md text-white"
        >
          Proceed To Payment
        </button>
      </div>
    </Page>
  );
};

export default OrderConfirmation;
