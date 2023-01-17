import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { Box } from "@mui/material";
import { useState } from "react";

const cx = classNames.bind(styles);

function Menu({ title, children, open = false }) {
  const [isOpen, setIsOpen] = useState(open);

  const showMenu = () => {
    setIsOpen(!isOpen);
  };

  const style = isOpen
    ? {
        maxHeight: "300px",
        overflow: "hidden",
        transition: "all 1s ease-in-out",
      }
    : {
        height: "auto",
        maxHeight: 0,
        transition: "all 0.5s ease-in-out",
        overflow: "hidden",
      };
  return (
    <div>
      <h3 className={cx("title-menu")} onClick={showMenu}>
        {title}
        <span>{isOpen ? "–" : "+"}</span>
      </h3>
      <Box sx={style}>{children}</Box>
    </div>
  );
}

export default Menu;
