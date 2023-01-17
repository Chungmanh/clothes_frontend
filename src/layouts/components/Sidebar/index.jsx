import { useEffect, useState } from "react";
import queryString from "query-string";
import classNames from "classnames/bind";
import Menu, { MenuItem } from "./Menu";
import { Slider, Box, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./Sidebar.module.scss";

import menu from "../../../data/menu-client";
import categoryApi from "../../../apis/categoryApi";

import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

const cx = classNames.bind(styles);

function valuetext(value) {
  return `${value}°C`;
}

function Sidebar() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState(() => {
    const initParams = {};

    const keys = menu.map((itemMenu) => itemMenu.keyName);

    for (const key of keys) {
      initParams[key] = [];
    }

    return initParams;
  });

  const [price, setPrice] = useState([20, 37]);

  const [categories, setCategorys] = useState([]);

  useEffect(() => {
    async function getData() {
      setCategorys(await categoryApi.getAll({}));
    }
    getData();
  }, []);

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      ...params,
    });
  }, [params]);

  // console.log("categories:", categories);

  const handleChange1 = (e) => {
    setPrice(e.target.value);
  };

  // const queryParam = queryString.parse(location.search);

  const onHandleChange = (e) => {
    const { name, checked, value } = e.target;
    // console.log("key: ", name, checked, value);
    let newParams = params[name];

    if (checked && !newParams.includes(value)) {
      newParams.push(value);
    } else {
      newParams = newParams.filter((item) => item !== value);
    }
    setParams({
      ...params,
      [name]: [...newParams],
    });
  };

  // console.log("params: ", params);

  return (
    <aside className={cx("wrapper")}>
      <Menu title="Danh mục sản phẩm" open={true}>
        <Box sx={{ padding: "10px 0px" }}>
          {categories.map((item) => (
            <MenuItem
              key={item._id}
              title={item.name}
              to={item._id}
              icon={
                <span>
                  <input type="radio"></input>
                </span>
              }
            />
          ))}
        </Box>
      </Menu>
      {menu.map((category) => (
        <Menu title={category.title} key={category.title}>
          <Box sx={{ padding: "10px 0px" }}>
            {category.items.map((item) => (
              <FormControlLabel
                key={item.name}
                control={<Checkbox />}
                label={item.name}
                name={category.keyName}
                value={item.name}
                onChange={onHandleChange}
              />
            ))}
          </Box>
        </Menu>
      ))}

      <Box
        sx={{
          fontWeight: 500,
          fontSize: "15px",
          padding: "10px 0px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        Sắp xếp giá cả (VND)
      </Box>

      <Slider
        getAriaLabel={() => "Minimum distance"}
        size="small"
        value={price}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </aside>
  );
}

export default Sidebar;
