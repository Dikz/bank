if (localStorage.getItem("dinheiro") === null) {
	localStorage.setItem("dinheiro", 4000);
}
if (localStorage.getItem("nome") === null) {
	localStorage.setItem("nome", "Gabriel");
}
var money = Number(localStorage.getItem("dinheiro"));
var campoMoney = document.getElementById('campomoney');
var dinheiro = document.getElementById('dinheiro');
var totalSaque=0;
var totalDeposito=0;

document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById('username').innerHTML = localStorage.getItem("nome");
	verSaldo();
});


//Function de Saldo
function verSaldo(){
	//campoMoney.style.display = "block";
	dinheiro.innerHTML = "";
	dinheiro.innerHTML += money;
}

//Function de Saque
function sacar(){
	var valSaque = prompt("Digite o valor que quer sacar: ");

	//Verifica se nenhum valor foi passado
	if(valSaque == null){
		document.getElementById('textresult').innerHTML = "<i class='fas fa-keyboard'> <i/>Você não digitou nenhum valor!";
		document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 col-xs-8 col-xs-2 alert-info animated fadeInDown 3s";
	} else {
		valSaque = Number(valSaque);

		//Verifica se tem a quantidade de money para saque.
		if(valSaque > money){
			document.getElementById('textresult').innerHTML = "<i class='fas fa-exclamation-triangle' style='color: red;'> <i/>Eitaa! Você não tem isso tudo.";
			document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 alert-warning animated fadeInUp 3s";
		} else {

			//Verifica se não é um numero
			if(isNaN(valSaque)){
				document.getElementById('textresult').innerHTML = "<i class='fas fa-window-close' style='color: red;'> <i/>O valor digitado não é um numero!";
				document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 alert-dark animated fadeInDown 3s";
			} else {
				//Se for um numero ->
				money = money - valSaque;

				//Mensagem de Resultado
				document.getElementById('textresult').innerHTML = "<i class='fas fa-minus-square'> <i/>Você sacou R$" + valSaque;
				document.getElementById('actionresult').style.display = "block";
				document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 alert-danger";
				dinheiro.innerHTML = money;
				document.getElementById('historico').innerHTML += "<tr class='table-danger'><td><i class='fas fa-minus-square' style='color: red;'><i/></td><td>Saque</td><td>"+valSaque+"</td></tr>"
				totalSaque = totalSaque + valSaque;
				
				//Armazenamento do money
				parseInt(money);
				localStorage.setItem("dinheiro", money);
				verificaMoney();
			}

		}

	}
}

function depositar(){
	var valDeposito = prompt("Digite o valor de deposito: ");

	if(valDeposito == null){
		document.getElementById('textresult').innerHTML = "<i class='fas fa-keyboard'> <i/>Você não digitou nenhum valor!";
		document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 col-xs-8 col-xs-2 alert-info animated fadeInDown 3s";
	} else {
	
		valDeposito = Number(valDeposito);
		if(isNaN(valDeposito)){
			document.getElementById('textresult').innerHTML = "<i class='fas fa-window-close' style='color: red;'> <i/>O valor digitado não é um numero!";
			document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 alert-dark animated fadeInDown 3s";
		} else {
			money = money + valDeposito;

			document.getElementById('textresult').innerHTML = "<i class='fas fa-plus-circle'> <i/>Você depositou R$" + valDeposito;
			document.getElementById('actionresult').style.display = "block";
			document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 alert-success animated fadeInDown 3s";
			dinheiro.innerHTML = money;
			document.getElementById('historico').innerHTML += "<tr class='table-success'><td><i class='fas fa-plus-circle' style='color: green;'><i/></td><td>Deposito</td><td>"+valDeposito+"</td></tr>"

			totalDeposito = totalDeposito + valDeposito;
			
			//Armazenamento do money
			localStorage.setItem("dinheiro", money);
			verificaMoney();
		}
	}
}

function verificaMoney(){
	//Disable - Caso acabar o dinheiro
	if(money <= 0){
		document.getElementById('btnSacar').disabled = true;
		//document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 alert-dark";
		//document.getElementById('textresult').innerHTML = "<i class='fas fa-ban'> <i/>Você agora deve R$" + money;
	} else {
		document.getElementById('btnSacar').disabled = false;
	}
}

function verRelatorio(){
	document.getElementById('bodyRelatorio').innerHTML = "<h5>Valor em saques: R$"+ totalSaque +"</h5><h5>Valor em depositos: R$"+ totalDeposito + "</h5>";
}

function limparHistorico(){
	document.getElementById('historico').innerHTML = "";
	document.getElementById('textresult').innerHTML = "<i class='fas fa-broom'> <i/>Tabela de Historico Limpa!";
	document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 alert-warning animated fadeInDown 3s";
}

function mudarNome(){
	var username = prompt("Digite seu nome: ");

	if(username == null){
		document.getElementById('textresult').innerHTML = "<i class='fas fa-user-alt-slash'> <i/>Você não digitou nenhum nome!";
		document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 col-xs-8 col-xs-2 alert-info animated fadeInDown 3s";
	} else {
		localStorage.setItem("nome", username);
		document.getElementById('username').innerHTML = localStorage.getItem("nome");
		document.getElementById('textresult').innerHTML = "<i class='fas fa-user-edit'> <i/>Nome alterado com sucesso!";
		document.getElementById("actionresult").className = "alert col-md-8 offset-md-2 alert-success animated fadeInDown 3s";
	}
}