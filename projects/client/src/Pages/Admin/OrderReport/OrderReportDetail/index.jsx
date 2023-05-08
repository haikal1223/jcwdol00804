import { useEffect, useState } from "react";
import axios from "axios";
import PageAdmin from "../../../../Components/PageAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../../helper";
import { format } from "date-fns";
import { FcShop } from "react-icons/fc";
import img from "../../../../Assets/default.png";

const OrderReportDetail = () => {
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    console.log(orderDetail);
    const [productInfo, setProductInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const navigate = useNavigate();

    const getTotalPrice = (arr) => {
        return arr.map((val) => val.price * val.quantity).reduce((p, c) => p + c);
    };

    const handleModalOpen = (imageUrl) => {
        setShowModal(true);
        setModalImage(imageUrl);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setModalImage(null);
    };

    useEffect(() => {
        let promise1 = axios.get(`${API_URL}/transaction/order-list-super-admin/${id}`);
        let promise2 = axios.get(`${API_URL}/transaction/get-product-info/${id}`);

        Promise.all([promise1, promise2])
            .then((res) => {
                setOrderDetail(res[0].data[0]);
                setProductInfo(res[1].data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <PageAdmin>
            <div className="container">
                <div className="text-2xl font-bold">Order Report</div>
                <div className="flex flex-col py-5 ml-5">
                    <div className="flex text-xl font-semibold mb-2">
                        Order Detail
                    </div>
                    <div className="flex">
                        <div className="content container left mr-5">
                            {/* Status */}
                            <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-2">
                                <div className="font-bold px-5 text-lg">
                                    {orderDetail.invoice_no && orderDetail.invoice_no}
                                </div>
                                <div className="h-[1px] bg-slate-200 w-[95%] mt-2 ml-3"></div>
                                <div className="text-sm font-bold text-slate-400 px-5 mt-2">
                                    Username : {orderDetail.user_name && orderDetail.user_name}
                                </div>
                                <div className="text-sm font-bold text-slate-400 px-5 mt-1">
                                    Status : {orderDetail.status && orderDetail.status}
                                </div>
                                <div className="text-sm font-bold text-slate-400 px-5 mt-1">
                                    Purchased Date :{" "}
                                    {orderDetail.created_at &&
                                        format(
                                            new Date(orderDetail.created_at),
                                            "d MMM yyyy, HH:mm (O)"
                                        )}
                                </div>
                            </div>
                            {/* Shopping Summary */}
                            <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-2">
                                <div className="flex flex-col">
                                    <div className="px-5 font-bold">
                                        {orderDetail.status &&
                                            orderDetail.status === "Menunggu Pembayaran"
                                            ? "Shopping Summary"
                                            : "Payment Detail"}
                                    </div>
                                    <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
                                    <div className="flex flex-row justify-between px-5 mt-2">
                                        <span>Total Price</span>
                                        <span>
                                            Rp{" "}
                                            {productInfo.length &&
                                                getTotalPrice(productInfo).toLocaleString("id")}
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between px-5 mt-2">
                                        <span>Total Delivery Cost</span>
                                        <span>
                                            Rp{" "}
                                            {orderDetail.shipping_cost &&
                                                orderDetail.shipping_cost.toLocaleString("id")}
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between px-5 mt-2">
                                        <span>Discount Delivery Cost</span>
                                        <span>-Rp 0</span>
                                    </div>
                                    <div className="flex flex-row justify-between px-5 mt-2">
                                        <span>Voucher Applied</span>
                                        <span>-Rp 0</span>
                                    </div>
                                    <div className="h-[1px] bg-slate-200 w-[95%] mt-2 ml-3"></div>
                                </div>
                                <div className="flex flex-row justify-between px-5 mt-2">
                                    <span className="font-bold">
                                        {" "}
                                        {orderDetail.status &&
                                            orderDetail.status === "Menunggu Pembayaran"
                                            ? "Total Shopping"
                                            : "Total Payment"}
                                    </span>
                                    <span className="font-bold">
                                        Rp{" "}
                                        {productInfo.length &&
                                            orderDetail.shipping_cost &&
                                            (getTotalPrice(productInfo) + orderDetail.shipping_cost)
                                                .toLocaleString("id")}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="content container mid mr-5">
                            {/* Product Detail & Delivery Info */}
                            <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-2">
                                <div className="flex flex-row justify-between items-center ">
                                    <div className="font-bold px-5">Product Details</div>
                                    <span className="px-5 font-bold text-slate-400">
                                        <FcShop className="mb-1 mr-1 inline" />
                                        {productInfo.length && productInfo[0].branch_name}
                                    </span>
                                </div>
                                <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
                                {productInfo.length &&
                                    productInfo.map((val, idx) => {
                                        return (
                                            <div className="flex flex-row items-center justify-between px-5">
                                                <div
                                                    key={val.id}
                                                    className="flex flex-row items-center mt-1 "
                                                >
                                                    <img
                                                        src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                                                        alt={val.name}
                                                        className=" w-12 h-12 mt-2 border text-xs"
                                                    />
                                                    <div className="flex flex-col ml-2">
                                                        <span className="font-bold text-sm w-[210px] mt-3">
                                                            {val.name}
                                                        </span>
                                                        <span className="text-[#6CC51D] font-bold text-sm">
                                                            {val.quantity} x Rp {val.price.toLocaleString("id")}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="font-bold text-[#6CC51D]">
                                                    Rp {(val.quantity * val.price).toLocaleString("id")}
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div className="h-[6px] bg-slate-200 w-[100%] mt-3 mb-2 "></div>
                                <div className="flex flex-col">
                                    <div className="font-bold px-5">Delivery Info</div>
                                    <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
                                    <div className="flex flex-row justify-between px-5 mt-1">
                                        <span>Courier</span>
                                        <span className="w-[70%]">
                                            {orderDetail.courier && orderDetail.courier}
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between px-5 mt-1">
                                        <span>Address</span>
                                        <div className="w-[70%]">
                                            <div>
                                                {orderDetail.address && orderDetail.address}
                                            </div>
                                            <div>
                                                {orderDetail.city && orderDetail.city},{" "}
                                                {orderDetail.province && orderDetail.province}
                                            </div>
                                            <div>{orderDetail.zipcode && orderDetail.zipcode}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content container right">
                            {/* Payment Image */}
                            <div className="container rounded-xl shadow-md border h-min-[200px] w-[440px] py-3 mb-2">
                                <div className="flex flex-col">
                                    <div className="px-5 font-bold">
                                        Payment Receipt
                                    </div>
                                    <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
                                    {orderDetail.payment_img == null ? (
                                        <div className="text-sm font-bold text-slate-400 px-5 mt-3">
                                            Status : Not upload yet
                                        </div>
                                    ) : (
                                        <div className="text-sm font-bold text-slate-400 px-5 mt-3">
                                            Status : Uploaded
                                        </div>
                                    )}
                                    <div className="h-[1px] bg-slate-200 w-[95%] mt-1 ml-3"></div>
                                    {orderDetail.payment_img == null ? (
                                        <div className="flex justify-center pt-2">
                                            <img
                                                src={img}
                                                alt="default"
                                                className="w-[300px] h-[300px]"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex justify-center pt-2">
                                            <img
                                                src={orderDetail.payment_img && `http://localhost:8000/${orderDetail.payment_img}`}
                                                alt="payment_img"
                                                className="w-[300px] h-[300px]"
                                                onClick={() =>
                                                    handleModalOpen(
                                                        orderDetail.payment_img &&
                                                        `http://localhost:8000/${orderDetail.payment_img}`
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Button */}
                <div className="flex justify-center mt-10">
                    <button
                        type="submit"
                        className="rounded-md bg-[#82CD47] w-[150px] h-[32px]
                                    text-white text-xl font-[500]
                                    leading-6 shadow-md
                                    hover:opacity-50 mx-2"
                        onClick={() => navigate("/admin/order-report")}
                    >
                        Back
                    </button>
                </div>
                {/* Image modal */}
                {showModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
                        onClick={handleModalClose}
                    >
                        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
                        <div className="w-auto my-6 mx-auto max-w-2xl relative z-10">
                            <img
                                src={modalImage}
                                alt="payment_img"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </PageAdmin>
    )
}

export default OrderReportDetail;