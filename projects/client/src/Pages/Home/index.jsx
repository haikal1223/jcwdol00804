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
import { loginAction } from "../../Actions/user";
import { getCartList } from "../../Actions/cart";

const Home = () => {
  const dispatch = useDispatch();
  const [branchList, setBranchList] = useState([]);

  const { userLocation, branchName } = useSelector((state) => {
    return {
      userLocation: state.storeReducer.userLocation,
      branchName: state.storeReducer.defaultStore,
    };
  });

  const keepLogin = () => {
    let getLocalStorage = localStorage.getItem("xmart_login");
    if (getLocalStorage) {
      axios.get(`${API_URL}/user/keep-login`, {
        headers: {
          Authorization: `Bearer ${getLocalStorage}`,
        },
      })
        .then((res) => {
          localStorage.setItem("xmart_login", res.data.token);
          dispatch(loginAction(res.data));
          dispatch(getCartList());

        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("xmart_login");
          }
          console.log(err);
        });
    } else {
    }
  };

  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userLocation) {
      dispatch(setDefaultStore());
    }
    axios.get(`${API_URL}/product/get-branch-list`).then((res) => {
      setBranchList(res.data);
    });
    if (!branchName) {
      const selectedBranch = sessionStorage.getItem("branchName");
      if (selectedBranch) {
        dispatch(changeStoreAction({ defaultStore: selectedBranch }));
      } else {
        // If no branchName is selected, set the default store
        dispatch(setDefaultStore());
      }
    } else {
      // If branchName is set in the state, store it in session storage
      sessionStorage.setItem("branchName", branchName);
    }
    // eslint-disable-next-line
  }, [branchName, dispatch]);

  const closestStore = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
    };

    const success = (pos) => {
      let crd = pos.coords;
      axios
        .get(
          `${API_URL}/product/get-closest-store?lat=${crd.latitude}&lng=${crd.longitude}`
        )
        .then((res) => {
          console.log(res.data);
          dispatch(
            changeStoreAction({
              defaultStore: res.data.closestStore,
              userLocation: res.data.userLocation,
            })
          );
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
          {userLocation ? (
            <div className="flex flex-row items-center text-[#6CC51D] bg-[#6CC51D]/20 rounded-full px-2 py-1">
              <RiUserLocationFill className="mr-1" size={20} />
              <span className="font-bold text-xs ">{userLocation}</span>
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
