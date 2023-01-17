import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Badge, styled } from "@mui/material";

import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import images from "../../../assets/images";

import { useStateContext } from "../../../store/Provider";
// import Button from "../../../components/Button";

import { wrapper as PopperWrapper } from "../../../components/Popper";
import { ItemProduct } from "../../../components/Product";
import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { CartDrawer } from "../../../components/CartDrawer";

import productApi from "../../../apis/productApi";

const cx = classNames.bind(styles);

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -5,
    top: 20,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {
  const { state } = useStateContext();
  // console.log(state);
  const [searchResult, setSearchResult] = useState([]);

  const handleChangeInputSearch = (event) => {
    const text = event.target.value;
    showResult(text);
  };

  async function showResult(text) {
    const products = await productApi.searchKey(text);
    setSearchResult(products);
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //   }, 0);
  // }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to="/" className={cx("nav-link")}>
            <img src={images.logo} alt="" />
          </Link>
        </div>
        <ul className={cx("menu-list")}>
          <li>
            <Link to="/" className={cx("nav-link")}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link to="/" className={cx("nav-link")}>
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link to="/" className={cx("nav-link")}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/" className={cx("nav-link")}>
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link to="/" className={cx("nav-link")}>
              Khuyến mãi
            </Link>
          </li>
        </ul>
        <Tippy
          interactive
          visible={searchResult.length > 0}
          // visible={true}
          render={(attrs) => (
            <div className={cx("search-result")} {...attrs}>
              <PopperWrapper>
                {searchResult.map((item) => (
                  <ItemProduct
                    key={item._id}
                    src={item.image[0]}
                    name={item.name}
                    price={`${item.price}₫`}
                  />
                ))}
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx("search")}>
            <input
              placeholder="Tìm kiếm ..."
              spellCheck="false"
              onChange={handleChangeInputSearch}
            />
            {/* <button className={cx("clear")}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} /> */}
            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>

        <div className={cx("actions")}>
          {/* <Button primary>Log in</Button> */}
          <Link to="/login" className={cx("cart-btn")}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
        <StyledBadge badgeContent={state.total} color="secondary">
          <div className={cx("cart-btn")}>
            <CartDrawer />
          </div>
        </StyledBadge>
      </div>
    </div>
  );
}

export default Header;
