import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { Box, Typography, Button } from "@mui/material";

const cx = classNames.bind(styles);

function Product({ sx, item, handleClick, showDetail }) {
  const { _id, name, price, discount, brand, image } = item;
  return (
    <Box
      className={cx("wrapper")}
      sx={{
        padding: "10px",
        boxSizing: "border-box",
        ...sx,
      }}
      onClick={() => showDetail(_id)}
    >
      <Box
        sx={{
          padding: "8px",
          borderRadius: "0.5rem",
          ":hover": {
            background: "linear-gradient(225deg,#e6e6e6,#fff)",
            boxShadow: "-12px 12px 24px #d1d1d1, 12px -12px 24px #fff",
            ".addtocard": {
              bottom: "30%",
              visibility: "visible",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <img src={image} alt="" />
          <Button
            className="addtocard"
            onClick={(e) => handleClick(e, item)}
            sx={{
              position: "absolute",
              transition: "all 0.1s ease-out",
              visibility: "hidden",
              borderRadius: "0.5rem",
              background: "rgba(255, 255, 255, 0.7)",
              color: "#464A55",
              width: "70%",
              bottom: "25%",
              left: "50%",
              translate: " -50% 0px",
              ":hover": {
                background: "rgba(255, 255, 255, 1)",
                color: "#000",
              },
            }}
          >
            Add To Cart
          </Button>
          <div className={cx("product-info")}>
            <h3 className={cx("product-brand")}>{brand}</h3>
            <Typography
              className={cx("product-name")}
              sx={{
                whiteSpace: "nowrap",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Typography>
            <h4 className={cx("product-sizes")}>123</h4>
            <div className={cx("product-price")}>
              {price && !discount ? (
                <span className={cx("product-discountedPrice")}>
                  Rs. {price}
                </span>
              ) : (
                <>
                  <span className={cx("product-discountedPrice")}>
                    Rs. {discount}
                  </span>
                  <span className={cx("product-strike")}>Rs. {price}</span>
                </>
              )}
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
