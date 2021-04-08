//irá aparecer os novos input's com novos valores a serem adicionados
var container = document.getElementById('container');
//container no qual irá aparecer o resultado final
var containerResultado = document.getElementById('resultado');
//variáveis a serem selecionsdas novos input's que não foram criados ainda
var rendaIndividual;
var rendaSolicitada;
//variáveis para serem adicionadas os resultados
var cadaumPaga = [];
var porcentagem;
var montante;
var result;
//cria novos input's para inserir novos dados
function mostrarNumeroDePessoas(){
    //comando para limpar o container caso já possua input's dentro
    container.innerHTML = ''
    //comando para limpar o resultado
    result = "<h2>Resultado:</h2>"
    renderResult();

    let InputNum = document.getElementById('numeroDePessoas');
    let numeroDePessoas = Number(InputNum.value);

    if(numeroDePessoas != 0){//se o 1° input estiver preenchido
        container.innerHTML += '<h2>Digite quanto cada pessoa ganha</h2>'
        //cria novos input's de acordo com a quantidade requisitada pelo client
        for(let i = 0; i < numeroDePessoas; i++){
            container.innerHTML += `<p>Renda da ${i+1}ª pessoa (R$):</p> <input type="number" placeholder="Renda da ${i+1}ª pessoa (R$)" class="rendaIndividual"><br>`
        }
        container.innerHTML += `<p>Valor da dívida:</p> <input type="number" placeholder="Valor da dívida (R$)" id="rendaSolicitada"> <br> <input class='botao' type="button" value="Calcular o resultado" onclick="calcResult()">`;
    }else{//se o primeiro input não está preenchido
        alert('Digite o número de pessoas do grupo que irão pagar a despesa!!!')
    }
    

}
//calcula o resultado
function calcResult(){
    //zera o valor das variáveis caso esteja recalculando
    porcentagem = 0;
    montante = 0;
    result = "<h2>Resultado:</h2>"
    //seleciona os input's que irão ser usados para manipular os dados
    rendaIndividual = document.getElementsByClassName('rendaIndividual');
    rendaSolicitada = document.getElementById('rendaSolicitada');
    //armazena o numero de pessoas
    let numDePessoas = Number(rendaIndividual.length);
    //condição que define se vai ou não calcular o código
    let prosseguir = true;
    for(let i = 0; i < numDePessoas; i++){
        if((rendaIndividual[i].value) == 0){
            prosseguir = false;
        }
    }
    if(rendaSolicitada.value == 0){
        prosseguir = false
    }

    if(prosseguir == true){//caso todos os campos estiverem preenchidos
        //calcula o montante
        for(let  i = 0; i < numDePessoas; i++){
            montante += Number(rendaIndividual[i].value);
        }
        montante = montante.toFixed(2);
        //calcula a porcentagem
        porcentagem = (Number(rendaSolicitada.value) / (montante / 100)).toFixed(2); 
        //calcula quanto cada um vai pagar
        for(let i = 0; i < numDePessoas; i++){
            cadaumPaga.push(( rendaIndividual[i].value * ( porcentagem / 100 )).toFixed(2));
        }
        prepareResult(numDePessoas);                
    } else {//se algum dos input estiver vazio
        result = '<h2>Resultado:</h2>'
        renderResult()
        alert('Preencha todos os campos para prosseguir!!!');
    }

}
//organiza o resultado dentro de tags HTML
function prepareResult(x) {
    result += `<p>Montante: R$${montante}</p> <p>Para pagar a dívida, cada pessoa ultilizará ${porcentagem}% de sua renda individual.</p>`
    for(let i = 0; i < x;i++){
        result += `<p>A ${i+1}ª pessoa ultilizará R$${cadaumPaga[i]} de sua renda.</p>`
    }
    renderResult();
}
//renderiza o resultado no navegador
function renderResult() {
    containerResultado.innerHTML = result
}

//mostrar ou ocultar as instruções
var instruçõescontainer = document.getElementById('instruçõescontainer');
function mostrarOcultar() {
    instruçõescontainer.classList.toggle('ocult');
}
