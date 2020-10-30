import React from 'react';

const CardProducts = ({ name, price, urlImage, index, classImg }) => {
  return (
    <div className="details-product">
      <div className="title-product" data-testid={`${index}-product-name`}>{name}</div>
      <img className={classImg} data-testid={`${index}-product-img`} src={urlImage} />
      <div className="product-price" data-testid={`${index}-product-price`}>{`R$ ${price.toFixed(2).toString().replace('.', ',')}`}</div>
    </div >
  );
}

export default CardProducts;
