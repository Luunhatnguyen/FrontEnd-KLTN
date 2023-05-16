import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearchParams, useParams } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Pagination,
  Stack,
} from "@mui/material";
import Admin from "./AdminCarrier";
import { UserContext } from "../App";
import { FaMoneyBillWaveAlt, FaBus } from "react-icons/fa";
import Time from "react-time";
import PreLoader from "../Components/PreLoader";
import { Col, Form, Row } from "react-bootstrap";
import * as ImCon from "react-icons/im";
import NumberFormat from "react-number-format";
const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "15px",
          backgroundColor: "#ff7c5b",
          width: "110px",
          height: "45px",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .css-ax94ij-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
      backgroundColor: "#ff7c5b",
    },
    "& .Mui-selected": {
      color: "#fff",
    },
  },
}));

export default function ManageBus(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [count, setCount] = useState(-1);
  const [busRoute, setBusRoute] = useState([]);

  const [cName, setcName] = useState("wrapper list");

  const [page, setPage] = useState(1);
  const classes = useStyles();
  const { garagesId } = useParams();
  useEffect(() => {
    let loadRouter = async () => {
      let query = location.search;
      if (query === "") query = `?page=${page}`;
      else query += `&page=${page}`;

      try {
        let res = await API.get(endpoints["get_route_by_bus"](garagesId));
        setBusRoute(res.data);
        setCount(res.data.length);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadRouter();
  }, [location.search, page]);

  /* End Function Search Tour */

  /* Render tour list */
  let routes = <></>;
  let results = <></>;

  //  CHÚ Ý LỌC CÓ HAY KHÔNG
  routes = (
    <>
      <div className="tour-list-content list-item">
        {busRoute.map((t) => (
          <RouteItem2 busRoute={t} key={t.id} />
        ))}
      </div>
    </>
  );

  results = (
    <>
      <h3>
        Hiển thị {busRoute.length} trên {count} kết quả chuyến đi
      </h3>
    </>
  );

  // Pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let pages = (
    <>
      <Stack spacing={2}>
        <Pagination
          classes={{ ul: classes.ul }}
          variant="outlined"
          size="large"
          count={Math.ceil(count / 6)}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
  /* End Render */
  // if (busRoute.length === 0 && count === -1) {
  //   return <PreLoader />;
  // }

  return (
    <>
      <Admin />

      <section className="tours-page-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="item-shorting clearfix">
                <div className="left-column pull-left">{results}</div>
              </div>
              <div className={cName}>{routes}</div>
              <div className="pagination-wrapper">
                <ul className="pagination clearfix">{pages}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function RouteItem2(props) {
  return (
    <div
      className="tour-block-two wow fadeInUp animated animated"
      data-wow-delay="00ms"
      data-wow-duration="1500ms"
    >
      <div className="inner-box">
        <figure className="image-box">
          <img
            style={{ width: "190px", height: "227px" }}
            src={props.busRoute.routeID.image}
            alt="ImageTrip"
          />
        </figure>
        <div className="content-box">
          <h3>
              <p>
                {props.busRoute.routeID.city_from.name} -
                {props.busRoute.routeID.to_garage.name}
              </p>
          </h3>
          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
            <ImCon.ImLocation />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Khoảng cách: {props.busRoute.routeID.distance} km
              </p>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Thời gian đi: {props.busRoute.routeID.hours}h
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <FaMoneyBillWaveAlt />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
              <NumberFormat
                  value={props.busRoute.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Giá: "}
                />
                <span> đ </span>
              </p>
            </Col>
            <Col xs={4} style={{ display: "inline-flex" }}>
              <ImCon.ImClock />
              <p style={{ marginTop: "-3px", marginLeft: "5px" }}>
                Ngày tạo: <Time value={props.busRoute.routeID.created_date} format="DD/MM/YYYY" />
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
