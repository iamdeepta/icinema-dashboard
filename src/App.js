import React, { Suspense, lazy } from "react";
//import Home from "./pages/home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
//import Catalog from "./pages/catalog/Catalog";

const Home = lazy(() => import("./pages/home/Home"));
const Catalog = lazy(() => import("./pages/catalog/Catalog"));
const Items = lazy(() => import("./pages/items/Items"));
const Users = lazy(() => import("./pages/users/Users"));
const Reviews = lazy(() => import("./pages/reviews/Reviews"));
const SignOut = lazy(() => import("./pages/signout/SignOut"));

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/signout" ? (
        <>
          <Header />
          <Sidebar />
        </>
      ) : null}

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/add-item" element={<Items />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
