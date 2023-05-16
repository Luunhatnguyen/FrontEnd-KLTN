import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Layout/Home";
import { createContext, useEffect, useReducer, useState } from "react";
import myReducer from "./Reducers/MyReducer";
import cookies from "react-cookies";
import FbLogin from "./Components/Facebook";
import Google from "./Components/Google";
import TripList from "./pages/TripList";
import TourDetail from "./pages/TripDetail";
import Articals from "./pages/Garages";
import ArticalDetails from "./pages/GarageDetails";
import Booking1 from "./pages/Booking1";
import Booking2 from "./pages/Booking2";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Page404 from "./pages/Page404";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import LoginCarrier from "./pages/LoginCarrier";
import AdminCarrier from "./pages/AdminCarrier";
import AddArtical from "./pages/AddGarage";
import AddBus from "./pages/AddBus"; //moi
import TourDelete from "./pages/ManageBus";
import Booking3 from "./pages/Booking3";
import MomoReturn from "./pages/MoMoReturn";
import ScrollToTop from "./Components/ScrollToTop";
import Footer2 from "./Layout/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterCarrier from "./pages/RegisterCarrier";
import Routed from "./pages/Route";
import Bill from "./pages/Bill";
import ReactGa from "react-ga";
import ManageCarrier from "./pages/ManageCarrier";
import ManageBusDetail from "./pages/ManageBusDetail";
export const UserContext = createContext();

function App() {
  const [user, dispatch] = useReducer(myReducer, cookies.load("current_user"));
  useEffect(() => {
    ReactGa.initialize("G-H4HLY1Y7CJ");
    ReactGa.pageview("/");
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bill" element={<Bill />} />
          <Route exact path="/routed/" element={<Routed />} />
          <Route exact path="/route-list/" element={<TripList />} />
          <Route
            exact
            path="/route-detail/:routerId/"
            element={<TourDetail />}
          />
          <Route
            exact
            path="/route-detail/:routerId/booking-1"
            element={<Booking1 />}
          />
          <Route
            exact
            path="/route-detail/:routerId/booking-2"
            element={<Booking2 />}
          />
          <Route exact path="/route-detail/booking-3" element={<Booking3 />} />
          <Route path="*" element={<Page404 />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about-us" element={<About />} />
          <Route path="/fblogin/" element={<FbLogin />} />
          <Route path="/google/" element={<Google />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/garage" element={<Articals />} />
          <Route
            exact
            path="/garage-details/:garagesId"
            element={<ArticalDetails />}
          />
          <Route path="/loginCarrier" element={<LoginCarrier />} />
          <Route path="/carrier" element={<AdminCarrier />} />
          <Route path="/addTrip" element={<AddArtical />} />
          <Route path="/addBus" element={<AddBus />} />
          <Route path="/manageBus/:carrierId/" element={<TourDelete />} />
          <Route path="/manageCarrier" element={<ManageCarrier />} />
          <Route
            path="/manageBusDetail/:garagesId/"
            element={<ManageBusDetail />}
          />
          <Route path="/MomoReturn" element={<MomoReturn />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/registerCarrier" element={<RegisterCarrier />} />
        </Routes>
        <ScrollToTop />
        <Footer2 />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
