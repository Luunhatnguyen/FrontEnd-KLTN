import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./AdminCarrier";
import API, { endpoints } from "../configs/API";
import { Col, Form, Row } from "react-bootstrap";
import { UserContext } from "../App";
import { useSearchParams, useParams } from "react-router-dom";
import MessageSnackbar from "../Components/MessageSnackbar";
const AddArtical = (props) => {
  const image = useRef();

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
  let navigate = useNavigate();
  const [garage, setGarage] = useState([]);
  const [typeBus, setTypeBus] = useState([]);
  const [carrier, setCarrier] = useState([]);

  const [name, setName] = useState("");
  const [numberplate, setNumberplate] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [user, dispatch] = useContext(UserContext);
  const [garageID, setGarageID] = useState("");
  const [typeBusID, setTypeBusID] = useState("");
  const [carrierID, setCarrierID] = useState("");
  console.log(user);

  useEffect(() => {
    let loadArticals = async () => {
      try {
        let res = await API.get(endpoints["garages"]);
        setGarage(res.data);
        console.log(res.data);
        let res1 = await API.get(endpoints["type-bus"]);
        setTypeBus(res1.data);
        console.log(res1.data);
        let res2 = await API.get(endpoints["get_carrier_by_userID"](user.id));
        setCarrier(res2.data);
        console.log(res2.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadArticals();
  }, []);
  console.log(carrier);
  const addBusRoute = async () => {
    let formField = new FormData();

    formField.append("name", name);
    formField.append("active", "1");
    formField.append("numberplate", numberplate);
    formField.append("description", description);
    formField.append("rating", "5");
    formField.append("carrierID", carrierID);
    formField.append("garageID", garageID);
    formField.append("typeBusID", typeBusID);
    formField.append("image", image.current.files[0]);
    //thêm bài viết
    await axios({
      method: "post",
      url: "http://localhost:8000/buss_post/",
      data: formField,
    })
      .then((response) => {
        console.log(response.data);
        setOpen(true);
        createMessage("Thành công", "Bạn đã thêm xe thành công!", "success");
      })
      .catch((error) => {
        console.log(error);
        setOpen(true);
        createMessage("Lỗi", "Thêm xe thất bại !!!", "error");
      });
    setName("");
    setNumberplate("");
    setDescription("");
    setRating("");
    setGarageID("");
    setTypeBusID("");
    setCarrierID("");
  };

  return (
    <>
      <Admin />
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Thêm xe</h2>

        <div className="form-group">
          <label>Nhập Tên</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nhập Biển Số Xe</label>
          <input
            type="text"
            className="form-control"
            name="numberplate"
            value={numberplate}
            placeholder="77C-56789"
            onChange={(e) => setNumberplate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nhập Mô Tả Nhà xe</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

          <div className="form-group">
            <label>Image</label>
            <input className="form-control" type="file" id="image" ref={image} />
          </div>

        {/* <div className="form-group">
          <label>Nhập Đánh Giá</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max="5"
            name="rating"
            placeholder="Nhập đánh giá sao từ 1 đến 5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div> */}

        <Form.Group className="form-group">
          <label>Chọn garage</label>
          <Form.Select
            value={garageID}
            onChange={(e) => setGarageID(e.target.value)}
          >
            <option value="0" selected="selected">
              Chọn garage
            </option>
            {garage.map((c) => {
              return <option value={c.id}>{c.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group">
          <label>Chọn loại xe</label>
          <Form.Select
            value={typeBusID}
            onChange={(e) => setTypeBusID(e.target.value)}
          >
            <option value="0" selected="selected">
              Chọn loại xe
            </option>
            {typeBus.map((c) => {
              return <option value={c.id}>{c.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group">
          <label>Xác nhận tài khoản nhà xe</label>
          <Form.Select
            value={carrierID}
            onChange={(e) => setCarrierID(e.target.value)}
          >
            <option value="0" selected="selected">
              Xác nhận nhà xe
            </option>
            {carrier.map((c) => {
              return <option value={c.id}>{c.nameCarrier}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <button className="btn btn-primary btn-block" onClick={addBusRoute}>
          Thêm chuyến đi
        </button>
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
};

export default AddArtical;
