import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import Fab from "@mui/material/Fab";
import { MdAdd, MdEdit } from "react-icons/md";

import Box from "@mui/material/Box";
import { TextField, Button, IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import productApi from "../../apis/productApi";
import categoryApi from "../../apis/categoryApi";
import { RiDeleteBinLine, RiSearchLine } from "react-icons/ri";

const types = [
  {
    value: "Áo khoác",
    label: "Áo khoác",
  },
  {
    value: "Áo thun",
    label: "Áo thun",
  },
  {
    value: "Ngắn tay",
    label: "Ngắn tay",
  },
  {
    value: "Dài tay",
    label: "Dài tay",
  },
  {
    value: "Sơ mi",
    label: "Sơ mi",
  },
  {
    value: "Khác",
    label: "Khác",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [formData, setFormData] = useState({});
  const [textSearch, setTextSearch] = useState("");
  const [isCreate, setIsCreate] = useState(true);
  const [image, setImage] = useState();

  async function getData() {
    const productData = await productApi.getAll({});
    const categoryData = await categoryApi.getAll({});
    console.log(categoryData);
    setCategorys(categoryData);
    // console.log(productData);
    setProducts(productData);
  }

  async function searchData(text) {
    const productData = await productApi.search(text);
    setProducts(productData);
  }

  async function getProductById(id) {
    const product = await productApi.get(id);
    return product;
  }

  async function deleteProductById(id) {
    const product = await productApi.deleteProduct(id);
    return product;
  }

  const handleEdit = async (id) => {
    const product = await getProductById(id);
    setFormData(product);
    setIsCreate(false);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteProductById(id);
    await getData();
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setIsCreate(true);
    setOpen(true);
  };
  const handleClose = () => {
    setFormData({});
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isCreate) {
        await productApi.addProduct(formData);
      } else {
        await productApi.editProduct(formData);
      }
      setFormData({});
      setOpen(false);
      await getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviewImage = async (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
    setFormData({
      ...formData,
      image: file,
    });
    // await productApi.uploadImage(image);
  };

  const handleChangeInputSearch = (event) => {
    const text = event.target.value;
    setTextSearch(text);
  };

  const handleOnKeyUpInputSearch = async (event) => {
    if (event.key === "Enter" && textSearch !== "") {
      await searchData(textSearch);
    } else {
      await getData();
    }
  };

  useEffect(() => {
    getData();
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Fab
          size="medium"
          sx={{ backgroundColor: "rgb(94, 53, 177)", color: "#fff" }}
          aria-label="add"
          onClick={handleOpen}
        >
          <MdAdd style={{ fontSize: "24px" }} />
        </Fab>
        <Box>
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
              onKeyUp={handleOnKeyUpInputSearch}
              onChange={handleChangeInputSearch}
            />
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align="center">image</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">type</TableCell>
              <TableCell align="right">amount&nbsp;(cái)</TableCell>
              <TableCell align="right">actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length !== 0 &&
              products.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.image.length >= 1 ? (
                      <Box
                        component={"img"}
                        src={row.image[0]}
                        sx={{ width: "60px" }}
                      />
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {row && row.price ? row.price : ""}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label=""
                      onClick={() => handleEdit(row._id)}
                    >
                      <MdEdit size={20} />
                    </IconButton>
                    <IconButton
                      aria-label=""
                      onClick={() => handleDelete(row._id)}
                    >
                      <RiDeleteBinLine size={20} color={"red"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isCreate ? "Thêm mới sản phẩm" : "Cập nhật sản phẩm"}
            </Typography>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Name"
                size="small"
                name={"name"}
                // value={name}
                value={formData.name || ""}
                onChange={handleChange}
                // focused
              />
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Price"
                size="small"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Brand"
                size="small"
                name="brand"
                value={formData.brand || ""}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Label"
                size="small"
                name="label"
                value={formData.label || ""}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Category"
                size="small"
                select
                name="categoryId"
                value={formData.categoryId || ""}
                onChange={handleChange}
              >
                {categorys.map((option) => (
                  <MenuItem
                    key={option._id}
                    value={option._id}
                    name={option.name}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Description"
                size="small"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
              />
              <Box>
                <Box
                  component={"input"}
                  // margin="normal"
                  name="image"
                  type={"file"}
                  accept="image/*"
                  onChange={handlePreviewImage}
                />
                {image && <img src={image.preview} alt="" width="80px" />}
              </Box>
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Type"
                size="small"
                select
                name="type"
                value={formData.type || ""}
                onChange={handleChange}
                // helperText="Please select your type"
              >
                {types.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    name={option.label}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Amount"
                size="small"
                name="amount"
                value={formData.amount || ""}
                onChange={handleChange}
              />
            </Box>
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              {isCreate ? "Thêm" : "Cập nhật"}
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
