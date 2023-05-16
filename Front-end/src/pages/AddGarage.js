import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./AdminCarrier";
import API, { endpoints } from "../configs/API";
import { Col, Form, Row } from "react-bootstrap";
import MessageSnackbar from "../Components/MessageSnackbar";
import { useSearchParams, useParams } from "react-router-dom";
import { UserContext } from "../App";
const AddArtical = () => {
  let navigate = useNavigate();
  const [bus, setBus] = useState([]);
  const [router, setRouter] = useState([]);
  const [user, dispatch] = useContext(UserContext);
  const [active, setActive] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [updateDate, setUpdateDate] = useState(null);
  const [price, setPrice] = useState(null);
  const [busID, setBusID] = useState(null);
  const [routeID, setRouteID] = useState(null);
  // State of message
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");
  const [typeMsg, setTypeMsg] = useState("");
  const [titleMsg, setTitleMsg] = useState("");
  const { carrierId } = useParams();
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
    let loadArticals = async () => {
      try {
        let res = await API.get(endpoints["get_bus_by_carrierID"](carrierId));
        setBus(res.data);
        // let res = await API.get(endpoints["buss"]);
        // setBus(res.data.results);
        console.log(res.data);
        let res1 = await API.get(endpoints["router"]);
        setRouter(res1.data);
        console.log(res1.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadArticals();
  }, []);

  const addBusRoute = async () => {
    let formField = new FormData();

    formField.append("price", price);
    formField.append("busID", busID);
    formField.append("routeID", routeID);

    //thêm bài viết
    await axios({
      method: "post",
      url: "http://localhost:8000/busroute_post/",
      data: formField,
    })
      .then((response) => {
        console.log(response.data);
        setOpen(true);
        createMessage(
          "Thành công",
          "Bạn đã thêm chuyến đi thành công!",
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
        setOpen(true);
        createMessage("Lỗi", "Thêm chuyến đi thất bại !!!", "error");
      });
    setPrice("");
    setBusID("");
    setRouteID("");
  };

  return (
    <>
      <Admin />

      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Thêm tuyến phục vụ mới</h2>

        {/* <div className="form-group">
          <label>Active</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setActive(e.target.value)}
            min="0"
            max="1"
          />
        </div> */}
        {/* <div className="form-group">
          <label>Ngày tạo</label>
          <input
            type="date"
            className="form-control "
            placeholder="Ngày tạo"
            name="name"
            value={createdDate}
            onChange={(e) => setCreatedDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Ngày cập nhật</label>
          <input
            type="date"
            className="form-control"
            placeholder="Ngày cập nhật"
            name="name"
            value={updateDate}
            onChange={(e) => setUpdateDate(e.target.value)}
          />
        </div> */}

        <div className="form-group">
          <label>Nhập Giá</label>
          <input
            type="number"
            className="form-control"
            placeholder="800,000"
            name="name"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <Form.Group className="form-group">
          <label>Chọn nhà xe</label>
          <Form.Select value={busID} onChange={(e) => setBusID(e.target.value)}>
            <option value="0" selected="selected">
              Chọn nhà xe
            </option>
            {bus.map((c) => {
              return <option value={c.id}>{c.name}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group">
          <label>Chọn chuyến đi</label>
          <Form.Select
            value={routeID}
            onChange={(e) => setRouteID(e.target.value)}
          >
            <option value="0" selected="selected">
              Chọn chuyến đi
            </option>
            {router.map((c) => {
              return (
                <option value={c.id}>
                  {c.city_from.name} - {c.to_garage.name}
                </option>
              );
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
