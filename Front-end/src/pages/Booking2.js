import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import API, { authApi, endpoints } from "../configs/API";
import PreLoader from "../Components/PreLoader";
import WOW from "wowjs";
import Header from "../Layout/Header";
import pageTitle5 from "../assets/img/istockphoto-485916538-1024x1024.jpg";
import logoZaloPay from "../image/card/logo-zalopay.svg";
import MessageSnackbar from "../Components/MessageSnackbar";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { memo } from "react";
import {
  PayPalButtons,
  BraintreePayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function Booking2(props) {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };

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

  const [seat, setSeat] = useState(props.seat);
  const [nameSeat, setNameSeat] = useState([]);
  const [nameGara, setNameGara] = useState([]);
  const [timeTable, setTimeTable] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let loadElement = async () => {
      let res = await API.get(endpoints["garages-detail"](props.placeFrom));
      setNameGara(res.data);

      let ress = await API.get(
        endpoints["time-table-detail"](props.timeTableID)
      );
      setTimeTable(ress.data);
    };

    loadElement();
  }, []);

  useEffect(() => {
    let e = [];
    let load = async () => {
      seat.forEach(async (c) => {
        let res = await API.get(endpoints["seat-detail"](c));
        e.push(res.data);
      });
    };
    load();
    setNameSeat(e);
  }, []);

  const formatPrice = (price) => {
    var str = price.toString();
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };
  const timeTable1 = timeTable;
  const pay = async (type) => {
    const customerID = props.userInfo.id;
    const name = props.userInfo.name;
    const email = props.userInfo.email;
    const phone = props.userInfo.number;
    const timeTable = props.timeTableID;
    
    const amount = props.total;
    if (window.confirm("Bạn có chắc muốn thanh toán không?") == true) {
      let booking = await API.post(endpoints["booking"], {
        headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
        customerID: customerID,
        name: name,
        phone: phone,
        timeTable: timeTable,
      });
      console.log(booking);

      let res = await API.get(endpoints["last-booking"]);
      let id = res.data.id;

      if (type == "momo") {
        let bookinghistorys = await API.post(endpoints["booking-history"], {
          headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
          bookingID: id,
          statusID: 3,
        });

        if (bookinghistorys.status === 201) {
          let momo = await API.post(endpoints["momo"], {
            headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
            amount: amount,
            name: name,
            orderId: id,
            historyId: bookinghistorys.data.id,
          });
          if (momo.status === 200) {
            window.location.replace(momo.data.payUrl);
          }
        } else {
          alert("Xin lỗi! Đã có lỗi xảy ra, xin hãy thử lại sau!");
        }
      } else if (type == "offline") {
        seat.map(async (c) => {
          let bookingdetails = await API.post(endpoints["bookingdetails"], {
            headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
            bookingID: id,
            from_garage: nameGara.id,
            seatID: c,
          });
        });
        let bookinghistorys = await API.post(endpoints["booking-history"], {
          headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
          bookingID: id,
          statusID: 1,
        });
        const sendMailBooking = await authApi().post(
          endpoints["send_mail_booking"],
          {
            headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
            name: name,
            busRoute:
              props.station.stationFrom + " - " + props.station.stationTo,
            timeTable: timeTable1.time + timeTable1.date,
            NumOfSeat: props.seat.length,
            Seat: nameSeat.map((c) => c.location + ", "),
            BoardingPoint: nameGara.address,
            Total: props.total,
            email: email,
          }
        );
        console.log(booking.data);
        console.log(sendMailBooking.data);
        if (bookinghistorys.status === 201) {
          alert("Bạn đã thanh toán thành công!");
          setOpen(true);
          createMessage("Thành công", "Bạn đã thanh toán thành công!", "success");
          navigate("/route-detail/booking-3");
        } else {
          setOpen(true);
          createMessage("Lỗi", "Rất tiếc! Thanh toán đã thất bại", "error");
          navigate("/");
        }
      }
    } else {
      alert("Bạn đã huỷ thanh toán!");
      navigate("/");
    }
  };
  const [visible, setVisible] = useState(0);
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
            <h1>Payment</h1>
            <p>Explore your next great journey</p>
          </div>
        </div>
      </section> */}

      <section className="booking-section booking-process-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div
              className="col-lg-12 col-md-12 col-sm-12 content-side"
              // style={{ marginTop: "150px" }}
            >
              <div className="booking-process-content mr-20">
                <ul className="process-label clearfix">
                  <li>
                    <span>1.</span> {t("tthkhoa")}
                  </li>
                  <li className="current">
                    <span>2.</span> {t("thanhtoanhoa")}
                  </li>
                  <li>
                    <span>3.</span>{t("xacnhan1")}
                  </li>
                </ul>
                <div className="inner-box">
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 column">
                      {/* <div className="form-group">
                                                    <label>Ghi chú</label>
                                                    <textarea id="message"
                                                    value={note} onChange={(event) => setNote(event.target.value)} />
                                                </div> */}
                      <form className="processing-form">
                        <div className="row clearfix">
                          <div
                            className="col-lg-6 col-md-6 col-sm-12 column"
                            style={{ marginTop: "-20px" }}
                          >
                            <div className="form-group">
                              <label> {t("thongtinchuyen")}</label>
                              <label class="form-control">
                                {props.station.stationFrom} ⇒{" "}
                                {props.station.stationTo}
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 column"></div>
                          <div
                            className="col-lg-6 col-md-6 col-sm-12 column"
                            style={{ marginTop: "-20px" }}
                          >
                            <div className="form-group">
                              <label> {t("slghe")}</label>
                              <label class="form-control">
                                {" "}
                                {props.seat.length}
                              </label>
                            </div>
                          </div>
                          <div
                            className="col-lg-6 col-md-6 col-sm-12 column"
                            style={{ marginTop: "-20px" }}
                          >
                            <div className="form-group">
                              <label> {t("time")}:</label>
                              <label class="form-control">
                                {timeTable.time} {t("thongtinchuyen")} {t("ngay")}{" "}
                                <Moment format="DD/MM/YYYY">
                                  {timeTable.date}
                                </Moment>
                              </label>
                            </div>
                          </div>
                          <div
                            className="col-lg-6 col-md-6 col-sm-12 column"
                            style={{ marginTop: "-20px" }}
                          >
                            <div className="form-group">
                              <label> {t("soghe")}:</label>
                              <label class="form-control">
                                {nameSeat.map((c) => c.location + ", ")}
                              </label>
                            </div>
                          </div>
                          <div
                            className="col-lg-6 col-md-6 col-sm-12 column"
                            style={{ marginTop: "-20px" }}
                          >
                            <div className="form-group">
                              <label> {t("diemlenxe")}:</label>
                              <label class="form-control">
                                {nameGara.address}
                              </label>
                            </div>
                          </div>
                          <div
                            className="col-lg-6 col-md-6 col-sm-12 column"
                            style={{ marginTop: "-20px" }}
                          >
                            <div className="form-group">
                              <label> {t("tongtien")}</label>
                              <label
                                class="form-control"
                                style={{ color: "#f15a24" }}
                              >
                                {formatPrice(props.total)}
                                <sup>₫</sup>
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="payment-option">
                    <h4
                      style={{
                        color: "#00613d",
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "700",
                        marginTop: "25px",
                      }}
                    >
                       {t("choncach")}
                    </h4>
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 column">
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="payment"
                            name="radio-buttons-group"
                            // value={payments}
                            // onChange={(event) => setPayments(event.target.value)}
                          >
                            <FormControlLabel
                              value="2"
                              onClick={() => setVisible(1)}
                              control={<Radio />}
                              label= {t("thanhtoantq")}
                            />
                            <FormControlLabel
                              value="1"
                              onClick={() => setVisible(2)}
                              control={<Radio />}
                              label={
                                <>
                                   Ví {" "}
                                  <img
                                    style={{ width: "30px" }}
                                    src="https://developers.momo.vn/v2/images/logo.svg"
                                    alt=""
                                  />
                                </>
                              }
                            />
                            {/* <FormControlLabel
                              value="3"
                              control={<Radio />}
                              label={
                                <>
                                  Ví {" "}
                                  <img src={logoZaloPay} alt="" />
                                </>
                              }
                            /> */}
                          </RadioGroup>
                        </FormControl>
                      </div>
                      {/* begin paypal */}
                      {/* https://www.paypal.com/mep/dashboard
                      account: huynguyenvo2001@gmail.com */}
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AZKjoAaNSQCwj_rKQexTsSDCPkAPreQwIqHRoc5F27nNZ50Znbv8wauLkfPvf8hB4-VFZg6RHvHMuzyO",
                        }}
                      >
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: "0.1",
                                    currency: "USD",
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                              const name = details.payer.name.given_name;
                              alert(`Transaction completed by ${name}`);
                            });
                          }}
                        />
                      </PayPalScriptProvider>

                      {/* <!-- Include the PayPal JavaScript SDK --> */}

                      {/* End paypal */}
                      <div className="col-lg-12 col-md-12 col-sm-12 column">
                        <div className="form-group message-btn clearfix form-next">
                          <button
                            type="submit"
                            className="theme-btn"
                            onClick={() => {
                              props.step(-1);
                              goToTop();
                            }}
                          >
                            <i className="fas fa-angle-left" />
                            {t("quaylai")} 
                          </button>
                          {visible === 1 && (
                            <button
                              type="submit"
                              className="theme-btn1 confirm"
                              onClick={() => pay("offline")}
                              style={{  background: '#00613d !important'}}
                            >
                               {t("thanhtoan")}
                              <i className="fas fa-angle-right" />
                            </button>
                          )}
                          {visible === 2 && (
                            <button 
                              type="submit"
                              className="theme-btn1 confirm"
                              onClick={() => pay("momo")}
                              style={{  background: "#00613d !important"}}
                            >
                                {t("momo")}
                              <i className="fas fa-angle-right" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default Booking2;
