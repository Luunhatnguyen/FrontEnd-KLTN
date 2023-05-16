import React from "react";
import { FaMoneyCheck, FaDollarSign, FaUser } from "react-icons/fa";
import { MdOutlineWifiTethering } from "react-icons/md";
import { BsFillPhoneFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function Services() {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
  return (
    <>
      <section id="services" class="services">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2> {t("taisao")}</h2>
          </div>

          <div class="row">
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
              <div class="icon">
                <i class="bi bi-chat-left-dots">
                  <MdOutlineWifiTethering />
                </i>
              </div>
              <h4 class="title"> {t("mangluoi")}</h4>
              <p class="description"> {t("dautien")}</p>
              <p class="description">{t("ungdung")}</p>
            </div>
            <div
              class="col-lg-4 col-md-6 icon-box"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div class="icon">
                <i class="bi bi-bounding-box">
                  <AiFillLike />
                </i>
              </div>
              <h4 class="title">{t("nhaxe")} &amp; {t("dichvu")}</h4>
              <p class="description">{t("dadang")} – {t("chatluong")} – {t("antoan")}</p>
            </div>
            <div
              class="col-lg-4 col-md-6 icon-box"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div class="icon">
                <i class="bi bi-globe">
                  <FaDollarSign />
                </i>
              </div>
              <h4 class="title">{t("giaca")}</h4>
              <p class="description">{t("luonco")}</p>
            </div>
            <div
              class="col-lg-4 col-md-6 icon-box"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div class="icon">
                <i class="bi bi-broadcast">
                  <FaMoneyCheck />
                </i>
              </div>
              <h4 class="title">{t("thanhtoan")}</h4>
              <p class="description">{t("antoan")}&amp; {t("thuantien")}</p>
            </div>
            <div
              class="col-lg-4 col-md-6 icon-box"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div class="icon">
                <i class="bi bi-brightness-high">
                  <BsFillPhoneFill />
                </i>
              </div>
              <h4 class="title">{t("muave")}</h4>
              <p class="description">{t("dedang")} &amp; {t("nhanhchong")}</p>
            </div>
            <div
              class="col-lg-4 col-md-6 icon-box"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div class="icon">
                <i class="bi bi-calendar2-week">
                  <FaUser />
                </i>
              </div>
              <h4 class="title">{t("giupdo")}</h4>
              <p class="description">
               {t("hotline")} &amp; {t("tructuyen")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
