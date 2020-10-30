// Salve o localStorage em uma variável
const cart = [
  { 'Skol Lata 250ml': 2.20 },
  { 'Heineken 600ml': 7.50 },
  { 'Antarctica Pilsen 300ml': 2.49 },
  { 'Brahma 600ml': 7.50 },
  { 'Skol Lata 250ml': 2.20 },
];

console.log('Carrinho antes da remoção: ', cart);

// Criando um array com os nomes das keys das chaves
const quantityArray = cart.map((e) => Object.keys(e));
const quantityKeysArray = quantityArray.map((e) => e[0]);

const removeItem = 'Skol Lata 250ml';
console.log('Item que quero remover: ', removeItem);

// Achando o indice dele na lista
const itemRemoveIndex = quantityKeysArray.findIndex((e) => e === removeItem);
console.log('Primeiro item encontrado com o índice: ', itemRemoveIndex);

// Excluindo do array
cart.splice(itemRemoveIndex, 1);
console.log('Carrinho depois da exclusão: ', cart);

// Sobreescreva o localStorage como novo conteudo de cart
