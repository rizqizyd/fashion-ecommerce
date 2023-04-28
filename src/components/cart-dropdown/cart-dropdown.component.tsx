import { useCallback, useState, useMemo } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

// useMemo
// const sleep = (milliseconds: number): void => {
//   var start = new Date().getTime();
//   for (let i = 0; i < 1e7; i++) {
//     if (new Date().getTime() - start > milliseconds) {
//       break;
//     }
//   }
// };

const CardDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  // useCallback
  // const [temp, setTemp] = useState("A");

  // As long as this dependency array value does not change, then react will always give you back the same function
  // Now React does not need to re initialize this function every time it comes and hits line 20 on a render or a re-render.
  const goToCheckoutHandler = useCallback(() => {
    // react memoizes the value. useCallback
    // console.log(temp);
    navigate("/checkout");
  }, []);

  // useMemo
  // const [count, setCount] = useState(0);

  // So any time you reference it, it will now be using that memoized value
  // const hundredCount = useMemo(() => {
  //   console.log("start");
  //   sleep(2000);
  //   console.log("end");
  //   return 100 + count;
  //   // unless whatever dependency you pass inside this dependency rate changes.
  // }, [count]);

  return (
    <CartDropdownContainer>
      <CartItems>
        {/* {hundredCount} */}
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
      {/* <Button onClick={() => setCount(count + 1)}>GO TO CHECKOUT</Button> */}
      {/* <Button onClick={() => setTemp("B")}>Update</Button> */}
    </CartDropdownContainer>
  );
};

export default CardDropdown;
