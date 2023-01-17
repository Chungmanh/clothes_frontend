import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/index";
import Sidebar from "./Sidebar/index";
import { useStateContext } from "../../store/Provider";
import { Box } from "@mui/material";

function AdminLayout() {
  const { isOpenSidebar } = useStateContext();
  return (
    <div>
      <div className="header">
        <Navbar />
      </div>
      <Box className="main">
        <Sidebar />
        <Box
          className="page"
          sx={{
            marginLeft: isOpenSidebar ? "250px" : "20px",
            transition: "all 0.3s ease-out",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default AdminLayout;
