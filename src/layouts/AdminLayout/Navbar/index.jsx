import * as React from "react";
import { Box, IconButton } from "@mui/material";
import { VscThreeBars } from "react-icons/vsc";
import { useStateContext } from "../../../store/Provider";

function Navbar() {
  const { isOpenSidebar, setIsOpenSidebar } = useStateContext();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "48px",
        padding: "16px 24px",
        boxSizing: "border-box",
      }}
    >
      <IconButton
        sx={{ color: "rgb(94, 53, 177)" }}
        aria-label="add an alarm"
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
      >
        <VscThreeBars />
      </IconButton>
    </Box>
  );
}

export default Navbar;
