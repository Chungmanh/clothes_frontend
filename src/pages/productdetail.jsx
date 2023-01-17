import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import { useStateContext } from "../store/Provider";
import { addToCart } from "../store/Actions";
import productApi from "../apis/productApi";

const ProductDetail = () => {
  const [pro, setPro] = useState({});
  const [sizepro, setSizePro] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useStateContext();
  const routeParams = useParams();

  const handleClick = (item) => {
    item.quantity = quantity;
    dispatch(addToCart(item));
  };

  const sizes = [
    {
      value: "M",
    },
    {
      value: "L",
    },
    {
      value: "XL",
    },
  ];

  async function getData() {
    const product = await productApi.get(routeParams.id);
    setPro(product);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ height: "425px", padding: "0px 15px" }}>
        <Box
          sx={{
            display: "block",
            height: "100%",
            width: "425px",
            objectFit: "contain",
          }}
          component="img"
          src={pro.image}
        />
      </Box>
      <Box sx={{ padding: "0px 15px", width: "100%" }}>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 400,
            color: "#000",
            textTransform: "capitalize",
            marginBottom: "13px",
          }}
        >
          {pro.name}
        </Typography>
        <Box
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#000",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Box sx={{ fontWeight: 500 }}>Thương hiệu:&nbsp;</Box>
          <Box component="a">{pro.brand}</Box>
          <Box component="span" sx={{ margin: "0px 10px" }}>
            |
          </Box>
          <Box sx={{ fontWeight: 500 }}>Loại: </Box>
          <Box component="a">Tết</Box>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Typography
            sx={{
              color: "#F14550",
              fontWeight: 500,
              fontSize: "22px",
              marginRight: "15px",
            }}
          >
            {pro.price}₫
          </Typography>
          <Typography
            sx={{ fontWeight: 500, fontSize: "14px", marginLeft: "15px" }}
          >
            Tình trạng:{" "}
            <span style={{ color: "#9C27B0", fontWeight: 400 }}>Còn hàng</span>
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              marginBottom: "5px",
            }}
          >
            Kích thước:
          </Typography>
          {sizes.map((size) => (
            <Button
              key={size.value}
              variant="outlined"
              onClick={() => setSizePro(size.value)}
              sx={
                size.value !== sizepro
                  ? {
                      border: "1px solid rgba(0,0,0,.09)",
                      color: "rgba(0,0,0,.8)",
                      margin: "0px 8px 8px 0px",
                      ":hover": {
                        color: "#9C27B0",
                        borderColor: "#9C27B0",
                      },
                    }
                  : {
                      border: "1px solid #9C27B0",
                      color: "#9C27B0",
                      margin: "0px 8px 8px 0px",
                      ":hover": {
                        color: "#9C27B0",
                        borderColor: "#9C27B0",
                      },
                    }
              }
            >
              {size.value}
            </Button>
          ))}
        </Box>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "5px",
          }}
        >
          Số lượng:
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
        >
          <Button
            sx={{
              minWidth: "25px",
              height: "28px",
              color: "#222",
              border: "1px solid #e6e6e6",
              lineHeight: "28px",
              borderRadius: "100px 0 0 100px",
            }}
            disabled={quantity === 1}
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </Button>
          <Typography
            sx={{
              width: "34px",
              height: "26px",
              lineHeight: "28px",
              textAlign: "center",
              outline: "0",
              color: "#000",
              borderTop: "1px solid #e6e6e6",
              borderBottom: "1px solid #e6e6e6",
              fontSize: "13px",
            }}
          >
            {quantity}
          </Typography>
          <Button
            sx={{
              minWidth: "25px",
              height: "28px",
              color: "#222",
              border: "1px solid #e6e6e6",
              lineHeight: "28px",
              borderRadius: "0 100px 100px 0",
              marginRight: "30px",
            }}
            disabled={quantity === pro.amount}
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>

          <Typography sx={{ color: "#757575", fontSize: "14px" }}>
            {pro.amount} sản phẩm có sẵn
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
            // paddingRight: 154px,
            boxSizing: "border-box",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            sx={{
              width: "calc(45% - 15px)",
            }}
            onClick={() => handleClick(pro)}
          >
            Thêm vào giỏ
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            sx={{
              width: "calc(45% - 15px)",
            }}
          >
            Mua ngay
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
