import classNames from "classnames/bind";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import styles from "./HeaderOnly.module.scss";

const cx = classNames.bind(styles);

function HeaderOnly() {
  return (
    <div>
      <Header />
      <div className={cx("container")}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default HeaderOnly;
