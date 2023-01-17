import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon }) {
  const location = useLocation();
  //   console.log("NavLink: ", location);
  return (
    <NavLink
      //   className={(nav) => cx("menu-item", { active: nav.isActive })}
      className={(nav) =>
        cx("menu-item", {
          active: `${location.pathname}${location.search}`.includes(to),
        })
      }
      to={to}
    >
      {/* {console.log("to: ", to.includes("?brand=ADIDAS"))} */}
      {/* {console.log(
        "to: ",
        `${location.pathname}${location.search}`.includes(to),
        title
      )} */}
      {icon}
      <span className={cx("title")}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default MenuItem;
