import React from "react";
import PageAdmin from "../../../Components/PageAdmin";
import { FcShop } from "react-icons/fc";
import { GiQueenCrown } from "react-icons/gi";
import { useSelector } from "react-redux";

import StockPieChart from "./StockPieChart";

const AdminHome = () => {
  const { role_id, branch_name } = useSelector((state) => {
    return {
      role_id: state.userReducer.role_id,
      branch_name: state.userReducer.branch_name,
    };
  });

  return (
    <PageAdmin>
      <div>
        <div className="text-gray-800 text-xl font-bold">
          {role_id === 2 ? (
            <>
              <FcShop className="inline mb-1 mr-1" size={25} />
              {branch_name}
            </>
          ) : (
            <>
              <GiQueenCrown className="inline mb-1 mr-1" size={25} />
              Xmart Super Admin
            </>
          )}
        </div>
        <StockPieChart />
      </div>
    </PageAdmin>
  );
};

export default AdminHome;
