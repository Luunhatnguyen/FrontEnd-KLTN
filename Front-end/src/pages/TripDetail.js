import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import cookies from "react-cookies";
import WOW from "wowjs";
import { Link } from "react-router-dom";
import advice1 from "../assets/img/quynhon.jpg";
import MessageSnackbar from "../Components/MessageSnackbar";
import Item from "../Components/Item";
import Booking1 from "./Booking1";
import Booking2 from "./Booking2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { UserContext } from "../App";
import Header from "../Layout/Header";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
export default function TourDetail(props) {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [commentChange, setCommentChange] = useState(0);
  const { routerId } = useParams();
  const [user, dispatch] = useContext(UserContext);
  const [cName, setcName] = useState("wrapper list");

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
    new WOW.WOW({ live: false }).init();
  }, []);

  /* Handle Comment Function */
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const addRating = async (event, newValue) => {
    if (user != null) {
      if (window.confirm("Bạn xác nhận đánh giá route này ?") === true) {
        try {
          let res = await API.post(
            endpoints["rating"](routerId),
            {
              rating: newValue,
            },
            {
              headers: {
                Authorization: `Bearer ${cookies.load("access_token")}`,
              },
            }
          );
          if (res.status === 200 || res.status === 201) {
            setOpen(true);
            createMessage(
              "Thành công",
              "Đánh giá route thành công !",
              "success"
            );
            setRating(newValue);
          }
        } catch (error) {
          setOpen(true);
          createMessage("Lỗi", "Đánh giá route thất bại !", "error");
          console.error(error);
        }
      }
    } else {
      setOpen(true);
      createMessage(
        "Cảnh báo",
        "Hãy đăng nhập để có thể đánh giá !",
        "warning"
      );
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    if (user != null) {
      try {
        let res = await API.post(
          endpoints["add-comment-route"](routerId),
          {
            content: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.load("access_token")}`,
            },
          }
        );

        if (res.status === 201) {
          listComment.push(res.data);
          setListComment(listComment);
          setCommentChange(listComment.length);
          setComment("");

          setOpen(true);
          createMessage(
            "Thành công",
            "Đăng bình luận route thành công !",
            "success"
          );
        }
      } catch (error) {
        console.error(error);
        setOpen(true);
        createMessage("Lỗi", "Đăng bình luận route thất bại !", "error");
      }
    } else {
      setOpen(true);
      createMessage(
        "Cảnh báo",
        "Hãy đăng nhập để có thể bình luận !",
        "warning"
      );
    }
  };

  const [listRouteDetail, setListRouteDetail] = useState([]);
  const [listTypeBus, setListTypeBus] = useState([]);
  const [sortType, setSortType] = useState();
  const [timeState, setTimeState] = useState();
  const [typeBusState, setTypeBusState] = useState([0].value);
  const [check, setCheck] = useState();
  const [seat, setSeat] = useState([]);
  const [placeFrom, setPlaceFrom] = useState();
  const [timeTableID, setTimeTableID] = useState();
  const [step, setStep] = useState(1);
  const [classStep, setClassStep] = useState([
    { class: "current-step" },
    { class: "current-step" },
    { class: "next-step" },
    { class: "empty-step" },
  ]);
  const [classTitle, setClassTitle] = useState([
    { class: "active-title" },
    { class: "active-title" },
    { class: "next-title" },
    { class: "next-title" },
  ]);
  const [classLine, setClassLine] = useState([
    { class: "current-line" },
    { class: "current-line" },
    { class: "next-line" },
  ]);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    number: "",
    email: "",
    tinh: "",
    huyen: "",
  });
  const [total, setTotal] = useState();
  const [station, setStation] = useState({ stationFrom: "", stationTo: "" });
  const [choosen, setChoosen] = useState(1);

  const [q] = useSearchParams();
  const [fromGarage, setFromGarage] = useState();
  const [toGarage, setToGarage] = useState();

  useEffect(() => {
    let loadListRouteDetail = async () => {
      try {
        let res = await API.get(endpoints["time-table"], {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        });

        setListRouteDetail(res.data);

        let router = await API.get(endpoints["route-detail"](routerId), {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        });

        setFromGarage(router.data.city_from.name);
        setToGarage(router.data.to_garage.name);

        let typeBus = await API.get(endpoints["type-bus"], {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        });
        setListTypeBus(typeBus.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadListRouteDetail();
  }, []);

  const setChoosenState = (id) => {
    setChoosen(id);
  };

  const setStationState = (stationFrom, stationTo) => {
    const data = {
      stationFrom: stationFrom,
      stationTo: stationTo,
    };
    setStation(data);
  };

  const setTotalState = (total) => {
    setTotal(total);
  };

  const setUserInfoState = (id, name, number, email, tinh, huyen) => {
    const data = {
      id: id,
      name: name,
      number: number,
      email: email,
      tinh: tinh,
      huyen: huyen,
    };
    setUserInfo(data);
  };

  const setClassStepState = (step) => {
    let newClassStep = classStep;
    for (var i = 0; i < 4; i++) {
      if (i <= step) {
        newClassStep[i].class = "current-step";
      }
      if (i === step + 1) {
        newClassStep[i].class = "next-step";
      }
      if (i > step + 1) {
        newClassStep[i].class = "empty-step";
      }
    }
    setClassStep(newClassStep);
  };

  const setClassTitleState = (step) => {
    let newClassTitle = classTitle;
    for (var i = 0; i < 4; i++) {
      if (i <= step) {
        newClassTitle[i].class = "active-title";
      }
      if (i > step) {
        newClassTitle[i].class = "next-title";
      }
    }
    setClassTitle(newClassTitle);
  };

  const setClassLineState = (step) => {
    let newClassLine = classLine;
    for (var i = 0; i < 3; i++) {
      if (i <= step) {
        newClassLine[i].class = "current-line";
      }
      if (i > step) {
        newClassLine[i].class = "next-line";
      }
    }
    setClassLine(newClassLine);
  };

  const setStepState = (value) => {
    setStep(step + value);
    setClassStepState(step + value);
    setClassTitleState(step + value);
    setClassLineState(step + value);
  };

  const setPlaceFromState = (place) => {
    setPlaceFrom(place);
  };

  const setTimeTableIDState = (id) => {
    setTimeTableID(id);
  };

  const setChecked = (checked) => {
    setCheck(checked);
  };

  const setSeatSubmit = (seatSubmit) => {
    setSeat(seatSubmit);
  };

  const clearSeatSubmit = () => {
    setSeat([]);
  };

  const element = listRouteDetail.filter(
    (c) => c.busRouteID.routeID.id == routerId
  );

  const sortByTypeBus = element.filter(function(c) {
    if (typeBusState === "0" || typeBusState === undefined) {
      return c;
    } else {
      return c.busRouteID.busID.typeBusID.id == typeBusState;
    }
  });

  const sorted = sortByTypeBus.filter(function(c) {
    if (timeState === undefined || timeState === "-1") {
      return c;
    } else {
      const timeStart = parseInt(timeState);
      const timeEnd = parseInt(timeState) + 6;
      return (
        parseInt(c.time.split(":")[0]) > timeStart &&
        parseInt(c.time.split(":")[0]) <= timeEnd
      );
    }
  });

  const sortByType = sorted.sort((a, b) => {
    if (sortType == "0") {
      return 0;
    }
    if (sortType == "asc") {
      return 1;
    }
    if (sortType == "desc") {
      return -1;
    }
  });

  return (
    <>
      <Header />
      <section
        className="page-title style-three"
        style={{ backgroundImage: `url(${advice1})` }}
      >
        <div className="auto-container">
          <div
            className="inner-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h2 style={{ width: "750px" }}>
              {fromGarage} - {toGarage}
            </h2>
          </div>
        </div>
      </section>

      <section className="tour-details">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div
                className="tour-details-content"
                style={{ padding: "20px 0px" }}
              >
                {step === 1 ? (
                  <div>
                    <section
                      className="tours-page-section"
                      style={{ padding: "10px 0px 0px 0px" }}
                    >
                      <div className="auto-container">
                        <div className="row clearfix">
                          <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                            <div className="item-shorting clearfix">
                              <div className="left-column pull-left">
                                <div>
                                  <h3> {t("search")} </h3>
                                </div>
                              </div>
                              <div className="right-column pull-right clearfix">
                                <div className="short-box clearfix">
                                  <FormControl sx={{ m: 0, minWidth: 140 }}>
                                    <InputLabel id="select-sort-label">
                                      {t("gia")}
                                    </InputLabel>
                                    <Select
                                      labelId="select-sort-label"
                                      id="sort-select"
                                      onChange={(e) => {
                                        setSortType(e.target.value);
                                      }}
                                      autoWidth
                                      lable="Sắp xếp theo"
                                      inputProps={{
                                        MenuProps: { disableScrollLock: true },
                                      }}
                                    >
                                      <MenuItem value={"0"}>
                                        {t("gia")}
                                      </MenuItem>
                                      <MenuItem value={"asc"}>
                                        {t("thapdencao")}
                                      </MenuItem>
                                      <MenuItem value={"desc"}>
                                        {t("caodenthap")}
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                                <div
                                  className="menu-box"
                                  style={{ marginRight: "100px" }}
                                >
                                  <FormControl sx={{ m: 0, minWidth: 140 }}>
                                    <InputLabel id="select-sort-label">
                                      {t("typebus")}
                                    </InputLabel>
                                    <Select
                                      labelId="select-sort-label"
                                      id="sort-select"
                                      onChange={(e) => {
                                        setTypeBusState(e.target.value);
                                      }}
                                      autoWidth
                                      lable="Sắp xếp theo"
                                      inputProps={{
                                        MenuProps: { disableScrollLock: true },
                                      }}
                                    >
                                      <MenuItem
                                        style={{ display: "flex" }}
                                        value={"0"}
                                      >
                                        {t("typebus")}
                                      </MenuItem>
                                      {listTypeBus.map((c) => {
                                        return (
                                          <MenuItem
                                            style={{ display: "flex" }}
                                            value={c.id}
                                          >
                                            {c.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div
                                  className="menu-box"
                                  style={{ marginLeft: "25px" }}
                                >
                                  <FormControl sx={{ m: 0, minWidth: 140 }}>
                                    <InputLabel
                                      id="select-sort-label"
                                      value="-1"
                                    >
                                      {t("searchtime")}
                                    </InputLabel>
                                    <Select
                                      labelId="select-sort-label"
                                      id="sort-select"
                                      onChange={(e) => {
                                        setTimeState(e.target.value);
                                      }}
                                      autoWidth
                                      lable="Sắp xếp theo"
                                      inputProps={{
                                        MenuProps: { disableScrollLock: true },
                                      }}
                                    >
                                      <MenuItem value="-1">
                                        {" "}
                                        {t("searchtime")}
                                      </MenuItem>
                                      <MenuItem value="0">0h - 6h</MenuItem>
                                      <MenuItem value="6">6h - 12h</MenuItem>
                                      <MenuItem value="12">12h - 18h</MenuItem>
                                      <MenuItem value="18">18h - 24h</MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                              </div>
                            </div>
                            <div className={cName}>{/* {routes} */}</div>
                            <div className="pagination-wrapper">
                              <ul className="pagination clearfix">
                                {/* {pages} */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {sortByType.length > 0 ? (
                      sortByType.map((c) => {
                        return (
                          <Item
                            setChoosen={setChoosenState}
                            choosen={choosen}
                            timeTableID={setTimeTableIDState}
                            check={setChecked}
                            seatSubmit={setSeatSubmit}
                            placeFrom={setPlaceFromState}
                            step={setStepState}
                            total={setTotalState}
                            station={setStationState}
                            select={check === c.id ? true : false}
                            id={c.id}
                            rate={c.rate}
                            busRouteID={c.busRouteID.id}
                            timeStart={
                              c.time.split(":")[0] + "h:" + c.time.split(":")[1]
                            }
                            timeEnd={
                              parseInt(c.time.split(":")[0]) +
                              6 +
                              "h:" +
                              c.time.split(":")[1]
                            }
                            stationFrom={c.busRouteID.routeID.city_from.name}
                            stationTo={c.busRouteID.routeID.to_garage.name}
                            price={c.busRouteID.price}
                            busType={c.busRouteID.busID.typeBusID.name}
                            busTypeId={c.busRouteID.busID.typeBusID.id}
                            seat={c.seat}
                            date={c.date}
                            point={c.busRouteID.routeID.point}
                            destination={c.busRouteID.routeID.destination}
                            distance={c.busRouteID.routeID.distance}
                            hours={c.busRouteID.routeID.hours}
                          ></Item>
                        );
                      })
                    ) : user == null ? (
                      <Link
                        to="/login"
                        style={{
                          fontSize: "30px",
                          padding: "125px",
                        }}
                      >
                        {t("kccd")}
                      </Link>
                    ) : (
                      <h1
                        style={{
                          textAlign: "center",
                          margin: "0",
                          padding: "10px",
                        }}
                      >
                        {t("kccd1")}
                      </h1>
                    )}
                  </div>
                ) : step === 2 ? (
                  <Booking1
                    step={setStepState}
                    clearSeat={clearSeatSubmit}
                    userInfo={setUserInfoState}
                  />
                ) : step === 3 ? (
                  <Booking2
                    step={setStepState}
                    placeFrom={placeFrom}
                    userInfo={userInfo}
                    seat={seat}
                    total={total}
                    station={station}
                    timeTableID={timeTableID}
                  ></Booking2>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="default-sidebar tour-sidebar ml-20">
                <div className="advice-widget">
                  <div
                    className="inner-box"
                    style={{ backgroundImage: `url(${advice1})` }}
                  >
                    <div className="text">
                      <h2>
                        {t("giam")} <br />
                        {t("25")} <br />
                        {t("chuyendibinhdinh")}
                      </h2>
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
