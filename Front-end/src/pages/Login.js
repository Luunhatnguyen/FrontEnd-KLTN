import React, { useContext, useEffect, useState } from "react";
import API, { authApi, endpoints } from "../configs/API";
import cookies from "react-cookies";
import { Link, useNavigate } from "react-router-dom";
import WOW from "wowjs";
import pageTitle5 from "../assets/img/14926f75f7d51ac044ccc0847cfb262f.png";
import shape16 from "../image/shape/shape-16.png";
import shape17 from "../image/shape/shape-17.png";
import MessageSnackbar from "../Components/MessageSnackbar";
import FirebaseInit from "../firebase/firebase-init";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { UserContext } from "../App";
import FacebookLogin from "react-facebook-login";
import Header from "../Layout/Header";

export default function Login() {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [user, dispatch] = useContext(UserContext);

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

  const login = async (event) => {
    event.preventDefault();

    try {
      const clientKey = await API.get(endpoints["oauth2_info"]);
      const res = await API.post(endpoints["login"], {
        client_id: clientKey.data.client_id,
        client_secret: clientKey.data.client_secret,
        username: username,
        password: password,
        grant_type: "password",
      });

      if (res.status === 200) {
        cookies.save("access_token", res.data.access_token);
        const user = await authApi().get(endpoints["current_user"]);
        cookies.save("current_user", user.data);
        console.log(user.data);
        dispatch({
          type: "login",
          payload: user.data,
        });
        setOpen(true);
        createMessage("Thành công", "Bạn đã đăng nhập thành công!", "success");
        navigate("/");
      }
    } catch (err) {
      console.error(err);

      setOpen(true);
      createMessage(
        "Lỗi",
        "Sai tên tài khoản hoặc mật khẩu. Đảm bảo nhập đúng tên tài khoản và mật khẩu !",
        "error"
      );
    }
  };
 
  FirebaseInit();
  const provider = new GoogleAuthProvider();
  const handleGoogleSignedIn = () => {
    const auth = getAuth();
    console.log(auth);
    signOut(auth);
    signInWithPopup(auth, provider).then(async (result) => {
      const googleAccess = await API.post(endpoints["google-access"], {
        auth_token: result._tokenResponse.oauthIdToken,
      });
      console.log(googleAccess.data);
      cookies.save("access_token", googleAccess.data.tokens.access);
      const user = await authApi().get(endpoints["current_user"]);
      cookies.save("current_user", user.data);
      // console.log(user.data);
      dispatch({
        type: "login",
        payload: user.data,
      });
      navigate("/");
    });
  };

  const responseFacebook = async (response) => {
    try {
      const facebookAccess = await API.post(endpoints["facebook-access"], {
        auth_token: response.accessToken,
      });
      console.log(facebookAccess.data.tokens.access);
      if (facebookAccess.status === 400) {
        console.log(facebookAccess.data.auth_token);
      }
      cookies.save("access_token", facebookAccess.data.tokens.access);
      const user = await authApi().get(endpoints["current_user"]);
      cookies.save("current_user", user.data);
      console.log(user.data);
      dispatch({
        type: "login",
        payload: user.data,
      });
      navigate("/");
    } catch (error) {
      alert(error.response.data.auth_token);
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
            <h1> {t("login")}</h1>
            <p>{t("colab")}</p>
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
              <p>{t("login")}</p>
              <h2>{t("colab")}</h2>
            </div>
            <div className="form-inner">
              <h3>{t("loginwith")}</h3>
              <ul className="social-links clearfix">
                <li>
                  <FacebookLogin
                    appId="856371595431946"
                    autoLoad={false}
                    fields="name,email,picture"
                    cssClass="my-facebook-button-class"
                    icon="fab fa-facebook-f"
                    callback={responseFacebook}
                    textButton=""
                  />
                </li>
                <li>
                  <button
                    className="my-google-button-class fab fa-google-plus-g"
                    onClick={handleGoogleSignedIn}
                  >
                    <span>{t("loginwithGG")}</span>
                  </button>
                </li>
              </ul>
              <div className="text">
                <span>{t("hoac")}</span>
              </div>
              <form onSubmit={login} className="register-form">
                <div className="row clearfix">
                  <LoginForm
                    id="username"
                    label={t("username")}
                    field={username}
                    change={(event) => setUsername(event.target.value)}
                    type="text"
                    placeholder="Nhập tên tài khoản"
                  />
                  <LoginForm
                    id="password"
                    label={t("password")}
                    field={password}
                    change={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Nhập mật khẩu"
                  />
                  <div className="col-lg-12 col-md-12 col-sm-12 column">
                    <div className="form-group">
                      <div className="forgor-password text-right">
                        <Link to="/forgot-password">{t("forgotpassword")}</Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 column"
                    style={{ display: "flex" }}
                  >
                    <div className="form-group message-btn">
                      <button type="submit" className="theme-btn">
                      {t("login")}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="other-text">
              {t("noaccount")}  <Link to="/register">  {t("registerNow")}</Link>
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

function LoginForm(props) {
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 column">
        <div className="form-group">
          <label>{props.label}</label>
          <input
            value={props.field}
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
