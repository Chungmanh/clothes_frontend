import { useState, useEffect } from "react";
import queryString from "query-string";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Product } from "../../components/Product";
import { useStateContext } from "../../store/Provider";
import { addToCart } from "../../store/Actions";

import productApi from "../../apis/productApi";

const cx = classNames.bind(styles);

function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // console.log(searchParams.get("page"));
  // const pageCurrent = searchParams.get("page") || 1;
  // const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { dispatch } = useStateContext();
  const handleClick = (e, item) => {
    e.stopPropagation();
    // console.log(item);
    dispatch(addToCart(item));
  };

  const showDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const location = useLocation();
  // console.log("location: ", location);
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = Math.ceil(total / 10);

  const queryParam = queryString.parse(location.search);
  // console.log("queryParam : ", queryParam);

  async function getData() {
    const productPage = await productApi.getProductByPage(
      // pageCurrent,
      queryParam,
      location.pathname
    );
    // console.log("productPage: ", productPage);
    setProducts(productPage.products);
    setTotal(productPage.totalProduct);
  }

  useEffect(() => {
    getData();
  }, [location.pathname, searchParams]);
  // }, [searchParams]);

  return (
    <div>
      <Box
        className={cx("product-list")}
        sx={{ display: "flex", flexWrap: "wrap", minHeight: "749px" }}
      >
        {products.map((item) => {
          item.quantity = 1;
          return (
            <Product
              sx={{
                width: { lg: "20%", md: "33.33333%", sm: "50%", xs: "100%" },
              }}
              key={item._id}
              item={item}
              handleClick={handleClick}
              showDetail={showDetail}
            />
          );
        })}
      </Box>
      {products && products.length !== 0 ? (
        <>
          <Pagination
            sx={{
              ".MuiPagination-ul": { justifyContent: "center" },
              margin: "20px 0px",
            }}
            page={page}
            count={count}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                // to={`${location.pathname}${
                //   item.page === 1 ? "" : `?page=${item.page}`
                // }`}
                to={{
                  pathname: location.pathname,
                  search: queryString.stringify({
                    ...queryParam,
                    page: item.page,
                  }),
                }}
                {...item}
              />
            )}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
