import { Drawer, Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Cart from "./cart";
import { useState } from "react";

export const CartDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <FontAwesomeIcon
        onClick={() => setIsDrawerOpen(true)}
        icon={faBagShopping}
      />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="400px">
          {/* <Typography variant="h6" component="div"> */}
          <Cart handleClick={setIsDrawerOpen} />
          {/* </Typography> */}
        </Box>
      </Drawer>
    </>
  );
};
