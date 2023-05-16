import React from "react";
import { Link } from "react-router-dom";
import WOW from "wowjs";
import Header from "../Layout/Header";
import shape3 from "../image/shape/shape-3.png";
import Services from "../Components/Services";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function Contact() {
  const { t } = useTranslation("translation");
  const componentDidMount = () => {
    new WOW.WOW({
      live: false,
    }).init();
  };
  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{
          backgroundImage: "url(" + require("../assets/img/5282.jpg") + ")",
        }}
      >
        <div className="auto-container">
          <div className="content-box">
            <h1>{t("contact")}</h1>
            <p>{t("khampha")}</p>
          </div>
        </div>
      </section>
      <ContactInfoSection />
      <ContactSection />
      <Services />
    </>
  );
}

function ContactInfoSection() {
  const { t } = useTranslation("translation");
  const componentDidMount = () => {
    new WOW.WOW({
      live: false,
    }).init();
  };
  return (
    <section className="contact-info-section bg-color-1">
      <div className="anim-icon">
        <div
          className="icon anim-icon-1"
          style={{
            backgroundImage: `url(${shape3})`,
          }}
        />
        <div
          className="icon anim-icon-2"
          style={{
            backgroundImage: `url(${shape3})`,
          }}
        />
      </div>
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-4 col-md-6 col-sm-12 info-column">
            <div
              className="single-info-box wow fadeInUp animated animated"
              data-wow-delay="00ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <div className="icon-box">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <h3>{t("diachi1")}</h3>
                <p>371, Nguyen Kiem Street, Go Vap District</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 info-column">
            <div
              className="single-info-box wow fadeInUp animated animated"
              data-wow-delay="300ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <div className="icon-box">
                  <i className="fas fa-phone-alt" />
                </div>
                <h3>{t("phone")}</h3>
                <p>
                  <a href="tel:0767642448">0767642448</a>
                  <br />
                  <a href="tel:0354444899">0354444899</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 info-column">
            <div
              className="single-info-box wow fadeInUp animated animated"
              data-wow-delay="600ms"
              data-wow-duration="1500ms"
            >
              <div className="inner-box">
                <div className="icon-box">
                  <i className="fas fa-envelope" />
                </div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:1951052138nguyen@ou.edu.vn">
                    nhatnguyen.01102001@gmail.com
                  </a>
                  <br />
                  <a href="mailto:1951052134nguyen@ou.edu.vn">
                    huynguyenvo.01102001@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useTranslation("translation");
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-5 col-md-12 col-sm-12 content-column">
            <div className="content_block_5">
              <div className="content-box">
                <div className="sec-title">
                  <p>{t("contact")}</p>
                  <h2>{t("lhthoaimai")}</h2>
                </div>
                <div className="text">
                  <p>
                  {t("diachi1")} {t("diachi")} 
                  </p>
                </div>
                <ul className="social-links clearfix">
                  <li>
                    <Link to="/">
                      <i className="fab fa-facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fab fa-google-plus-g" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12 form-column">
            <div className="form-inner">
              <form
                method="post"
                action="sendemail.php"
                id="contact-form"
                className="default-form"
              >
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <input
                      type="text"
                      name="username"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                    <input
                      type="text"
                      name="phone"
                      required
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 form-group">
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Topic"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <textarea
                      name="message"
                      placeholder="Please write what you think ..."
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                    <button
                      className="theme-btn"
                      type="submit"
                      name="submit-form"
                    >
                      Xác Nhận
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
