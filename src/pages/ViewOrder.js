import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";
import {getOrderByOrderId, getOrderByUser} from "../features/auth/authSlice";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Sản phẩm",
    dataIndex: "title",
  },
  {
    title: "số lượng",
    dataIndex: "quantity",
  },
  {
    title: "Đơn giá",
    dataIndex: "price",
  },
  {
    title: "Tổng cộng",
    dataIndex: "totalPrice",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByOrderId(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state.auth?.orderId);
  const shippingAddress = useSelector(
    (state) => state.auth?.orderId?.shippingInfo
  );

  let total = 0;
  const data1 = [];
  for (let i = 0; i < orderState?.orderItems.length; i++) {
    const {title, quantity, price} = orderState?.orderItems[i];
    data1.push({
      key: i + 1,
      title: title,
      quantity: quantity,
      price: price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
      totalPrice: (quantity * price).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
    });
    total += quantity * price;
  }

  return (
    <div>
      <h3 className="mb-4 title">Xem thông tin đơn hàng</h3>
      {shippingAddress && (
        <div>
          <h4>Thông tin người mua:</h4>
          <Table
            columns={[
              {title: "Người mua", dataIndex: "attribute", width: "30%"},
              {title: "Thông tin", dataIndex: "value", width: "70%"},
            ]}
            dataSource={[
              {attribute: "Tên", value: shippingAddress?.name},
              {attribute: "Số điện thoại", value: shippingAddress?.phone},
              {attribute: "Địa chỉ nhà", value: shippingAddress?.address},
              {attribute: "Phường/ xã", value: shippingAddress?.ward},
              {attribute: "Quận/ huyện", value: shippingAddress?.district},
              {attribute: "Tỉnh/ thành phố", value: shippingAddress?.city},
              {
                attribute: "Phương thức thanh toán",
                value:
                  shippingAddress.paymentMethod === "cash"
                    ? "Tiền mặt"
                    : "Chuyển khoản",
              },
            ]}
            pagination={false}
          />
        </div>
      )}
      <div className="my-4">
        <h4>Sản phẩm mua:</h4>
        <Table columns={columns} dataSource={data1} />
        <h6 className="text-center">
          Tổng cộng tiền hàng đã mua:{" "}
          {total.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </h6>
      </div>
    </div>
  );
};

export default ViewOrder;
