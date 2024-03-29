import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, deleteAProduct} from "../features/product/productSlice";
import {Link} from "react-router-dom";
import CustomModal from "../components/CustomModal";
// import { getColors } from "../features/color/colorSlice";
const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  // {
  //   title: "Color",
  //   dataIndex: "color",
  // },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product.products);
  // const colorState = useSelector((state) => state.color.colors);
  useEffect(() => {
    dispatch(getProducts());
    // dispatch(getColors());
  }, [productState]);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    // for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i]?.title,
      brand: productState[i]?.brand,
      category: productState[i]?.category,
      // color: colorState[i]?.title,
      price: `${productState[i]?.price}`,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]?._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]?._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
    // }
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default Productlist;
