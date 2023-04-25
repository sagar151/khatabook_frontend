import { useRoutes } from "react-router";
import Dashboard from "../pages/MainLayout/MainLayout";
import Profile from "../pages/Profile/Profile";

//Practice for useRoutes hooks only

export default function Routers() {
  let element = useRoutes([
    // {
    //   element: <AuthLayout />,
    //   children: [
    //     { path: "/", element: <Login /> },
    //     { path: "signup", element: <SignUp /> }
    //   ]
    // },
    {
      element: <Dashboard />,
      children: [
        { path: "about", element: <Profile /> },
        // { path: "about", element: <About /> }
      ]
    }
  ]);

  return element;
}
