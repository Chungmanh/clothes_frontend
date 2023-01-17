import { FaUserFriends } from "react-icons/fa";
import {
  AiOutlineShoppingCart,
  AiOutlineLineChart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
} from "react-icons/ai";
import { CgUserList } from "react-icons/cg";
import { RiProductHuntLine } from "react-icons/ri";
import { FiPieChart } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

const links = [
  {
    title: "Pages",
    links: [
      { name: "products", icon: <RiProductHuntLine /> },
      { name: "categorys", icon: <BiCategory /> },
      { name: "orders", icon: <AiOutlineShoppingCart /> },
      { name: "employees", icon: <FaUserFriends /> },
      { name: "customers", icon: <CgUserList /> },
    ],
  },
  {
    title: "Charts",
    links: [
      { name: "line", icon: <AiOutlineLineChart /> },
      { name: "area", icon: <AiOutlineAreaChart /> },
      { name: "bar", icon: <AiOutlineBarChart /> },
      { name: "pie", icon: <FiPieChart /> },
    ],
  },
];

export default links;
