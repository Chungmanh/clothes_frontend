import { TextField, Box, Button } from "@mui/material";

function Login() {
  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "800px",
          margin: "100px auto",
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <div className="title" style={{ textAlign: "center" }}>
              Đăng nhập
            </div>
            <TextField
              fullWidth
              sx={{
                margin: "20px 0",
                display: "block",
              }}
              label="Địa chỉ Email"
              id="email"
              size="small"
            />
            <TextField
              fullWidth
              sx={{ margin: "20px 0", display: "block" }}
              label="Mật khẩu"
              type={"password"}
              id="password"
              size="small"
            />
            <Button
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "#000",
                ":hover": {
                  backgroundColor: "#666",
                },
              }}
              size="large"
            >
              Đăng nhập
            </Button>
          </div>
        </Box>

        <Box
          component="div"
          sx={{
            borderLeft: { xs: "none", md: "1px solid #e5e5e5" },
            width: { xs: "100%", md: "50%" },
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <div className="title" style={{ textAlign: "center" }}>
              Đăng ký
            </div>
            <TextField
              fullWidth
              sx={{
                margin: "20px 0",
                display: "block",
              }}
              label="Địa chỉ Email"
              id="email"
              size="small"
            />
            <TextField
              fullWidth
              sx={{
                margin: "20px 0",
                display: "block",
              }}
              label="Mật khẩu"
              type={"password"}
              id="password"
              size="small"
            />
            <TextField
              fullWidth
              sx={{
                margin: "20px 0",
                display: "block",
              }}
              label="Xác nhận Mật khẩu"
              type={"password"}
              id="password"
              size="small"
            />
            <Button
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: "#000",
                ":hover": {
                  backgroundColor: "#666",
                },
              }}
              size="large"
            >
              Đăng ký
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Login;
