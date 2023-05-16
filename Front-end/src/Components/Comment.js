import { TiStar } from "react-icons/ti";
import { GoVerified } from "react-icons/go";
import { IoIosPaperPlane } from "react-icons/io";
import { Button, Pagination } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Api, { authApi, endpoints } from "../configs/API";
import Moment from "react-moment";
import { memo } from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import cookies from "react-cookies";
import React from "react";
import { Avatar, Rating } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import MessageSnackbar from "../Components/MessageSnackbar";


function Comment(props) {
  const { t } = useTranslation("translation");
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };
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
  const [ratingClick, setRatingClick] = useState();
  const [ratingHover, setRatingHover] = useState();
  const [rating, setRating] = useState([]);
  const [averagRating, setAverageRating] = useState();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState();

  const navigate = useNavigate();
  const [checkedUser, setCheckedUser] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [user, dispatch] = useContext(UserContext);

  useEffect(() => {
    const loadComments = async () => {
      const res = await Api.get(
        endpoints["busroute-comments"](props.busRouteID)
      );
      setComments(res.data.reverse());
    };

    const loadRating = async () => {
      const res = await Api.get(
        endpoints["busroute-ratings"](props.busRouteID)
      );
      setRating(res.data);
      let a = 0;
      res.data.map((c) => {
        a += c.rate;
      });
      setAverageRating((a / res.data.length).toFixed(1));
    };

    const loadCheckedUser = async () => {
      const res = await Api.get(endpoints["checked-user"](props.busRouteID));
      res.data.map((c) => {
        if (user != null)
          if (c.id == user.id) {
            setIsBooking(true);
          }
      });
      setCheckedUser(res.data);
    };

    loadComments();
    loadRating();
    loadCheckedUser();
  }, []);

  const setRatingClickState = (value) => {
    setRatingClick(value);
  };

  const setRatingHoverState = (value) => {
    setRatingHover(value);
  };

  const setContentState = (value) => {
    setContent(value);
  };

  const addComment = async (event) => {
    event.preventDefault();
    if (user == null) {
      alert("Đăng nhập để bình luận");
      navigate("/Login/");
    } else {
      try {
      const resComment = await authApi().post(endpoints["comments"], {
        content: content,
        busroute: props.busRouteID,
        user: user.id,
      });

      const resLastComment = await Api.get(endpoints["last-comment"]);

      const idComment = resLastComment.data.id;

      const resRating = await authApi().post(endpoints["ratings"], {
        busroute: props.busRouteID,
        rate: ratingClick,
        user: user.id,
        comment: idComment,
      });
      if (resRating.status === 201) {
        setOpen(true);
        createMessage("Thành công", "Đăng bình luận thành công", "success");

      }
      setRatingClick(0);
      setContent("");
      setComments(comments.reverse());
      setComments([...comments, resLastComment.data].reverse());
      setRating([...rating, resRating.data]);
      let a = 0;
      rating.map((c) => {
        a += c.rate;
      });
      a += resRating.data.rate;
      setAverageRating((a / (rating.length + 1)).toFixed(1));
    } catch (error) {
      console.error(error);
      setOpen(true);
      createMessage("Lỗi", "Đăng bình luận thất bại", "error");
    }
    }
  };

  const GetRating = (id) => {
    let kq;
    if (rating) {
      rating.map((c) => {
        if (c.comment == id) {
          kq = parseInt(c.rate);
        }
      });
    }
    return kq;
  };

  const RatingList = (list) => {
    const rateList = [];
    for (var i = 1; i <= list; i++) {
      rateList.push(i);
    }
    return rateList.map((c) => (
      <div className="material-icons-wrapper md-16">
        <TiStar />
      </div>
    ));
  };

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div className="comment">
              <figure className="thumb-box">
                <Avatar
                  alt="ImageComment"
                  src={item.user.avatar_path}
                  sx={{ width: 52, height: 52 }}
                />
              </figure>
              <div className="comment-inner" style={{ textAlign: "left" }}>
                <div className="comment-info clearfix">
                  <span className="post-date" style={{ float: "left" }}>
                    {t("dangngay")}{" "}
                    <Moment format="DD/MM/YYYY">{item.updated_date}</Moment>{" "}
                  </span>
                  <div
                    className="material-icons-wrapper md-16"
                    style={{
                      fontSize: "20px",
                      minWidth: "376px",
                      paddingLeft: "7px",
                    }}
                  >
                    <GoVerified className="color--positive" />
                    <p
                      className="gJvXJw color--positive"
                      style={{ marginTop: "3px", fontSize: "15px" }}
                    >
                      {t("damuave")}
                    </p>
                  </div>
                </div>

                <p>{item.content}</p>
                <div className="author-comment" style={{ display: "flex" }}>
                  {RatingList(GetRating(item.id))}
                </div>
                <div className="author-comment">
                  <span> {t("binhluanboi")} </span> {item.user.first_name}{" "}
                  {item.user.last_name}
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }

  function Paginate(props) {
    const page = [];

    for (var i = 0; i < props.pageCount; i++) {
      page.push(i);
    }
    return (
      <Pagination>
        <Pagination.Prev onClick={() => props.onPageChange(0)} />
        {page.map((p) => (
          <Pagination.Item onClick={() => props.onPageChange(p)}>
            {p + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => props.onPageChange(props.pageCount - 1)}
        />
      </Pagination>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(comments.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(comments.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (value) => {
      const newOffset = (value * itemsPerPage) % comments.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        {comments.length > itemsPerPage ? (
          <Paginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            itemOffset={itemOffset}
          />
        ) : (
          ""
        )}
      </>
    );
  }

  const globalRating = (list) => {
    const rateList = [];
    for (var i = 1; i <= list; i++) {
      rateList.push(i);
    }
    return rateList.map((c) => (
      <img
        src="https://storage.googleapis.com/vxrd/star_yellow.svg"
        alt="yellow-icon"
        className="dnhtJh"
        style={{ width: "20px", height: "20px" }}
      />
    ));
  };

  return (
    <>
    <div style={{ padding: "10px" }}>
      {/* Hien thong tin rating */}
      <div className="rating">
        <div className="overall-rating">
          <i aria-label="icon: star" className="anticon anticon-star"></i>
          <span>{averagRating}</span>
        </div>
        <div className="gKWetz star_wrapper" style={{ width: "125px" }}>
          <img
            src="https://storage.googleapis.com/vxrd/star_grey.svg"
            alt="grey-icon"
            className="dnhtJh"
            style={{ width: "20px", height: "20px" }}
          />
          <img
            src="https://storage.googleapis.com/vxrd/star_grey.svg"
            alt="grey-icon"
            className="dnhtJh"
            style={{ width: "20px", height: "20px" }}
          />
          <img
            src="https://storage.googleapis.com/vxrd/star_grey.svg"
            alt="grey-icon"
            className="dnhtJh"
            style={{ width: "20px", height: "20px" }}
          />
          <img
            src="https://storage.googleapis.com/vxrd/star_grey.svg"
            alt="grey-icon"
            className="dnhtJh"
            style={{ width: "20px", height: "20px" }}
          />
          <img
            src="https://storage.googleapis.com/vxrd/star_grey.svg"
            alt="grey-icon"
            className="dnhtJh"
            style={{ width: "20px", height: "20px" }}
          />
          <div className="hMJCFM" style={{ width: "98%", textAlign: "left" }}>
            <div style={{ width: "125px" }}>{globalRating(averagRating)}</div>
          </div>
        </div>
        <span>• {comments.length}  {t("danhgia")} </span>
      </div>

      <div
        id="moduleComment"
        data-pagetype="1"
        data-productid="33485"
        className="block-comment"
        style={{ display: "block" }}
      >
        <h2
          style={{
            textAlign: "left",
            margin: "20px 0px 0px 0px",
            paddingLeft: "7px",
          }}
        >
         {t("danhgiabu")}
        </h2>
        <div className="rating-comment">
          <div
            className={`${
              ratingClick >= 1 || ratingHover >= 1
                ? "star-comment-selected"
                : "star-comment"
            }`}
            onMouseOver={() => {
              setRatingHoverState(1);
            }}
            onMouseOut={() => {
              setRatingHoverState(0);
            }}
            onClick={() => {
              setRatingClickState(1);
            }}
          >
            <TiStar />
          </div>
          <div
            className={`${
              ratingClick >= 2 || ratingHover >= 2
                ? "star-comment-selected"
                : "star-comment"
            }`}
            onMouseOver={() => {
              setRatingHoverState(2);
            }}
            onMouseOut={() => {
              setRatingHoverState(0);
            }}
            onClick={() => {
              setRatingClickState(2);
            }}
          >
            <TiStar />
          </div>
          <div
            className={`${
              ratingClick >= 3 || ratingHover >= 3
                ? "star-comment-selected"
                : "star-comment"
            }`}
            onMouseOver={() => {
              setRatingHoverState(3);
            }}
            onMouseOut={() => {
              setRatingHoverState(0);
            }}
            onClick={() => {
              setRatingClickState(3);
            }}
          >
            <TiStar />
          </div>
          <div
            className={`${
              ratingClick >= 4 || ratingHover >= 4
                ? "star-comment-selected"
                : "star-comment"
            }`}
            onMouseOver={() => {
              setRatingHoverState(4);
            }}
            onMouseOut={() => {
              setRatingHoverState(0);
            }}
            onClick={() => {
              setRatingClickState(4);
            }}
          >
            <TiStar />
          </div>
          <div
            className={`${
              ratingClick == 5 || ratingHover == 5
                ? "star-comment-selected"
                : "star-comment"
            }`}
            onMouseOver={() => {
              setRatingHoverState(5);
            }}
            onMouseOut={() => {
              setRatingHoverState(0);
            }}
            onClick={() => {
              setRatingClickState(5);
            }}
          >
            <TiStar />
          </div>
        </div>

        <div className="comment-box">
          <div>
            <div className="comment-form">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                  <textarea
                    id="review_field"
                    name="detail"
                    rows="4"
                    cols="5"
                    placeholder={t("hayde")}
                    className="cps-textarea"
                    value={content}
                    onChange={(evt) => setContentState(evt.target.value)}
                  />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12  message-btn">
                  {isBooking == true ? (
                    <button className="theme-btn" onClick={addComment}>
                      <IoIosPaperPlane />
                      &nbsp;{t("gui")}
                    </button>
                  ) : (
                    <button
                      className="theme-btn"
                      style={{ cursor: "not-allowed" }}
                    >
                      <IoIosPaperPlane />
                      &nbsp;{t("gui")}
                    </button>
                  )}
                  <span
                    id="sub-comment-error"
                    className="comment-error error-text error d-none"
                  >
                  {t("nhapbinhluan")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="group-title">
            <h2
              style={{
                textAlign: "left",
                margin: "20px 0px 0px 0px",
                paddingLeft: "7px",
              }}
            >
             {t("binhluan")}
            </h2>
          </div>

          <div className="comment-box-content">
            <PaginatedItems itemsPerPage={5} />
          </div>
        </div>
      </div>
    </div>
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

export default memo(Comment);
