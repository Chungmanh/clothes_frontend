import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import styles from "./cart.scss";
import { Link } from "react-router-dom";
import images from "../../assets/images";

import { useStateContext } from "../../store/Provider";
import { increase, decrease, remove } from "../../store/Actions";
import { Typography, Box } from "@mui/material";

const cx = classNames.bind(styles);

const Cart = ({ handleClick }) => {
  const { state, dispatch } = useStateContext();

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
    <>
      {state.products.length > 0 ? (
        <>
          <div className={cx("cart")}>
            {state.products.map((item, index) => (
              <div className={cx("card")} key={item._id}>
                <div className={cx("bag-left")}>
                  <img src={item.image} alt="" />
                </div>
                <div className={cx("bag-right")}>
                  <div className={cx("product-name")}>
                    <a href="#">{item.name}</a>
                  </div>
                  <div className={cx("product-size")}>
                    <span>80</span>
                  </div>
                  <div className={cx("product-price")}>
                    <span>{item.price}đ</span>
                    <div className={cx("delete-item")}>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => handleClickRemove(item)}
                      />
                    </div>
                  </div>
                  <div className={cx("control-quantity")}>
                    <button
                      className={cx("btn-left")}
                      disabled={item.quantity === 1}
                      onClick={() => handleClickDecrease(item)}
                    >
                      -
                    </button>
                    <p className={cx("quantity")}>{item.quantity}</p>
                    <button
                      className={cx("btn-right")}
                      onClick={() => handleClickIncrease(item)}
                    >
                      +
                    </button>
                    <div className={cx("total-item")}>
                      <p>
                        Tổng cộng: <span>{item.quantity * item.price}đ</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/pay"
            style={{
              color: "#fff",
              backgroundColor: "#000",
              display: "block",
              textAlign: "center",
              padding: "10px 0px",
              borderRadius: "4px",
            }}
            onClick={() => handleClick(false)}
          >
            Thanh toán
          </Link>
        </>
      ) : (
        <Box sx={{ marginTop: "20px" }}>
          <Box
            component="img"
            src={images.cartEmpty}
            sx={{
              display: "block",
              width: "170px",
              margin: "0 auto",
            }}
          />
          <Typography
            sx={{
              textAlign: "center",
              margin: "20px auto",
              color: "#666",
              fontSize: "13px",
            }}
          >
            Giỏ hàng rỗng
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              margin: "20px auto",
              color: "#666",
              fontSize: "13px",
            }}
          >
            Chào mừng bạn trở lại! Nếu bạn có các mặt hàng trong giỏ hàng, chúng
            tôi đã lưu chúng cho bạn. Bạn có thể{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "underline",
              }}
            >
              Đăng nhập
            </Link>{" "}
            bây giờ để xem chúng, hoặc bất cứ khi nào bạn đã sẵn sàng để kiểm
            tra.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Cart;
