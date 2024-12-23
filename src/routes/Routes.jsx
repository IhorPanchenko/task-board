import Layout from "../layout/Layout";
import Home from "../pages/boards/Home";

const Routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];

export default Routes;
