import React, { Fragment, useEffect, useState } from "react";
import { RiArrowDownLine } from "react-icons/ri";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [visibleProducts, setVisibleProducts] = useState(0);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  useEffect(() => {
    const updateVisibleProducts = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 1024) {
        setVisibleProducts(24);
      } else if (screenWidth > 768) {
        setVisibleProducts(16);
      } else {
        setVisibleProducts(5);
      }
    };

    updateVisibleProducts();
    window.addEventListener("resize", updateVisibleProducts);
    return () => window.removeEventListener("resize", updateVisibleProducts);
  }, []);

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    if (products && products.length > 0) {
      const shuffledProducts = shuffleArray([...products]);
      dispatch({ type: "SET_SHUFFLED_PRODUCTS", payload: shuffledProducts });
    }
  }, [products, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Samridhi Enterprises - Home" />

          <div className="banner">
            <div className="banner-content">
              <h1>Welcome to Samridhi Enterprises!</h1>
              <p>Discover great deals on a wide range of products.</p>
              <a href="#productSection">
                <button>
                  Scroll <RiArrowDownLine />
                </button>
              </a>
            </div>
            <div className="banner-overlay"></div>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container">
            <div className="productContainer" id="productSection">
              {products &&
                products
                  .slice(0, visibleProducts)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
            </div>
            <div className="moreProductsButton">
              <Link to="/products">More Products</Link>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;
