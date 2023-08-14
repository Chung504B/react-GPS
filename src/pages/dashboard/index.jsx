import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import TrafficIcon from "@mui/icons-material/Traffic";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import { mockPieData as data } from "../../data/mockData";
import Header from "../../component/Header";
import BarChart from "../../component/BarChart";
import PieChart from "../../component/PieChart";
import { PieData } from "../../component/PieChart2";
import { PieData102 } from "../../component/PieChartNo102";
import StatBox from "../../component/StatBox";
import ProgressCircle from "../../component/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="UBI Dashboard"
          subtitle="Welcome to your UBI dashboard"
        />

        <Box></Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="22"
            subtitle="CarNo102 "
            progress="0.75"
            increase="+14%"
            icon={
              <TaxiAlertIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="23"
            subtitle="No122"
            progress="0.50"
            increase="+21%"
            icon={
              <TaxiAlertIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="datapoint"
            progress="0.30"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            No122 Car Brake status
          </Typography>
          <Box height="400px" mt="-20px">
            <PieData isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            No102 Car Brake status
          </Typography>
          <Box height="400px" mt="-20px">
            <PieData102 isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
