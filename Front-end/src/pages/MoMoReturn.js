import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WOW from "wowjs";
import API, { endpoints } from "../configs/API";
import Header from "../Layout/Header";
import pageTitle from "../image/background/page-title.jpg";
import PreLoader from "../Components/PreLoader";
import { textAlign } from "@mui/system";

function MoMoReturn() {
  const [show, setShow] = useState();

  useEffect(() => {
    const checkBill = async () => {
      let url = new URL(window.location.href);
      if (url.searchParams.get("resultCode") == 0) {
        try {
          let check = await API.post(endpoints["return-momo"], {
            headers: "Access-Control-Allow-Origin: http://127.0.0.1:8000/",
            signature: url.searchParams.get("signature"),
            message: url.searchParams.get("message"),
            responseTime: url.searchParams.get("responseTime"),
            resultCode: url.searchParams.get("resultCode"),
            transId: url.searchParams.get("transId"),
            orderType: url.searchParams.get("orderType"),
            payType: url.searchParams.get("payType"),
            amount: url.searchParams.get("amount"),
            orderId: url.searchParams.get("orderId"),
            requestId: url.searchParams.get("requestId"),
          });
          if (check.status === 200) {
            setShow(url.searchParams.get("message"));
          }
        } catch (error) {
          console.log(error);
          setShow("Thanh toán thất bại");
        }
      } else {
        setShow(url.searchParams.get("message"));
      }
    };
    checkBill();
  }, []);

  return (
    <>
      <Header />

      <section
        className="page-title style-two centred"
        style={{
          backgroundImage:
            "url(" +
            require("../assets/img/yokohama-bus-1f-1280x800.jpg") +
            ")",
        }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Thanh toán ví MoMo</h1>
            <p>Khám phá hành trình tuyệt vời tiếp theo của bạny</p>
          </div>
        </div>
      </section>

      <h1 style={{ textAlign: "center", color: "red", marginTop: "30px" }}>
        {show}
      </h1>
    </>
  );
}

export default MoMoReturn;
