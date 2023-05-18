import React, { useState, useContext, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col, Form } from "react-bootstrap";
import Apis, { endpoints } from "../configs/API";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import cookies from "react-cookies";
import { Link } from "react-router-dom";
import pageTitle5 from "../image/background/page-title-5.jpg";
import shape16 from "../image/shape/shape-16.png";
import shape17 from "../image/shape/shape-17.png";
import { UserContext } from "../App";
import MessageSnackbar from "../Components/MessageSnackbar";
import Header from "../Layout/Header";
function LoginAdmin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [user, dispatch] = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [typeMsg, setTypeMsg] = useState("");
  const [titleMsg, setTitleMsg] = useState("");
  const [approve, setApprove] = useState([]);
  const createMessage = (title, msg, type) => {
    setMsg(msg);
    setTitleMsg(title);
    setTypeMsg(type);
  };
  const handleMessageClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    let loadRouter = async () => {
      try {
        //permission APPROVE
        let res = await Apis.get(endpoints["get_carrier_by_userID"](user.id));
        res.data.map((c) => {
          setApprove(c.status_code);
        });
        // setApprove(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadRouter();
  }, []);

  console.log(approve);
  const login = async (event) => {
    event.preventDefault();
    if (approve == "APPROVE") {
      try {
        let info = await Apis.get(endpoints["oauth2_info"]);
        let res = await Apis.post(endpoints["login"], {
          client_id: info.data.client_id,
          client_secret: info.data.client_secret,
          username: username,
          password: password,
          grant_type: "password",
        });

        cookies.save("access_token", res.data.access_token);

        let user = await Apis.get(endpoints["current_user"], {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        });
        cookies.save("user", user.data);
        console.info(user);
        //permission
        let permission = await Apis.post(endpoints["carrier"], {
          username: username,
          password: password,
          isCarrier: user.data.isCarrier,
        });
        console.info(permission);
        dispatch({
          type: "login",
          payload: user.data,
        });
        navigate("/carrier");
      } catch (err) {
        console.error(err);
        setOpen(true);
        createMessage(
          "Lỗi",
          "Bạn không có quyền đăng nhập trang nhà xe !",
          "error"
        );
      }
    } else if (approve == "NOT APPROVE") {
      setOpen(true);
      createMessage(
        "Lỗi",
        "Tài Khoản nhà xe của bạn không được chấp nhận!!",
        "error"
      );
    } else {
      setOpen(true);
      createMessage(
        "Lỗi",
        "Tài Khoản Nhà Xe chưa được admin xác nhận! Vui lòng đợi admin xác nhận trong vòng 24h tới !!",
        "error"
      );
    }
  };

  return (
    <>
      <Header />

      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle5})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Đăng Nhập</h1>
            <p>Trang quản trị Nhà Xe</p>
          </div>
        </div>
      </section>
      <section className="register-section sec-pad">
        <div className="anim-icon">
          <div
            className="icon anim-icon-1"
            style={{
              backgroundImage: `url(${shape16})`,
            }}
          />
          <div
            className="icon anim-icon-2"
            style={{
              backgroundImage: `url(${shape17})`,
            }}
          />
        </div>
        <div className="auto-container">
          <div className="inner-box">
            <div className="sec-title centred">
              <p>Đăng Nhập</p>
              <h2>Trang quản trị Nhà Xe</h2>
            </div>
            <div className="form-inner">
              <Form onSubmit={login}>
                <div className="row clearfix">
                  <h1
                    className="text-center"
                    style={{
                      " fontSize": "14px",
                      " font-weight": 600,
                      color: "#8a8a8a",
                      fontFamily: "Playfair Display', serif",
                    }}
                  >
                    ĐĂNG NHẬP
                  </h1>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên tài khoản</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ height: "60px" }}
                      placeholder="Username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      style={{ height: "60px" }}
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </Form.Group>
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group">
                      <div className="forgor-password text-right">
                        <Link to="/forgot-password">Quên mật khẩu?</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group message-btn">
                      <Button type="submit" className="theme-btn color-css">
                        Đăng nhập
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
              <div className="other-text">
                Chưa có tài khoản? <Link to="/register">Đăng Ký Ngay</Link>
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
export default LoginAdmin;

function LoginForm(props) {
  return <></>;
}
