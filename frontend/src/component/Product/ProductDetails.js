import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import Rating from "@mui/material/Rating";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import "./ProductDetails.css";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      toast.error("Products are over");
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Product can't be less than or equal to 0");
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= product.Stock) {
      toast.error("Products are over");
      setQuantity(product.Stock);
    } else if (value < 1) {
      toast.error("Product can not be less than 1");
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item added to Cart");
  };

  const submitReviewToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="ProductDetails">
        <div className="pd2">
          <div className="carousel-container">
            <div
              className="carousel-slide"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {product?.images?.map((item, i) => (
                <img
                  key={item.url}
                  className="carousel-image"
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
            </div>
            <div className="carousel-buttons">
              <button className="carousel-button" onClick={handlePrevSlide}>
                &#10094;
              </button>
              <button className="carousel-button" onClick={handleNextSlide}>
                &#10095;
              </button>
            </div>
            <div className="carousel-dots">
              {product?.images?.map((_, index) => (
                <span
                  key={index}
                  className={`carousel-dot ${
                    currentSlide === index ? "active" : ""
                  }`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          </div>

          <div className="pd3">
            <div className="detailsBlock-1">
              <h2>{product?.name}</h2>
              <p>Product # {product?._id}</p>
            </div>

            <div className="detailsBlock-2">
              <Rating
                name="read-only"
                value={product?.ratings || 0}
                readOnly
                sx={{
                  color: "gold", // This will make the stars golden
                }}
              />
              <span>({product?.numOfReviews || 0} Reviews)</span>
            </div>

            <div className="detailsBlock-3">
              <h1>{`₹${product?.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                  />
                  <button onClick={increaseQuantity}>+</button>
                </div>
                <button disabled={product.Stock < 1} onClick={addToCartHandler}>
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product?.Stock < 1 ? "redColor" : "greenColor"}>
                  {product?.Stock < 1 ? "Out of Stock" : "In Stock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description: <p>{product?.description}</p>
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
        open={open}
        onClose={submitReviewToggle}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            sx={{
              color: "gold", // This will make the stars golden
            }}
          />
          <textarea
            className="submitDialogTextArea"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {product && product.reviews && product.reviews.length > 0 ? (
        <div className="reviews">
          {product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </>
  );
};

export default ProductDetails;
