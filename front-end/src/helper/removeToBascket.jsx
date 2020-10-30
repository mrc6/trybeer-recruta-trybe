const removeToBascket = (cart, name, setCart) => {
  const cart2 = JSON.parse(localStorage.getItem('cart'));
  if (cart2.length === 0) return;
  const removeIndex = cart2.findIndex((e) => e.name === name);
  if (removeIndex >= 0) {
    cart2.splice(removeIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart2));
    setCart(cart2);
  }
};

export default removeToBascket;
