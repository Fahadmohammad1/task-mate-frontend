import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      //   {
      //     path: "register",
      //     element: <Register />,
      //   },
      //   {
      //     path: "login",
      //     element: <Login />,
      //   },
      //   {
      //     path: "about-us",
      //     element: <AboutUs />,
      //   },
      //   {
      //     path: "contact-us",
      //     element: <ContactUs />,
      //   },
    ],
  },
  //   {
  //     path: "/dashboard",
  //     element: (
  //       <PrivateRoute>
  //         <DashboardLayout />
  //       </PrivateRoute>
  //     ),
  //     children: [
  //       {
  //         index: true,
  //         element: <Profile />,
  //       },

  //     ],
  //   },
]);
