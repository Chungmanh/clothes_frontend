import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Breadcrumbs.module.scss";
import categoryApi from "../../apis/categoryApi";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const Breadcrumbs = (props) => {
  const [categories, setCategorys] = useState("");
  const { router } = props;
  const { navigate, location } = router;
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    async function getData(pathnames) {
      setCategorys(await categoryApi.get(pathnames));
    }
    getData(pathnames);
  }, [props.router.location]);

  return (
    <div className={cx("wrapper")}>
      <MUIBreadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 ? (
          <Link
            onClick={() => navigate("/")}
            style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.87)" }}
          >
            Trang chủ
          </Link>
        ) : (
          <Typography color="text.primary">Trang chủ</Typography>
        )}

        {categories ? (
          <Typography color="text.primary">{categories.name}</Typography>
        ) : (
          ""
        )}

        {/* {pathnames.map((name, index) => {
          const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name} color="text.primary">
              {name}
            </Typography>
          ) : (
            <Link key={name} onClick={() => navigate(`/${routeTo}`)}>
              {name}
            </Link>
          );
        })} */}
      </MUIBreadcrumbs>
    </div>
  );
};

export default withRouter(Breadcrumbs);
