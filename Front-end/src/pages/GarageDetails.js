import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { endpoints } from "../configs/API";
import cookies from "react-cookies";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import WOW from "wowjs";
import Header from "../Layout/Header";
import pageTitle6 from "../assets/img/Bus-Station-High-Quality-Wallpaper.jpg";
import advice1 from "../image/advice/advice-1.jpg";
import MessageSnackbar from "../Components/MessageSnackbar";
import { UserContext } from "../App";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

function ArticalDetails(props) {
  const { t } = useTranslation("translation");
  const [bus, setBus] = useState([]);
  const [lastestArticals, setLastestArticals] = useState([]);

  const [actionType, setActionType] = useState(1);
  const [stylebtLike, setstylebtLike] = useState(null);
  const [likesChange, setLikesChange] = useState(null);

  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);
  const [commentChange, setCommentChange] = useState(0);

  const { garagesId } = useParams();

  const [user, dispatch] = useContext(UserContext);

  // State of message
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    let getArtical = async () => {
      try {
        let res = await API.get(endpoints["garage-details"](garagesId), {
          headers: {
            Authorization: `Bearer ${cookies.load("access_token")}`,
          },
        });
        setBus(res.data);
        console.log(res.data);
        setActionType(res.data.type);
        if (res.data.type === 1 || res.data.type === -1)
          setstylebtLike("outlined");
        else setstylebtLike("contained");
      } catch (error) {
        console.error(error);
      }
    };

    let getComments = async () => {
      try {
        let res = await API.get(endpoints["bus-comments"](garagesId));
        setListComment(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getArtical();
    getComments();
  }, [garagesId, commentChange, likesChange]);

  /* Handle Comment Function */
  const addComment = async (event) => {
    event.preventDefault();
    if (user != null) {
      try {
        let res = await API.post(
          endpoints["add-comment-bus"](garagesId),
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
          setOpen(true);
          createMessage("Thành công", "Đăng bình luận thành công", "success");

          listComment.push(res.data);
          setListComment(listComment);
          setCommentChange(listComment.length);
          setComment("");
        }
      } catch (error) {
        console.error(error);
        setOpen(true);
        createMessage("Lỗi", "Đăng bình luận thất bại", "error");
      }
    } else {
      setOpen(true);
      createMessage("Cảnh báo", "Hãy đăng nhập để có thể bình luận", "warning");
    }
  };
  let garages = <></>;
  //  CHÚ Ý LỌC CÓ HAY KHÔNG
  if (user != null) {
    garages = (
      <>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
              <div className="blog-details-content">
                <div className="news-block-one">
                  <div className="inner-box">
                    <div className="lower-content">
                      <div className="category">
                        <Link to="/garage">
                          <span
                            className="post-date"
                            style={{ fontSize: "18px" }}
                          >
                            <i className="fas fa-bus-alt" /> {bus.numberplate}
                          </span>
                        </Link>
                      </div>
                      <h2>Tên Nhà Xe: {bus.name}</h2>
                      <h3>Mô Tả</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `${bus.description}`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <h2>Tại sao lại đặt xe khách tại Bus Station?</h2>
                <div className="text">
                  <p>
                    Nội thất sang trọng bậc nhất, chỗ ngồi thỏa mái, đầy đủ tiện
                    nghi như khách sạn
                  </p>
                  <p>
                    Tất cả đều là xe đời mới Tất cả những xe đưa rước tại NhaXe
                    đều là xe đời mới để cho du khách có những trải nghiệm tốt
                    nhất trong suốt quá trình di chuyển. Những loại xe đời cũ
                    thường hay gặp các vấn đề như: máy không êm, xe hay bị xóc,
                    điều hòa không tốt, không gian chật hẹp, xe hao tốn nhiên
                    liệu,… Giá cả hợp lý Giá cả luôn là những ưu tiên hàng đầu
                    của du khách nên NhaXe cung cấp những nhà xe uy tín và chất
                    lượng nhất được kí kết hợp đồng rõ ràng giữa 2 bên. Tiết
                    kiệm thời gian Thay vì phải đến tận bến xe, chờ đợi, xếp
                    hàng tốn nhiều công sức để chỉ mua một tấm vé thì chỉ bằng
                    những cú click chuột hay một cuộc gọi điện thoại đơn giản
                    bạn đã có thể sở hữu một tấm vé như mong muốn cho chuyến đi
                    của mình.
                  </p>
                  <p>
                    Vừa đi vừa làm việc thỏa mái
                    <div>Bên cạnh đó các dịch vụ miễn phí trên xe bao gồm:</div>
                    <div>Hướng dẫn</div>
                    <div>Wifi</div>
                    <div>Nước uống</div>
                    <div>Khăn lạnh</div>
                    <div>Đồ ăn nhẹ</div>
                  </p>
                </div>
                {/* Bình luận */}
                <div
                  className="comments-form-area"
                  style={{ marginTop: "10px" }}
                >
                  <div className="group-title">
                    <h2>Để lại bình luận</h2>
                  </div>
                  <div className="form-inner">
                    <form
                      id="contact-form"
                      className="default-form"
                      onSubmit={addComment}
                    >
                      <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                          <textarea
                            placeholder="Nội dung"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                          />
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                          <button
                            className="theme-btn"
                            type="submit"
                            name="submit-form"
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="comment-box">
                  <div className="group-title">
                    <h2>{listComment.length} Bình luận</h2>
                  </div>
                  {listComment.map((c) => (
                    <CommentItem key={c.id} comment={c} />
                  ))}
                </div>
                <div className="post-share-option clearfix">
                  <div className="text pull-left">
                    <h3>We Are Social On:</h3>
                  </div>
                  <ul className="social-links pull-right clearfix">
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
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar default-sidebar ml-20">
                <div className="advice-widget">
                  <div
                    className="inner-box"
                    style={{ backgroundImage: `url(${advice1})` }}
                  >
                    <div className="text">
                      <h2>
                        Get <br />
                        25% Off <br />
                        On New York Tours
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    garages = (
      <>
        <div className="tour-list-content list-item">
          <Link
            to="/login"
            style={{
              fontSize: "30px",
              padding: "125px",
              marginLeft: "545px",
            }}
          >
            {t("dangnhapdexemgarage")}
          </Link>
        </div>
      </>
    );
  }
  // if (artical.length === 0) {
  //     return <PreLoader />
  // }
  return (
    <>
      <Header />
      <section
        className="page-title centred"
        style={{ backgroundImage: `url(${pageTitle6})` }}
      >
        <div className="auto-container">
          <div
            className="content-box wow fadeInDown animated animated"
            data-wow-delay="00ms"
            data-wow-duration="1500ms"
          >
            <h1>Chi tiết Nhà xe</h1>
            <p>Khám phá hành trình tuyệt vời tiếp theo của bạn</p>
          </div>
        </div>
      </section>

      <section className="sidebar-page-container">{garages}</section>

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

export default ArticalDetails;

function CommentItem(props) {
  const { t } = useTranslation("translation");
  return (
    <div className="comment">
      <figure className="thumb-box">
        <Avatar
          alt="ImageComment"
          src={props.comment.user.avatar_path}
          sx={{ width: 52, height: 52 }}
        />
      </figure>
      <div className="comment-inner">
        <div className="comment-info clearfix">
          <span className="post-date" style={{ float: "left" }}>
            {t("dangngay")}{" "}
            <Moment format="DD/MM/YYYY">{props.comment.created_date}</Moment>{" "}
          </span>
        </div>
        <p>{props.comment.content}</p>
        <div className="author-comment">
          <span>Bình luận bởi:</span> {props.comment.user.first_name}{" "}
          {props.comment.user.last_name}
        </div>
      </div>
    </div>
  );
}
