import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import orderApi from "../../apis/orderApi";

const CustomerForm = ({ detail, handleClick }) => {
  const [userForm, setUserForm] = useState({});

  const handleChangeForm = (event) => {
    const { name, value } = event.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      userForm.detail = detail.map((item) => {
        return {
          productId: item._id,
          quantity: item.quantity,
        };
      });
      // console.log("userForm: ", userForm);
      // const order = await orderApi.addOrder(userForm);
      // handleClick();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          textTransform: "capitalize",
          marginBottom: "10px",
        }}
      >
        Thông tin giao hàng
      </Typography>
      <Typography
        sx={{
          color: "#737373",
          fontSize: "14px",
          display: "inline-block",
        }}
      >
        Bạn đã có tài khoản?&nbsp;
      </Typography>
      <Link
        to="/login"
        style={{
          fontSize: "14px",
        }}
      >
        Đăng nhập
      </Link>
      <TextField
        fullWidth
        sx={{
          margin: "10px 0",
          display: "block",
        }}
        label="Họ và tên"
        id="name"
        name="name"
        size="small"
        onChange={handleChangeForm}
      />
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          sx={{
            margin: "0px 5px 10px 0px",
            display: "block",
            width: "60%",
          }}
          label="Email"
          id="email"
          name="email"
          size="small"
          onChange={handleChangeForm}
        />
        <TextField
          fullWidth
          sx={{
            margin: "0px 0px 10px 5px",
            display: "inline-block",
            width: "40%",
          }}
          label="Số điện thoại"
          id="phoneNumber"
          name="phoneNumber"
          size="small"
          onChange={handleChangeForm}
        />
      </Box>
      <TextField
        fullWidth
        sx={{
          marginBottom: "10px",
          display: "block",
        }}
        label="Địa chỉ"
        id="address"
        name="address"
        size="small"
        onChange={handleChangeForm}
      />
      <Button
        variant="contained"
        sx={{}}
        // onClick={handleSubmit}
        onClick={handleClick}
      >
        Hoàn tất đơn hàng
      </Button>
    </Box>
  );
};

export default CustomerForm;
