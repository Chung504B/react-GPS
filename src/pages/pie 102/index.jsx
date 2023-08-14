import { Box } from "@mui/material";
import Header from "../../component/Header";
import { PieData102 } from "../../component/PieChartNo102";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieData102 />
      </Box>
    </Box>
  );
};

export default Pie;
