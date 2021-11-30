function entrar(){
  var area = document.getElementById('area');
  var texto = prompt('Digite seu nome');

  if(texto=='' || texto == null){
    alert('digite seu nome novamente')
    area.innerHTML = 'bem vindo ...';
  }
  else{
    area.innerHTML = 'bem vindo ' + texto;
  }
}

function entrar2(nome, idade){
  var area = document.getElementById('area2');
  var texto = prompt('Digite seu sobrenome');
  area.innerHTML = nome + " " + texto + " idade: " + idade;
}