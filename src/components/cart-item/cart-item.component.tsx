import { FC, memo } from "react";

import { CartItemConatainer, ItemDetails } from "./cart-item.styles";

import { CartItem as TCartItem } from "../../store/cart/cart.types";

type CartItemProps = {
  cartItem: TCartItem;
};

// with all 'memoization' that we've learned, unless the actual value changes, then we don't need to re render this component.
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemConatainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemConatainer>
  );
});

export default CartItem;
