import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../features/cart/cartSlice";
import { selectCartItem } from "../../../features/cart/cartSelectors";
import { createCartKey } from "../../../features/cart/cartHelpers";
import Button from "../../buttons/Button/Button";

// ===== Add to cart button =====
// Adds one price option to the cart and shows when it is already there.
// The quantity of physical books is changed in the cart.
// item: a cart item from createCartItem

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();

  const key = createCartKey(item.mediaType, item.id, item.format);
  const isInCart = Boolean(useSelector(selectCartItem(key)));

  return (
    <Button
      variant="secondary"
      size="small"
      onClick={() => dispatch(addItem(item))}
      disabled={isInCart}
    >
      {isInCart ? "In cart" : "Add"}
      {/* Tells screen readers what the button does and which option it belongs to */}
      <span className="visually-hidden">
        {!isInCart && " to cart"}: {item.label}
      </span>
    </Button>
  );
};

export default AddToCartButton;
