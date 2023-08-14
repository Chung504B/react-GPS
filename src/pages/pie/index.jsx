import { Box } from "@mui/material";
import Header from "../../component/Header";
import { PieData } from "../../component/PieChart2";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieData />
      </Box>
    </Box>
  );
};

export default Pie;
