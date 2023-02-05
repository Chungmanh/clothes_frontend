import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import orderApi from "../../apis/orderApi";
import Swal from "sweetalert2";

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
      const order = await orderApi.addOrder(userForm);
      if (order) {
        Swal.fire({
          icon: "success",
          title: "Đặt hàng thành công!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ôi, có lỗi!",
        text: error,
      });
    }
  };

  return (
    <Box>
      <Divider light sx={{ marginBottom: "10px", marginTop: "20px" }} />
      <Typography
        sx={{
          fontSize: "14px",
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
        required
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          sx={{}}
          onClick={handleSubmit}
          // onClick={handleClick}
        >
          Đặt hàng
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#DC3545" }}
          onClick={handleClick}
        >
          Hủy
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerForm;
