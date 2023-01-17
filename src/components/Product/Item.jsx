import { Box, Typography, Button } from "@mui/material";

const ItemProduct = ({ src, name, price }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "57px",
        padding: "6px 10px",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "rgba(22, 24, 35, 0.03)",
        },
      }}
    >
      <Box sx={{ marginRight: "10px" }}>
        <img
          style={{
            display: "block",
            width: "40px",
            height: "100%",
            objectFit: "cover",
          }}
          src={src}
          alt=""
        />
      </Box>
      <Box sx={{}}>
        <Typography sx={{ fontSize: "13px", fontWeight: 300 }}>
          {/* sx={{
                whiteSpace: "nowrap",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }} */}
          {name}
        </Typography>
        <Typography sx={{ color: "#ff0000", fontSize: "14px" }}>
          {price}
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemProduct;
