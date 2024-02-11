import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartImage from '../assets/NoData.png'

/* eslint-disable react/prop-types */
const Graph = ({ dt }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      {dt?.length > 0 ? (
        <AreaChart data={dt}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      ) : (
        <img
          src={ChartImage}
          alt="no data"
          className="w-full h-full opacity-50 object-cover"
        />
      )}
    </ResponsiveContainer>
  );
};

export default Graph;
