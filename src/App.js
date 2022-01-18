import React, { Suspense, lazy, useContext } from "react";
//import Home from "./pages/home/Home";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
//import CatalogEdit from "./components/CatalogEdit";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "./context/authContext/AuthContext";
//import Catalog from "./pages/catalog/Catalog";

const Home = lazy(() => import("./pages/home/Home"));
const Catalog = lazy(() => import("./pages/catalog/Catalog"));
const Items = lazy(() => import("./pages/items/Items"));
const Users = lazy(() => import("./pages/users/Users"));
const Reviews = lazy(() => import("./pages/reviews/Reviews"));
const CatalogEdit = lazy(() => import("./pages/catalog/CatalogEdits"));
const AddCategory = lazy(() => import("./pages/addCategory/AddCategories"));
const Category = lazy(() => import("./pages/category/Category"));
const CategoryEdit = lazy(() => import("./pages/category/CategoryEdits"));
const SignOut = lazy(() => import("./pages/signout/SignOut"));

const App = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {pathname !== "/signout" ? (
          <>
            <Header />
            <Sidebar />
          </>
        ) : null}
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/signout" />}
          />
          {/* {user && (
            <> */}
          <Route
            exact
            path="/catalog"
            element={user ? <Catalog /> : <Navigate to="/signout" />}
          />
          <Route
            exact
            path="/add-item"
            element={user ? <Items /> : <Navigate to="/signout" />}
          />
          <Route
            exact
            path="/add-category"
            element={user ? <AddCategory /> : <Navigate to="/signout" />}
          />
          <Route
            exact
            path="/category"
            element={user ? <Category /> : <Navigate to="/signout" />}
          />
          <Route
            exact
            path="/users"
            element={user ? <Users /> : <Navigate to="/signout" />}
          />
          <Route
            exact
            path="/reviews"
            element={user ? <Reviews /> : <Navigate to="/signout" />}
          />

          <Route
            exact
            path="/edit-catalog/:id"
            element={user ? <CatalogEdit /> : <Navigate to="/signout" />}
          />
          <Route
            exact
            path="/edit-category/:id"
            element={user ? <CategoryEdit /> : <Navigate to="/signout" />}
          />
          {/* </>
          )} */}
          <Route
            exact
            path="/signout"
            element={!user ? <SignOut /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
