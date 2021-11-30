const lista = [1,2,3,4,5,6];

const novalista = lista.map(function(item){
  return item*2;
})

console.log(novalista)

const soma = lista.reduce(function(total,proximo){
  return total+proximo;
})

const find = lista.find(function(item){
  return item===6;
})
console.log(find)
console.log(soma)