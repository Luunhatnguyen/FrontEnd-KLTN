import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import { v4 as uuidv4 } from "uuid";
import WOW from "wowjs";
import NumberFormat from "react-number-format";
import pageTitle5 from "../image/background/page-title-5.jpg";
import PreLoader from "../Components/PreLoader";
import MessageSnackbar from "../Components/MessageSnackbar";
import cookies from "react-cookies";
import { Form } from "react-bootstrap";
import { UserContext } from "../App";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function Booking1(props) {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [userff, setUser] = useState([]);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [tinh, setTinh] = useState("");
  const [huyen, setHuyen] = useState("");
  const [accept, setAccept] = useState(false);
  const [user, dispatch] = useContext(UserContext);

  const userInfo = () => {
    props.userInfo(id, name, number, email, tinh, huyen);
  };

  useEffect(() => {
    let loadUser = async () => {
      setUser(user);
      setName(`${user.first_name} ${user.last_name}`);
      setNumber(user.phone);
      setEmail(user.email);
      setId(user.id);
    };

    loadUser();
  }, []);

  // State of message
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [typeMsg, setTypeMsg] = useState("");
  const [titleMsg, setTitleMsg] = useState("");

  const handleMessageClose = () => {
    setOpen(false);
  };

  const createMessage = (title, msg, type) => {
    setMsg(msg);
    setTitleMsg(title);
    setTypeMsg(type);
  };
  const goToTop = () => {
    window.scrollTo({
      top: 165,
      behavior: "smooth",
    });
  };
  return (
    <>
      {/* <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle5})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Customer information</h1>
            <p>Explore your next great journey</p>
          </div>
        </div>
      </section> */}

      <section className="booking-section booking-process-1">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="booking-process-content mr-20">
                <ul className="process-label clearfix">
                  <li className="current">
                    <span>1.</span>
                    {t("tthkhoa")}
                  </li>
                  <li>
                    <span>2.</span>
                    {t("thanhtoanhoa")}
                  </li>
                  <li>
                    <span>3.</span>
                    {t("xacnhan1")}
                  </li>
                </ul>
                <div className="inner-box">
                  <h3 style={{ color: "#f15a24" }}>{t("tthk")}</h3>
                  <form className="processing-form">
                    <div className="row clearfix">
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 column"
                        style={{ marginTop: "-15px" }}
                      >
                        <div className="form-group">
                          <label>{t("hotenhk")} *</label>
                          <input
                            id="room"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 column"></div>
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 column"
                        style={{ marginTop: "-30px" }}
                      >
                        <div className="form-group">
                          <label>{t("phone")}*</label>
                          <input
                            id="room"
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 column"
                        style={{ marginTop: "-30px" }}
                      >
                        <div className="form-group">
                          <label>{t("email")} *</label>
                          <input
                            id="children"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="notes-container" style={{ marginTop: "-45px" }}>
          <div>
            <p
              className="info-header"
              style={{ marginTop: "5%", color: "#f15a24" }}
            >
              {t("dieukhoan")} &amp; {t("luuy")}
            </p>
            <p className="txt">
              (*) {t("qkemail")}
              <span className="high-light" style={{ color: "#f15a24" }}>
                {" "}
                {t("bill")} 60 phút{" "}
              </span>
              {t("trungchuyen")}
            </p>
            <p className="txt">(*){t("xacnhan")}</p>
            <p className="txt">
              (*){t("qkkhong")}
              <span className="high-light" style={{ color: "#f15a24" }}>
                {" "}
                {t("motlan")}{" "}
              </span>
              {t("duynhat")}
            </p>
            <p className="txt">
              (*){t("trungchuyen")}
              <span style={{ color: "#f15a24" }}> 035 4444 899 </span>
              {t("truockhi")}
            </p>
          </div>
        </div>
        <div>
          <Form.Check
            className="info-check"
            type="checkbox"
            label={t("chapnhandk")}
            onClick={() => setAccept(!accept)}
          />
        </div>

        <div className="booking-nav-buttons" style={{ marginTop: " 20px" }}>
          <div className="left-btns">
            <button
              className="theme-btn"
              onClick={() => {
                props.step(-1);
                props.clearSeat();
                goToTop();
              }}
            >
              <i className="fas fa-angle-left" />
              {t("quaylai")}
            </button>
          </div>
          {accept === true && name !== "" && number !== "" && email !== "" ? (
            <div
              className="right-btns"
              onClick={() => {
                props.step(1);
                userInfo();
                goToTop();
              }}
            >
              <button className="theme-btn confirm">
                {t("tieptuc")}
                <i className="fas fa-angle-right" />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <MessageSnackbar
          handleClose={handleMessageClose}
          isOpen={open}
          msg={msg}
          type={typeMsg}
          title={titleMsg}
        />
      </section>
    </>
  );
}
