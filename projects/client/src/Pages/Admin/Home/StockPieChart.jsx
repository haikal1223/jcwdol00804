import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../../helper";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const StockPieChart = () => {
  const { branch_id } = useSelector((state) => {
    return {
      branch_id: state.userReducer.branch_id,
    };
  });
  const token = localStorage.getItem("xmart_login");
  const [stockData, setStockData] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E087E8"];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) - 1;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) + 7;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={16}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const countTotalItems = useCallback(() => {
    let res = 0;
    for (let val of stockData) {
      res += Number(val.stock);
    }
    return res;
  }, [stockData]);

  useEffect(() => {
    axios
      .get(`${API_URL}/report/get-stock-data-branch?branch_id=${branch_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStockData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setStockData([]);
      });
  }, [branch_id, token]);

  return (
    <div className="w-[80%] border shadow-md mt-2 px-5 py-3 text-xl font-bold text-gray-600 rounded-lg">
      <div>Stock Overview </div>
      <div className="relative">
        <PieChart width={600} height={400}>
          <Pie
            data={stockData}
            cx="30%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="stock"
          >
            {stockData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{ fontSize: "14px" }} />
          <Legend wrapperStyle={{ fontSize: "16px" }} />
        </PieChart>
        <table className="absolute top-14 right-[10%] table-auto text-sm w-[45%] shadow-sm border">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="px-1 py-1 text-left border-r">Product</th>
              <th className="px-1 py-1 text-center">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {stockData.map((val, idx) => (
              <tr key={idx} className="hover:bg-gray-50 duration-100">
                <td className="px-1 py-1 text-left border-r">{val.name}</td>
                <td className="text-center px-1 py-1">{val.stock}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t bg-gray-100">
            <tr>
              <th className="px-1 py-1 text-center border-r font-bold">
                Total
              </th>
              <th>{countTotalItems()}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default StockPieChart;
