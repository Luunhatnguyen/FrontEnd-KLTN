import React, { useEffect, useRef, useState, useContext } from "react";
import API, { endpoints } from "../configs/API";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WOW from "wowjs";
import { UserContext } from "../App";
import axios from "axios";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { Col, Form, Row } from "react-bootstrap";
import Header from "../Layout/Header";
import pageTitle9 from "../assets/img/14926f75f7d51ac044ccc0847cfb262f.png";
import shape16 from "../image/shape/shape-16.png";
import shape17 from "../image/shape/shape-17.png";
import MessageSnackbar from "../Components/MessageSnackbar";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import {
  PayPalButtons,
  BraintreePayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
export default function Register(props) {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  const navigate = useNavigate();
  const image = useRef();
  const [nameCarrier, setNameCarrier] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [garageID, setGarageID] = useState("");
  const [optionID, setOptionID] = useState("");
  const [user, dispatch] = useContext(UserContext);
  const [garage, setGarage] = useState([]);
  const [hireoption, setHireOption] = useState([]);
  console.log(user);
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
  // End message
  useEffect(() => {
    let loadArticals = async () => {
      try {
        let res = await API.get(endpoints["garages"]);
        setGarage(res.data);
        console.log(res.data);
        let res1 = await API.get(endpoints["hireoptions"]);
        setHireOption(res1.data);
        console.log(res1.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadArticals();
  }, []);

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  const registerUser = async () => {
    let formData = new FormData();
    formData.append("active", "1");
    formData.append("nameCarrier", nameCarrier);
    formData.append("status_code", "PENDING");
    formData.append("garageID", garageID);
    formData.append("optionID", optionID);
    formData.append("userID", user.id);
    formData.append("image", image.current.files[0]);
    //thêm bài viết
    await axios({
      method: "post",
      url: "http://localhost:8000/carrier/",
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
        setOpen(true);
        createMessage(
          "Thành công",
          "Bạn đã đăng ký nhà xe thành công!",
          "success"
        );
        alert(
          "Bạn đã đăng ký tài khoản nhà xe thành công!. Vui lòng chờ thời gian admin xác nhận"
        );
        navigate("/loginCarrier");
      })
      .catch((error) => {
        console.log(error);
        setOpen(true);
        createMessage("Lỗi", "Đăng ký nhà xe thất bại !!!", "error");
      });
    // setNameCarrier("");
    // setStatusCode("");
    // setGarageID("");
    // setOptionID("");
  };

  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle9})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>{t("registercarrier")}</h1>
            <p>{t("colab")}</p>
          </div>
        </div>
      </section>
      <section className="register-section sec-pad">
        <div className="anim-icon">
          <div
            className="icon anim-icon-1"
            style={{ backgroundImage: `url(${shape16})` }}
          />
          <div
            className="icon anim-icon-2"
            style={{ backgroundImage: `url(${shape17})` }}
          />
        </div>
        <div className="auto-container">
          <div className="inner-box">
            <div
              className="sec-title centred wow fadeInUp animated animated"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <p>{t("registercarrier")}</p>
              <h2>{t("colab")}</h2>
            </div>
            <div className="form-inner">
              <h3>{t("loginwith")}</h3>
              <ul className="social-links clearfix">
                <li>
                  <Link to="/">
                    <span>Đăng Nhập với Facebook _</span>
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>{t("loginwithGG")}</span>
                    <i className="fab fa-google-plus-g" />
                  </Link>
                </li>
              </ul>
              <div className="text">
                <span>{t("hoac")}</span>
              </div>

              <div className="row clearfix">
                <RegisterForm
                  class="col-lg-12 col-md-12 col-sm-12 column"
                  id="text"
                  label={t("namecarrier")}
                  type="text"
                  value={nameCarrier}
                  change={(event) => setNameCarrier(event.target.value)}
                />
                <div className="form-group" style={{ width: "95%", height: "60px" }}>
                  <label>Image</label>
                  <input
                    className="form-control"
                    type="file"
                    id="image"
                    ref={image}
                  />
                </div>
                <Form.Group className="form-group">
                  <label>Chọn garage</label>
                  <Form.Select
                    value={garageID}
                    onChange={(e) => setGarageID(e.target.value)}
                    style={{ width: "95%", height: "60px" }}
                  >
                    <option value="0" selected="selected">
                      Chọn garage
                    </option>
                    {garage.map((c) => {
                      return <option value={c.id}>{c.name}</option>;
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="form-group">
                  <label>{t("option")}</label>
                  <Form.Select
                    value={optionID}
                    onChange={(e) => setOptionID(e.target.value)}
                    style={{ width: "95%", height: "60px" }}
                  >
                    <option value="0" selected="selected">
                      Chọn option
                    </option>
                    {hireoption.map((c) => {
                      return (
                        <option value={c.id}>
                          {c.description} - Số tiền:{c.fee}{" "}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <div className="col-lg-12 col-md-12 col-sm-12 column">
                  <div className="form-group message-btn">
                    <button
                      type="submit"
                      className="theme-btn"
                      onClick={registerUser}
                    >
                      {t("register")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="other-text">
                {t("haveaccount")} <Link to="/login"> {t("login")}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MessageSnackbar
        handleClose={handleMessageClose}
        isOpen={open}
        msg={msg}
        type={typeMsg}
        title={titleMsg}
      />
    </>
  );
}

function RegisterForm(props) {
  {
    return (
      <>
        <div className={props.class}>
          <div className="form-group">
            <label>{props.label}</label>
            <input
              value={props.value}
              type={props.type}
              id={props.id}
              onChange={props.change}
              required
            />
          </div>
        </div>
      </>
    );
  }
}
