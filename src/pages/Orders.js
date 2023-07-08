import React, {useEffect} from "react";
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {Link} from "react-router-dom";
import {getOrders} from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Số tiền",
    dataIndex: "amount",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders);

  const data1 = orderState.map((order, index) => ({
    key: index + 1,
    name: order?.shippingInfo?.name,
    product: (
      <Link to={`/admin/order/${order._id}`}>
        {order?.orderItems?.length} sản phẩm
      </Link>
    ),
    amount: `${order?.totalPrice} VNĐ`,
    date: new Date(order.createdAt).toLocaleString(),
    action: (
      <>
        <Link
          to={`/admin/order/${orderState[index]._id}`}
          className="fs-3 text-danger"
        >
          <BiEdit />
        </Link>
        <Link className="ms-3 fs-3 text-danger" to="/">
          <AiFillDelete />
        </Link>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <Table columns={columns} dataSource={data1} />
    </div>
  );
};

export default Orders;
