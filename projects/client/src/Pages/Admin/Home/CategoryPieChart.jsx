import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../helper";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FcShop } from "react-icons/fc";

const CategoryPieChart = () => {
  const { branch_id, role_id } = useSelector((state) => {
    return {
      branch_id: state.userReducer.branch_id,
      role_id: state.userReducer.role_id,
    };
  });
  const token = localStorage.getItem("xmart_login");
  const [categoryData, setCategoryData] = useState([]);
  const [superCategoryData, setSuperCategoryData] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState(1);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E087E8"];

  const countCategory = useCallback(() => {
    let res = 0;
    for (let val of categoryData) {
      res += Number(val.total_product);
    }
    return res;
  }, [categoryData]);

  const countSuperCategory = useCallback(() => {
    let res = 0;
    for (let val of superCategoryData) {
      res += Number(val.total_product);
    }
    return res;
  }, [superCategoryData]);

  const CategoryCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      let percent = ((payload[0].value / countCategory()) * 100).toFixed(0);
      return (
        <div className="bg-gray-50 rounded-lg px-2 py-1 shadow-md border">
          <p className="font-bold text-gray-800">{`${payload[0].name} (${percent}%)`}</p>
          <p>{`Total product : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const SuperCategoryCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      let percent = ((payload[0].value / countSuperCategory()) * 100).toFixed(
        0
      );
      return (
        <div className="bg-gray-50 rounded-lg px-2 py-1 shadow-md border">
          <p className="font-bold text-gray-800">{`${payload[0].name} (${percent}%)`}</p>
          <p>{`Total product : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    axios
      .get(
        `${API_URL}/report/get-category-data-branch?branch_id=${branch_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setCategoryData([]);
      });
  }, [branch_id, token]);

  useEffect(() => {
    axios.get(`${API_URL}/product/get-branch-list`).then((res) => {
      setBranchList(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/report/get-category-data-branch?branch_id=${selectedBranchId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setSuperCategoryData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setSuperCategoryData([]);
      });
  }, [selectedBranchId, token]);

  return (
    <>
      {/* Branch Admin */}
      {role_id === 2 ? (
        <div className="w-[80%] border shadow-md mt-2 px-5 py-3  rounded-lg">
          <div className="text-xl font-bold text-gray-600">Product Type</div>
          <div className="relative">
            <PieChart width={550} height={350}>
              <Pie
                data={categoryData}
                cx="30%"
                cy="50%"
                fill="#8884d8"
                dataKey="total_product"
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{ fontSize: "14px" }}
                content={<CategoryCustomTooltip />}
              />
              <Legend wrapperStyle={{ fontSize: "16px", fontWeight: "bold" }} />
            </PieChart>
            <table className="absolute top-14 right-[5%] table-auto text-sm w-[45%] shadow-sm border">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="px-1 py-1 text-left border-r">Category</th>
                  <th className="px-1 py-1 text-center">Total Product</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categoryData.map((val, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 duration-100">
                    <td
                      className="px-1 py-1 text-left border-r font-bold"
                      style={{ color: COLORS[idx] }}
                    >
                      {val.name}
                    </td>
                    <td className="text-center px-1 py-1">
                      {val.total_product}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t bg-gray-100">
                <tr>
                  <th className="px-1 py-1 text-left border-r font-bold">
                    Total
                  </th>
                  <th>{countCategory()}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        // Super Admin
        <div className="w-[80%] border shadow-md mt-2 px-5 py-3  rounded-lg">
          <div className="text-xl font-bold text-gray-600">Product Type</div>
          <div className="flex flex-row items-center mt-3">
            <FcShop size={20} className="inline" />
            <select
              className="bg-blue-100 font-semibold rounded-lg px-3 ml-1 py-1"
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
            >
              {branchList.map((val, idx) => {
                return (
                  <option key={idx} value={val.id}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="relative">
            <PieChart width={550} height={350}>
              <Pie
                data={superCategoryData}
                cx="30%"
                cy="50%"
                fill="#8884d8"
                dataKey="total_product"
              >
                {superCategoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                wrapperStyle={{ fontSize: "14px" }}
                content={<SuperCategoryCustomTooltip />}
              />
              <Legend wrapperStyle={{ fontSize: "16px", fontWeight: "bold" }} />
            </PieChart>
            <table className="absolute top-14 right-[5%] table-auto text-sm w-[45%] shadow-sm border">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="px-1 py-1 text-left border-r">Category</th>
                  <th className="px-1 py-1 text-center">Total Product</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {superCategoryData.map((val, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 duration-100">
                    <td
                      className="px-1 py-1 text-left border-r font-bold"
                      style={{ color: COLORS[idx] }}
                    >
                      {val.name}
                    </td>
                    <td className="text-center px-1 py-1">
                      {val.total_product}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t bg-gray-100">
                <tr>
                  <th className="px-1 py-1 text-left border-r font-bold">
                    Total
                  </th>
                  <th>{countSuperCategory()}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPieChart;
