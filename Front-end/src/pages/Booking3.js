import React, { useEffect, useState } from "react";
import pageTitle5 from "../image/background/page-title-5.jpg";
import Header from "../Layout/Header";
import NumberFormat from "react-number-format";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
function Booking3(props) {
  const [resultCode, setResultCode] = useState(0);
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };

  let notification = <></>;
  if (resultCode === 0) {
    notification = (
      <>
        <div className="confirm-box">
          <h3>{t("ttthanhcong")}</h3>
          <div className="inner-box centred">
            <div className="icon-box">
              <i className="far fa-check-circle" />
            </div>
            <h3>{t("camon")}</h3>
            <p>
             {t("goihoadon")}
              <br />
            </p>
          </div>
        </div>
      </>
    );
  } else if (resultCode === 1) {
    notification = (
      <>
        <div className="confirm-box">
          <h3> {t("ttthatbai")}</h3>
          <div className="inner-box centred">
            <div className="icon-box">
              <i style={{ color: "red" }} className="far fa-times-circle" />
            </div>
            <h3> {t("lhlai")}</h3>
            <p>
            {t("thacmat")}
              <br />
            </p>
          </div>
        </div>
      </>
    );
  } else if (resultCode === -1) {
    notification = (
      <>
        <div className="confirm-box">
          <h3> {t("yc")}</h3>
          <div className="inner-box centred">
            <div className="icon-box">
              <i style={{ color: "blue" }} className="far fa-check-circle" />
            </div>
            <h3> {t("camon2")}</h3>
            <p>
              <br />
            </p>
          </div>
        </div>
      </>
    );
  }

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
            <h1>{t("xacnhan2")}</h1>
            <p> {t("khampha")}</p>
          </div>
        </div>
      </section>

      <section className="booking-section booking-process-3">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="booking-process-content mr-20">
                <ul className="process-label clearfix">
                  <li>
                    <span>1.</span>{t("tthkhoa")}
                  </li>
                  <li>
                    <span>2.</span>{t("thanhtoanhoa")}
                  </li>
                  <li className="current">
                    <span>3.</span>{t("xacnhan1")}
                  </li>
                </ul>
                {notification}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Booking3);
