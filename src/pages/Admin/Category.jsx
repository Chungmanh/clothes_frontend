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
import Typography from "@mui/material/Typography";
import categoryApi from "../../apis/categoryApi";
import { RiDeleteBinLine, RiSearchLine } from "react-icons/ri";

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

export default function Category() {
  const [categorys, setCategorys] = useState([]);
  const [formData, setFormData] = useState({});
  const [textSearch, setTextSearch] = useState("");
  const [isCreate, setIsCreate] = useState(true);

  async function getData() {
    const categoryData = await categoryApi.getAll({});
    console.log(categoryData);
    setCategorys(categoryData);
  }

  async function searchData(text) {
    const categoryData = await categoryApi.search(text);
    setCategorys(categoryData);
  }

  async function getCategoryById(id) {
    const category = await categoryApi.get(id);
    return category;
  }

  async function deleteCategoryById(id) {
    const category = await categoryApi.deleteCategory(id);
    return category;
  }

  const handleEdit = async (id) => {
    const category = await getCategoryById(id);
    setFormData(category);
    setIsCreate(false);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteCategoryById(id);
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
        await categoryApi.addCategory(formData);
      } else {
        await categoryApi.editCategory(formData);
      }
      setFormData({});
      setOpen(false);
      await getData();
    } catch (error) {
      console.error(error);
    }
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
  }, []);

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
              <TableCell align="right">description</TableCell>
              <TableCell align="right">actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorys.length !== 0 &&
              categorys.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
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
              {isCreate ? "Thêm mới danh mục" : "Cập nhật danh mục"}
            </Typography>
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                color="secondary"
                label="Name"
                size="small"
                name={"name"}
                value={formData.name || ""}
                onChange={handleChange}
              />
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
