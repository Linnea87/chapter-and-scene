// ===== Add to cart button =====
// Adds one price option to the cart and shows when it is already there:
// a basket icon to add, a check mark when it is in the cart.
// When the option clashes with something in the cart, e.g. renting and buying
// the same movie, the user is asked which one to keep.
// The quantity of physical books is changed in the cart.
// item: a cart item from createCartItem

import { useDispatch, useSelector } from "react-redux";
import { Check, ShoppingBasket } from "lucide-react";
import useDisclosure from "../../../hooks/useDisclosure";
import { addItem, removeItem } from "../../../features/cart/cartSlice";
import {
  selectCartItem,
  selectCartItems,
} from "../../../features/cart/cartSelectors";
import {
  createCartKey,
  findConflictingItems,
} from "../../../features/cart/cartHelpers";
import Button from "../../ui/buttons/Button/Button";
import ReplaceItemDialog from "../ReplaceItemDialog/ReplaceItemDialog";

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();
  const { isOpen, open, close } = useDisclosure();

  const key = createCartKey(item.mediaType, item.id, item.format);
  const isInCart = Boolean(useSelector(selectCartItem(key)));
  const conflictingItems = findConflictingItems(
    useSelector(selectCartItems),
    item,
  );

  // --- Handlers ---
  const handleAdd = () => {
    if (conflictingItems.length > 0) {
      open();
      return;
    }

    dispatch(addItem(item));
  };

  // Removes the clashing items and adds the new one instead
  const handleReplace = () => {
    conflictingItems.forEach((cartItem) => dispatch(removeItem(cartItem.key)));
    dispatch(addItem(item));
    close();
  };

  // --- Render ---
  const Icon = isInCart ? Check : ShoppingBasket;

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        onClick={handleAdd}
        disabled={isInCart}
      >
        <Icon size={20} aria-hidden="true" />
        {/* Tells screen readers what the button does and which option it belongs to */}
        <span className="visually-hidden">
          {isInCart ? "In cart" : "Add to cart"}: {item.label}
        </span>
      </Button>

      <ReplaceItemDialog
        isOpen={isOpen}
        newItem={item}
        conflictingItems={conflictingItems}
        onKeep={close}
        onReplace={handleReplace}
      />
    </>
  );
};

export default AddToCartButton;
