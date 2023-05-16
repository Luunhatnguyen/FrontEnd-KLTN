import React, { useEffect, useState, useContext, useRef } from "react";
import Api, { endpoints } from "../configs/API";
import { Col, Form, Row } from "react-bootstrap";
import * as ImCon from "react-icons/im";
import { makeStyles } from "@mui/styles";
import pageTitle6 from "../assets/img/page-title-9.jpg";
import Header from "../Layout/Header";
import { UserContext } from "../App";
import { FaMoneyBillWaveAlt, FaBus } from "react-icons/fa";
import NumberFormat from "react-number-format";
import { GoVerified } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";
import { BsFillPeopleFill } from "react-icons/bs";
import travellogo from "../assets/img/video-1.jpg";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Link } from "react-router-dom";
function Bill(props) {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  const [bill, setBill] = useState([]);
  const [user, dispatch] = useContext(UserContext);

  const [cName, setcName] = useState("wrapper list");
  if (user != null) {
    useEffect(() => {
      let loadBill = async () => {
        let res = await Api.get(endpoints["booking-history-by-user"](user.id));
        setBill(res.data);
        console.log(res.data);
      };

      loadBill();
    }, []);
  }
  let routes = <></>;
  //  CHÚ Ý LỌC CÓ HAY KHÔNG
  if (user != null) {
    if (bill != 0) {
      routes = (
        <>
          <div className="tour-list-content list-item">
            {bill.map((t) => (
              <ArticalItem key={t.id} bill={t} />
            ))}
          </div>
        </>
      );
    } else {
      routes = (
        <>
          <div className="tour-list-content list-item">
            <Link
              to="/login"
              style={{
                fontSize: "30px",
                padding: "125px",
              }}
            >
              {t("cchd")}
            </Link>
          </div>
        </>
      );
    }
  } else {
    routes = (
      <>
        <div className="tour-list-content list-item">
          <Link
            to="/login"
            style={{
              fontSize: "30px",
              padding: "125px",
            }}
          >
            {t("dangnhapdexem")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle6})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>{t("bill")}</h1>
            <p>{t("hoadonqk")}</p>
          </div>
        </div>

        <div></div>
      </section>
      <section className="tours-page-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className={cName}>{routes}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Bill;

function ArticalItem(props) {
  const { t } = useTranslation("translation");
  const [show, toggleShow] = useState(true);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div
      className="tour-block-two wow fadeInUp animated animated"
      data-wow-delay="00ms"
      data-wow-duration="1500ms"
    >
      <div>
        <h3>{t("vedientu")}</h3>
        <p>
          {t("taive")} {}{" "}
          <span style={{ fontWeight: 800 }}>
            {" "}
            {props.bill.customerID.email}
          </span>{" "}
          {t("tuhoprac")}
        </p>
      </div>
      <div className="inner-box">
        <figure className="image-box">
          <img
            style={{ width: "190px", height: "227px" }}
            src={props.bill.timeTable.busRouteID.routeID.image}
            alt="ImageTrip"
          />
        </figure>

        <div className="content-box">
          <Row>
            <Col xs={8} style={{ display: "inline-flex" }}>
              <h3>
                <p style={{ fontWeight: 800 }}>
                  {props.bill.timeTable.busRouteID.routeID.city_from.name} -{" "}
                  {""}
                  {props.bill.timeTable.busRouteID.routeID.to_garage.name}
                </p>
              </h3>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <h3
                className="gJvXJw color--positive"
                style={{ fontSize: "18px", textTransform: "uppercase" }}
              >
                {t("daphathanhve")}
              </h3>
              <GoVerified className="color--positive" />
            </Col>
          </Row>

          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <FaMoneyBillWaveAlt />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                <span style={{ fontWeight: 800 }}>{t("gia")} : </span>
                <NumberFormat
                  value={props.bill.timeTable.busRouteID.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  style={{ color: "green", fontWeight: 800, fontSize: "18px" }}
                />
                <span style={{ color: "green", fontWeight: 800 }}> đ </span>
              </p>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                <span style={{ fontWeight: 800 }}>{t("searchtime")} :</span>{" "}
                {props.bill.timeTable.time}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImLocation />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                <span style={{ fontWeight: 800 }}>{t("diemlenxe")} :</span>{" "}
                {props.bill.timeTable.busRouteID.routeID.point}
              </p>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                <span style={{ fontWeight: 800 }}>{t("ngaykhoihanh")} :</span>{" "}
                {props.bill.timeTable.date}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <FaBus />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                <span style={{ fontWeight: 800 }}>{t("typebus")} :</span>{" "}
                {props.bill.timeTable.busRouteID.busID.typeBusID.name}
              </p>
            </Col>
            {/* <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Ngày khởi hành: {props.bill.timeTable.date}
              </p>
            </Col> */}
          </Row>
          <Row>
            <Col xs={8} style={{ display: "inline-flex" }}></Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <p
                style={{ marginTop: "-3px", marginLeft: "5px" }}
                onClick={() => toggleShow(!show)}
              >
                {show ? "Chi tiết hóa đơn" : "Chi tiết hóa đơn"}
              </p>
              <FiChevronDown />
            </Col>
          </Row>
          <Row>
            {!show && (
              <>
                <Row>
                  <h4>{t("dshanhkhach")}</h4>
                  <Col xs={4} style={{ display: "inline-flex" }}>
                    <BsFillPeopleFill />
                    <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                      <span style={{ fontWeight: 800 }}>{t("tenkh")} :</span>{" "}
                      {props.bill.name}
                    </p>
                  </Col>
                  <Col xs={4} style={{ display: "inline-flex" }}>
                    <ImCon.ImMobile />
                    <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                      <span style={{ fontWeight: 800 }}> {t("phone")} :</span>{" "}
                      {props.bill.phone}
                    </p>
                  </Col>
                  <Col xs={4} style={{ display: "inline-flex" }}>
                    <button
                      style={{
                        marginTop: "-3px",
                        marginLeft: "5px",
                        backgroundColor: "#ff7c5b",
                        padding: "10px",
                        color: "white",
                      }}
                      onClick={handlePrint}
                    >
                      {t("taixuong")}
                      <FiChevronDown />
                    </button>
                  </Col>
                </Row>
                <div ref={componentRef} className="card-bill">
                  <div class="card-body">
                    <div class="container mb-5 mt-3">
                      <div class="container">
                        <div class="col-md-12">
                          <div class="text-center">
                            <img src={travellogo} alt="ImageLogo" />
                            <p class="pt-2">{t("cty")}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-xl-8">
                            <ul class="list-unstyled">
                              <li class="text-muted">
                                Tới:{" "}
                                <span style={{ color: "#8f8061 " }}>
                                  {props.bill.name}
                                </span>
                              </li>
                              <li class="text-muted">
                                <i class="fas fa-phone"></i> {props.bill.phone}
                              </li>
                            </ul>
                          </div>
                          <div class="col-xl-4">
                            <p class="text-muted">{t("bill")}</p>
                            <ul class="list-unstyled">
                              <li class="text-muted">
                                <i
                                  class="fas fa-circle"
                                  style={{ color: "#8f8061" }}
                                ></i>{" "}
                                <span class="fw-bold">Giờ: </span>{" "}
                                {props.bill.timeTable.time}
                              </li>
                              <li class="text-muted">
                                <i
                                  class="fas fa-circle"
                                  style={{ color: "#8f8061" }}
                                ></i>{" "}
                                <span class="me-1 fw-bold">
                                  {t("ngaykhoihanh")} :
                                </span>
                                <span class="badge bg-warning text-black fw-bold">
                                  {props.bill.timeTable.date}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="row my-2 mx-1 justify-content-center">
                          <div class="col-md-2 mb-4 mb-md-0">
                            <div
                              class="
                        bg-image
                        ripple
                        rounded-5
                        mb-4
                        overflow-hidden
                        d-block
                        "
                              data-ripple-color="light"
                            >
                              <img
                                src={
                                  props.bill.timeTable.busRouteID.routeID.image
                                }
                                class="w-100"
                                height="100px"
                                alt="Elegant shoes and shirt"
                              />
                              <a href="#!">
                                <div class="hover-overlay">
                                  <div
                                    class="mask"
                                    style={{
                                      backgroundColor:
                                        "hsla(0, 0%, 98.4%, 0.2)",
                                    }}
                                  ></div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div class="col-md-7 mb-4 mb-md-0">
                            <p class="fw-bold">
                              {" "}
                              {
                                props.bill.timeTable.busRouteID.routeID
                                  .city_from.name
                              }{" "}
                              - {""}
                              {
                                props.bill.timeTable.busRouteID.routeID
                                  .to_garage.name
                              }
                            </p>
                            <p class="mb-1">
                              <span class="text-muted me-2">
                                {t("diemlenxe")}:
                              </span>
                              <span>
                                {" "}
                                {props.bill.timeTable.busRouteID.routeID.point}
                              </span>
                            </p>
                            <p>
                              <span class="text-muted me-2">
                                {t("typebus")}:
                              </span>
                              <span>
                                {" "}
                                {
                                  props.bill.timeTable.busRouteID.busID
                                    .typeBusID.name
                                }
                              </span>
                            </p>
                          </div>
                          <div class="col-md-3 mb-4 mb-md-0">
                            <h5 class="mb-2">
                              <span class="align-middle">
                                <NumberFormat
                                  value={props.bill.timeTable.busRouteID.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  style={{
                                    color: "green",
                                    fontWeight: 800,
                                    fontSize: "18px",
                                  }}
                                />
                                <span
                                  style={{ color: "green", fontWeight: 800 }}
                                >
                                  {" "}
                                  đ{" "}
                                </span>
                              </span>
                            </h5>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-xl-8"></div>
                          <div class="col-xl-3">
                            <ul class="list-unstyled"></ul>
                            <p class="text-black float-start">
                              <span class="text-black me-3">
                                {" "}
                                {t("tongtien")}
                              </span>
                              <span style={{ fontSize: "25px" }}>
                                <NumberFormat
                                  value={props.bill.timeTable.busRouteID.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  style={{
                                    color: "green",
                                    fontWeight: 800,
                                    fontSize: "18px",
                                  }}
                                />
                                <span
                                  style={{ color: "green", fontWeight: 800 }}
                                >
                                  {" "}
                                  đ{" "}
                                </span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
}
