import React from "react";
import Iframe from "react-iframe";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function Footer() {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span> {t("ketnoi")}</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                {t("cty")}
              </h6>
              <Iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.354626961028!2d106.67850275470026!3d10.860608973095117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752833890582fd%3A0x597cec3c7da5b5f7!2zQ-G6p3Ugdsaw4bujdCBOZ8OjIFTGsCBHYSwgVGjhuqFuaCBM4buZYywgUXXhuq1uIDEyLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1678350305750!5m2!1svi!2s"
                width="300"
                height="250"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></Iframe>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                {" "}
                {t("information")}
              </h6>
              <p>
                <a href="#!" className="text-reset">
                  {t("tintuc")}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t("sodo")}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t("lotrinh")}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t("chinhsach")}
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">{t("dichvu")}</h6>
              <p>
                <a href="#!" className="text-reset">
                  {t("cdnc")}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t("thuexe")}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t("cdtn")}
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  {t("tuyendung")}
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4"> {t("contact")}</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                {t("diachi")}
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                nhatnguyen.01102001@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 03 544 448 99
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 09 498 604 29
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 {t("banquyen")}
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          BusStation.com
        </a>
      </div>
    </MDBFooter>
  );
}
