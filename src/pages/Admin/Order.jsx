import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { MdEdit } from "react-icons/md";

import Box from "@mui/material/Box";
import { TextField, IconButton } from "@mui/material";
import orderApi from "../../apis/orderApi";
import { RiDeleteBinLine, RiSearchLine } from "react-icons/ri";

function format(dt) {
  const date = new Date(dt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Order() {
  const [orders, setOrders] = useState([]);

  async function getData() {
    const orderData = await orderApi.getAll({});
    setOrders(orderData);
  }

  //   async function searchData(text) {
  //     const productData = await productApi.search(text);
  //     setOrders(productData);
  //   }

  //   async function getProductById(id) {
  //     const product = await productApi.get(id);
  //     return product;
  //   }

  //   async function deleteProductById(id) {
  //     const product = await productApi.deleteProduct(id);
  //     return product;
  //   }

  //   const handleEdit = async (id) => {
  //     const product = await getProductById(id);
  //     setFormData(product);
  //     setIsCreate(false);
  //     setOpen(true);
  //   };

  //   const handleDelete = async (id) => {
  //     await deleteProductById(id);
  //     await getData();
  //   };

  //   const handleOpen = () => {
  //     setIsCreate(true);
  //     setOpen(true);
  //   };
  //   const handleClose = () => {
  //     setFormData({});
  //     setOpen(false);
  //   };

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const handleSubmit = async () => {
  //     try {
  //       if (isCreate) {
  //         await productApi.addProduct(formData);
  //       } else {
  //         await productApi.editProduct(formData);
  //       }
  //       setFormData({});
  //       setOpen(false);
  //       await getData();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const handlePreviewImage = async (e) => {
  //     const file = e.target.files[0];
  //     file.preview = URL.createObjectURL(file);
  //     setImage(file);
  //     setFormData({
  //       ...formData,
  //       image: file,
  //     });
  //   };

  //   const handleChangeInputSearch = (event) => {
  //     const text = event.target.value;
  //     setTextSearch(text);
  //   };

  //   const handleOnKeyUpInputSearch = async (event) => {
  //     if (event.key === "Enter" && textSearch !== "") {
  //       await searchData(textSearch);
  //     } else {
  //       await getData();
  //     }
  //   };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Box
          sx={{
            position: "relative",
            marginLeft: 0,
            width: "238px",
            height: "39px",
            backgroundColor: "#e7f4fd",
            opacity: "0.8",
            padding: "8px 8px 8px 0px",
            boxSizing: "border-box",
          }}
        >
          <IconButton
            sx={{
              height: "100%",
              position: "absolute",
              top: 0,
              pointerEvents: "none",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "#000",
            }}
          >
            <RiSearchLine />
          </IconButton>
          <TextField
            sx={{
              height: "1.4375em",
              position: "absolute",
              top: 0,
              left: 0,
              paddingLeft: "42px",
              "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  border: "none",
                },
              },
            }}
            placeholder="Search…"
            size="small"
            // onKeyUp={handleOnKeyUpInputSearch}
            // onChange={handleChangeInputSearch}
          />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="right">phone number</TableCell>
              <TableCell align="right">address</TableCell>
              <TableCell align="right">order date</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length !== 0 &&
              orders.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="right">
                    {row && row.phoneNumber ? row.phoneNumber : ""}
                  </TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{format(row.createdAt)}</TableCell>
                  <TableCell align="right">
                    {row.status === true ? "Đã duyệt" : "Chưa duyệt"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label=""
                      //   onClick={() => handleEdit(row._id)}
                    >
                      <MdEdit size={20} />
                    </IconButton>
                    <IconButton
                      aria-label=""
                      //   onClick={() => handleDelete(row._id)}
                    >
                      <RiDeleteBinLine size={20} color={"red"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
