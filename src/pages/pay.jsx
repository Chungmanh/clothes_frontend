import { Box, Typography, Divider, Button, Popper, Fade } from "@mui/material";
import { useStateContext } from "../store/Provider";
import { increase, decrease, remove } from "../store/Actions";
import { GrFavorite } from "react-icons/gr";
import { useState } from "react";
import CustomerForm from "../components/CustomerForm";

const Pay = () => {
  const { state, dispatch } = useStateContext();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("event.currentTarget: ", event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  let totalMoney = 0;

  const handleClickIncrease = (item) => {
    dispatch(increase(item));
  };
  const handleClickDecrease = (item) => {
    dispatch(decrease(item));
  };
  const handleClickRemove = (item) => {
    dispatch(remove(item));
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 2, padding: "10px", marginRight: "20px" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 500,
              textTransform: "capitalize",
              marginBottom: "10px",
            }}
          >
            Tóm tắt mặt hàng
          </Typography>
          <Divider light sx={{ marginBottom: "10px" }} />
          {state.products.map((item, index) => {
            totalMoney += item.quantity * item.price;
            return (
              <Box key={item._id}>
                <Box
                  sx={{
                    display: "flex",
                    marginBottom: "10px",
                    position: "relative",
                  }}
                >
                  <Box sx={{ width: "100px", marginRight: "12px" }}>
                    <img
                      style={{
                        width: "100%",
                        height: "150px",
                        display: "block",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt=""
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontSize: "14px",
                        display: "block",
                        paddingBottom: "10px",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          position: "absolute",
                          right: "0",
                          top: "50%",
                          translate: "0px -50%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            width: "100px",
                            lineHeight: "28px",
                            color: "#fa6338",
                            fontWeight: 500,
                          }}
                        >
                          {item.price}
                          <span
                            style={{
                              textDecoration: "underline",
                              fontSize: "12px",
                            }}
                          >
                            đ
                          </span>
                        </Typography>
                        <Button
                          sx={{
                            minWidth: "25px",
                            height: "28px",
                            color: "#222",
                            border: "1px solid #e6e6e6",
                            lineHeight: "28px",
                            borderRadius: "100px 0 0 100px",
                          }}
                          disabled={item.quantity === 1}
                          onClick={() => handleClickDecrease(item)}
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
                          {item.quantity}
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
                          onClick={() => handleClickIncrease(item)}
                        >
                          +
                        </Button>
                        <Box>
                          <Typography
                            sx={{
                              color: "#000",
                              fontSize: "14px",
                              width: "100px",
                              lineHeight: "28px",
                              fontWeight: 500,
                            }}
                          >
                            {item.quantity * item.price}
                            <span
                              style={{
                                textDecoration: "underline",
                                fontSize: "12px",
                              }}
                            >
                              đ
                            </span>
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "0",
                        }}
                      >
                        <Button
                          variant="text"
                          sx={{
                            color: "#222",
                            textTransform: "none",
                          }}
                        >
                          <GrFavorite />
                          <Typography
                            sx={{
                              fontSize: "13px",
                              marginLeft: "5px",
                            }}
                          >
                            Lưu lại sau
                          </Typography>
                        </Button>
                        <Button
                          variant="text"
                          sx={{
                            color: "#222",
                            textTransform: "none",
                          }}
                          onClick={() => handleClickRemove(item)}
                        >
                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            Xoá
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Divider light sx={{ marginBottom: "10px" }} />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="left"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                boxShadow:
                  "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
                padding: "10px",
                backgroundColor: "rgb(255, 255, 255)",
                borderRadius: "4px",
                marginRight: "10px",
              }}
            >
              {/* {console.log("state: ", state)} */}
              <CustomerForm detail={state.products} handleClick={handleClick} />
            </Box>
          </Fade>
        )}
      </Popper>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#6666660D",
          borderRadius: "0.5rem",
          padding: "10px 20px",
          height: "200px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            textTransform: "capitalize",
            marginBottom: "10px",
          }}
        >
          Tóm tắt đơn hàng
        </Typography>
        <Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              marginBottom: "10px",
            }}
          >
            Tổng tiền:{" "}
            <span
              style={{ color: "#F14550", fontWeight: 500, fontSize: "20px" }}
            >
              {totalMoney} ₫
            </span>
          </Typography>
          <Typography
            sx={{
              color: "#767676",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            Thuế và vận chuyển sẽ được tính khi thanh toán
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "48px",
              backgroundColor: "#000",
              ":hover": {
                backgroundColor: "#666",
              },
            }}
            onClick={handleClick}
          >
            Thanh toán ngay
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Pay;
