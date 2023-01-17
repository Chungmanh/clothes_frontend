import Dashboard from "./layouts/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import HeaderOnly from "./layouts/HeaderOnly";
import Product from "./pages/Admin/Product";
import Order from "./pages/Admin/Order";
import Category from "./pages/Admin/Category";
import ProductClient from "./pages/Home/index";
import Login from "./pages/Login/index";
import Pay from "./pages/pay";
import ProductDetail from "./pages/productdetail";
// import Register from "./pages/Register";
// import Bar from "./pages/Bar";

// import Home from "./pages/Home";
// import AdminHome from "./pages/Admin/Product";
// import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <ProductClient />,
      },
      {
        path: "/:id",
        element: <ProductClient />,
      },
    ],
  },
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "categorys",
        element: <Category />,
      },
      {
        path: "orders",
        element: <Order />,
      },
    ],
  },
  {
    path: "/",
    element: <HeaderOnly />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/pay",
        element: <Pay />,
      },
      {
        path: "/detail/:id",
        element: <ProductDetail />,
      },
    ],
  },

  //   {
  //     path: "register",
  //     element: <Register />,
  //   },
];

export default routes;
