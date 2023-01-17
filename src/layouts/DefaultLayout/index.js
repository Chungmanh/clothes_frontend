import classNames from "classnames/bind";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);

function DefaultLayout() {
  return (
    <div>
      <Header />
      <Breadcrumbs />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
