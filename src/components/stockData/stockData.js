import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { setProductData, toggleSelect } from "../productSlice/productSlice";
import "../Stock.css";
const GetData = () => {
  const [displaySelected, setDisplaySelected] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const selectedProducts = useSelector((state) =>
    state.product.product.filter((item) => item.isSelected)
  );

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const fetchData = () => {
    fetch("stockData.json")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setProductData(data));
      });
  };

  console.log(product);
  useEffect(() => {
    fetchData();
  }, []);

  const handleWatchlistClick = () => {
    setDisplaySelected(!displaySelected);
  };

  const handleItemHover = (itemId) => {
    setHoveredItemId(itemId);
  };

  const productList = displaySelected ? selectedProducts : product;

  return (
    <>
      <div className="mainContainer">
        <div
          className={`watchList ${!displaySelected ? "active" : ""}`}
          onClick={handleWatchlistClick}
        >
          STOCK DATA LIST <hr />
        </div>
        <div
          className={`watchLists ${displaySelected ? "active" : ""}`}
          onClick={handleWatchlistClick}
        >
          MY WATCHLIST
          <hr />
        </div>
      </div>

      {productList?.map((value) => {

        //Cnvert String to Number 
        const isPositive = parseFloat(value.stockValueChange) > 0;
        const isNegative = parseFloat(value.stockValueChange) < 0;


        const isHovered = hoveredItemId === value.id;
        return (
          <div
            key={value.id}
            className={`Onhover ${isHovered ? "hovered" : ""}`}
            onClick={() => dispatch(toggleSelect({ id: value.id }))}
            onMouseEnter={() => handleItemHover(value.id)}
            onMouseLeave={() => handleItemHover(null)}
          >
            <div className="container">
              <div className="company-price">
                <div className="company-name">{value.name}</div>
                <div className="stock_Exchange">
                  <button>{value.stockExchange}</button>
                </div>
              </div>
              <div className="icon_Container">
                <div className="Icon">
                  {isHovered && value.isSelected ? (
                    <AiFillHeart color="black" />
                  ) : isHovered ? (
                    <AiOutlineHeart />
                  ) : null}
                </div>
              </div>
              <div>
                <div className="prices"> ₹{value.stockPrice}</div>

                <div
                  className={`price ${isPositive ? "green" : ""} ${
                    isNegative ? "red" : ""
                  }`}
                >
                  {value.stockValueChange}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default GetData;
