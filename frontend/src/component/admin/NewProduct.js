import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { TbCategoryFilled } from "react-icons/tb";
import { MdOutlineDescription } from "react-icons/md";
import { MdStorage } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Abs",
    "Belt Drive",
    "Bearing Kit",
    "BSVI Products",
    "Brake Switch",
    "CDEI",
    "C.D.I",
    "Consumable Filters",
    "Drum / Drum Plate / Coupling Hub / Wheel Rim",
    "Electronic Relay",
    "Filters & Horn",
    "Footrest Bracket",
    "Other Products (Cylinder Kit / Fuse Blade)",
    "Flasher / Buzzer",
    "Floor Set / Speedo Gear",
    "Fuel Items",
    "Lever & Yoke",
    "Varroc Oil / Grease",
    "Handle Bar Switch / Handle Bar Weigth",
    "Ignition Coil",
    "Insulator For Carburetor",
    "Lighting Products",
    "Magneto Assembly & Spares",
    "Modular Switch",
    "Oring",
    "Other (Oil Pump Gear / Clutch Roller / Plug Cap)",
    "Oil Seal Kit",
    "Gaskets",
    "Rear View Mirror",
    "Regulator Rectifier (R.R.)",
    "Rubber Items",
    "Relay",
    "Switches / Locks",
    "Starter Moter & Spares",
    "Speedo Gear",
    "TPSR / Swing Arm Assly",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <MdDriveFileRenameOutline />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <FaRupeeSign />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <MdOutlineDescription />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <TbCategoryFilled />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <MdStorage />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
