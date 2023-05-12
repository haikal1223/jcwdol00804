import Page from "../../Components/Page";
import BannerSection from "./Sections/BannerSection";
import CategorySection from "./Sections/CategorySection";
import FeaturedSection from "./Sections/FeaturedSection";
import { FcShop } from "react-icons/fc";
import { RiUserLocationFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { changeStoreAction, setDefaultStore } from "../../Actions/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helper";
import { Toaster, toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const [branchList, setBranchList] = useState([]);
  const [yourLocation, setYourLocation] = useState("");

  const { branchName } = useSelector((state) => {
    return {
      branchName: state.storeReducer.defaultStore,
    };
  });

  useEffect(() => {
    dispatch(setDefaultStore());
    axios.get(`${API_URL}/product/get-branch-list`).then((res) => {
      setBranchList(res.data);
    });
    // eslint-disable-next-line
  }, []);

  const closestStore = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
    };

    const success = (pos) => {
      let crd = pos.coords;
      // axios
      //   .get(
      //     `https://api.opencagedata.com/geocode/v1/json?q=${crd.latitude}+${crd.longitude}&key=49442a5440874bcb9ad684742dcf1ecb`
      //   )
      //   .then((res) => {
      //     setYourLocation(res.data.results[0].components.city_district);
      //   })
      //   .catch((err) => console.log(err));
      axios
        .get(
          `${API_URL}/product/get-closest-store?lat=${crd.latitude}&lng=${crd.longitude}`
        )
        .then((res) => {
          dispatch(changeStoreAction({ defaultStore: res.data }));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setDefaultStore());
        });
    };
    const errors = (err) => {
      console.warn(`ERROR(${err.code}) : ${err.message}`);
      toast.error(
        "You have blocked your current location. Please activate it from the browser permission setting"
      );
    };
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          toast.error(
            "You have blocked your current location. Please activate it from the browser permission setting"
          );
          dispatch(setDefaultStore());
        }
      });
    }
  };

  return (
    <Page navTitle="Home">
      <Toaster />
      <div className="container">
        <div className="px-5 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <FcShop size={20} className="inline" />
            <select
              className="bg-[#6CC51D] font-semibold text-white rounded-full px-3 ml-1"
              value={branchName}
              onChange={(e) =>
                dispatch(changeStoreAction({ defaultStore: e.target.value }))
              }
            >
              {branchList.map((val, idx) => {
                return (
                  <option key={idx} value={val.name}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>
          {yourLocation ? (
            <div className="flex flex-row items-center text-[#6CC51D] bg-[#6CC51D]/20 rounded-full px-2 py-1">
              <RiUserLocationFill className="mr-1" size={20} />
              <span className="font-bold text-xs ">{yourLocation}</span>
            </div>
          ) : (
            <div
              className="flex flex-row items-center text-[#6CC51D] bg-[#6CC51D]/20 rounded-full px-2 py-1 cursor-pointer"
              onClick={closestStore}
            >
              <RiUserLocationFill className="mr-1" size={20} />
              <span className="font-bold text-xs ">Get nearest store</span>
            </div>
          )}
        </div>
        {/* Greeting */}
        <div className="flex flex-col text-normal text-center font-normal px-5 py-3">
          <div>Welcome to our page !</div>
        </div>
        {/* Banner */}
        <BannerSection />
        {/* Categories */}
        <CategorySection branchName={branchName} />
        {/* Featured */}
        <FeaturedSection branchName={branchName} />
      </div>
    </Page>
  );
};

export default Home;
