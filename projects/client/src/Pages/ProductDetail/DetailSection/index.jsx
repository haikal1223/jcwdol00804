import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../helper";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
import img from "../../../Assets/Items/item1.png"

const DetailSection = () => {
    const { id } = useParams();

    // Fetching Data from API
    const [detail, setDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);

    // Get Data from API
    const getDetail = async () => {
        try {
            const result = await axios.get(`${API_URL}/product/${id}`);
            setDetail(result.data.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    
    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPlus = () => {
        if (quantity < detail?.stock) {
            setQuantity(quantity + 1)
        }
    }

    const onMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className="flex flex-col justify-center mx-16">
            {/* Image */}
            <div>
                <img className="" src={img} alt="img" />
            </div>
            {/* Name & Add Items */}
            <div className="flex justify-between">
                <div className="text-3xl font-bold text-gray-900">
                    {detail.name}
                </div>
                <div className="flex items-center">
                    <button
                        onClick={onMinus}>
                        <AiFillMinusCircle size={25} color="#82CD47" />
                    </button>
                    <div className="font-semibold text-xl mx-5">
                        {quantity}
                    </div>
                    <button
                        onClick={onPlus}>
                        <AiFillPlusCircle size={25} color="#82CD47" />
                    </button>
                </div>
            </div>
            {/* Category */}
            <div className="text-base font-semibold my-2">
                {detail.category_id}
            </div>
            {/* Price */}
            <div className="flex my-2">
                <div className="flex">
                    <div className="text-2xl text-[#86C649] font-semibold">
                        Rp. {detail.price},-
                    </div>
                </div>
            </div>
            {/* Description */}
            <div className="font-semibold my-2">
                Descriptions
            </div>
            <div className="text-gray-400 text-justify">
                {detail.description}
            </div>
            {/* Button */}
            <div className="flex justify-between my-10">
                <button
                    className="flex justify-around items-center 
                    rounded-md bg-white w-44 h-8 
                    text-[#86C649] text-[22px] font-[600] shadow-md px-2
                    hover:bg-[#82CD47] hover:text-white">
                    <BiCartAlt size={25} />
                    Add to Cart
                </button>
                <button
                    className="rounded-md bg-[#82CD47] w-36 h-8 
                    text-white text-[22px] font-[600] shadow-md px-2
                    hover:bg-white hover:text-[#86C649]">
                    Buy Now
                </button>
            </div>
        </div>
    )
}

export default DetailSection;