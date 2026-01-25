import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";

// Standard Components
import NotificationBanner from "./components/Header/Head";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import ChefDirectory from "./components/ChefSearch";
import ChefDetails from "./components/ChefDetailsPage";
import ChefFormFormik from "./components/ChefRegistration/Register.jsx";

// Lazy Loaded Components
const Hom = lazy(() => import("./components/home/Hom"));
const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const ChefConnection = lazy(() => import("./components/ChefConection/ChefConnection"));
const Month = lazy(() => import("./components/CookForAmonth/Month"));
const OneTime = lazy(() => import("./components/OneTimeCook/OneTime"));
const Chef = lazy(() => import("./components/Chefforparty/Chef"));
const Testi = lazy(() => import("./components/Testimonial/Testi"));
const Career = lazy(() => import("./components/Career/Career"));
const Blog = lazy(() => import("./components/Blog/Blog"));
const Investor = lazy(() => import("./components/Investor/Invest"));

// 1. Create a "Layout" component
// This renders the consistent parts of your page (Nav, Footer) once,
// and uses <Outlet /> to swap the content in the middle.
const AppLayout = () => {
  return (
    <div className="app-container">
      <NotificationBanner />
      <Navbar />

      {/* Suspense handles the loading state for whichever child route is active */}
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Outlet />
      </Suspense>

      <Footer />
    </div>
  );
};

// 2. Define routes using the Data Router object structure
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // The layout wraps all children
    errorElement: <div>Something went wrong!</div>, // Catch errors gracefully
    children: [
      { index: true, element: <Hom /> }, // "index: true" means this is the default "/" page
      { path: "about", element: <About /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },
      { path: "join-chefkart", element: <ChefConnection /> },
      { path: "cook-for-month", element: <Month /> },
      { path: "one-time-cook", element: <OneTime /> },
      { path: "chef-for-party", element: <Chef /> },
      { path: "testimonial", element: <Testi /> },
      { path: "career", element: <Career /> },
      { path: "investor-relation", element: <Investor /> },
      { path: "chef-search", element: <ChefDirectory /> },
      { path: "chef/:id", element: <ChefDetails /> },
      { path: "register", element: <ChefFormFormik /> },
    ],
  },
]);

// 3. The App component simply provides the router
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;