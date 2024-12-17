import Layout from "../layout/Layout";
import Boards from "../pages/boards/Boards";

const Routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Boards />,
      },
    ],
  },
];

export default Routes;
