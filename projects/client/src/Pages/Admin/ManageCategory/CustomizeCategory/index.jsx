import { useEffect, useState } from "react";
import axios from "axios";
import PageAdmin from "../../../../Components/PageAdmin";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../../../helper";
import img from "../../../../Assets/default.png";

const CustomizeCategory = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [detail, setDetail] = useState([]);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const getDetail = async () => {
        try {
            const result = await axios.get(`${API_URL}/category/category-detail/${id}`);
            setDetail(result.data[0]);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        getDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("images", image);
            const result = await axios.patch(
                `${API_URL}/category/upload-category/${id}`,
                formData
            )
            alert(result.data.message)
            getDetail();
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const handleEdit = async () => {
        try {
            const result = await axios.patch(
                `${API_URL}/category/edit-category/${id}`,
                { name }
            );
            alert(result.data.message)
            getDetail();
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <PageAdmin>
            <div className="container">
                <div className="text-2xl font-bold">Manage Category</div>
                <div className="container-content">
                    <div className="flex flex-col py-5 ml-5">
                        <div className="flex text-xl font-semibold mb-5">
                            Edit Category
                        </div>
                        <div className="flex justify-center">
                            {detail.category_img == null ? (
                                <img
                                    src={img}
                                    className="w-[200px] h-[200px]"
                                    alt="default_img" />
                            ) : (
                                <img
                                    src={detail.category_img && `http://localhost:8000/${detail.category_img}`}
                                    className="w-[200px] h-[200px]"
                                    alt="category_img"
                                />
                            )}
                        </div>
                        <div className="flex justify-center text-xl font-bold my-2">
                            {detail.name}
                        </div>
                        <div className="block border-white rounded-md px-5 shadow-md">
                            <div className="flex justify-start my-2">
                                <label htmlFor="images" className="mr-12 pt-1">
                                    Image
                                </label>
                                <input
                                    className="block border w-[220px] h-[32px] pl-2"
                                    id="images"
                                    name="images"
                                    type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-400 w-[100px] h-[32px]
                                    text-white font-[500]
                                    leading-6 shadow-md
                                    hover:opacity-50
                                    ml-6"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                        <div className="block border-white rounded-md px-5 shadow-md">
                            <div className="flex justify-start mb-2 pt-2">
                                <label htmlFor="name" className="mr-12 pt-1">
                                    Name
                                </label>
                                <input
                                    className="block border w-[220px] h-[32px] pl-2"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder={detail.name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-400 w-[100px] h-[32px]
                                    text-white font-[500]
                                    leading-6 shadow-md
                                    hover:opacity-50
                                    ml-6"
                                    onClick={handleEdit}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center my-10">
                            <button
                                type="submit"
                                className="rounded-md bg-[#82CD47] w-[150px] h-[32px]
                                    text-white text-xl font-[500]
                                    leading-6 shadow-md
                                    hover:opacity-50"
                                onClick={() => navigate("/manage-category")}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageAdmin>
    )
}

export default CustomizeCategory;