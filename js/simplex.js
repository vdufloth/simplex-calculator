//Globais:
let varColunas
let dadosTabela
let oldTabela
let nColunas
let colunaPivo
let linhaPivo
let valorPivo
let NLP
let nTabelas
let otima
let lIntermediariaAux

function encontrarPivos() {
    colunaPivo = 0
    // Coluna Pivô = O menor valor da primeira linha
    let menorValor = dadosTabela[0][0]
    for (j = 1; j < nColunas; j++) {
        if (dadosTabela[0][j] < menorValor) {
            menorValor = dadosTabela[0][j]
            colunaPivo = j
        }
    }
    console.log('Coluna pivô: ' + colunaPivo + ' com valor: ' + menorValor)
    // Linha Pivô = Elemento independente (ultima coluna) dividido pelo valor da sua linha na coluna pivô
    // Seleciona a com o menor valor dentre os valores positivos dessas divisões
    linhaPivo = 0
    ultimaColuna = nColunas - 1
    menorValor = (dadosTabela[1][ultimaColuna] / dadosTabela[1][colunaPivo])
    for (i = 2; i < dadosTabela.length; i++) {
        divisao = (dadosTabela[i][ultimaColuna] / dadosTabela[i][colunaPivo])
        if ((divisao > 0) && (divisao < menorValor)) {
            menorValor = divisao
            linhaPivo = i
        }
    }
    console.log('Linha pivô:  ' + linhaPivo + ' com valor de divisão: ' + menorValor)
    valorPivo = dadosTabela[linhaPivo][colunaPivo]
    console.log('Valor pivô:  ' + valorPivo)
}

function mostrarTabela() {
    let calculosabela = document.getElementById("calculos")
    let tabela = document.createElement('table')
    tabela.className = 'table'

    let header = tabela.createTHead()
    header.className = 'thead-dark'
    let headerRow = header.insertRow(-1)
    for (j = 0; j < varColunas.length; j++) {
        let th = document.createElement('th')
        th.innerText = varColunas[j]
        headerRow.appendChild(th)
    }

    let tbody = tabela.createTBody()
    for (i = 0; i < dadosTabela.length; i++) {
        let novaLinha = tbody.insertRow(-1)
        for (j = 0; j < nColunas; j++) {
            let novaCelula = novaLinha.insertCell(-1)
            novaCelula.id = "T" + nTabelas + "I" + i + "J" + j
            novaCelula.innerText = dadosTabela[i][j]

            if (!otima) {
                if (j == colunaPivo || i == linhaPivo) {
                    if (j == colunaPivo && i == linhaPivo) {
                        novaCelula.className = "table-secondary"
                    } else {
                        novaCelula.className = "table-active"
                    }
                }
            } else if (i == 0 && j == nColunas - 1) {
                novaCelula.className = "table-success"
            }
        }
    }
    calculosabela.appendChild(tabela)
    calcularVBS()
}

function mostrarNLP() {
    let calculosabela = document.getElementById("calculos")
    let tabela = document.createElement('table')
    tabela.className = 'table'
    let dvText = document.createElement('div')
    dvText.innerHTML = '<b>Nova Linha Pivô:</b>'
    calculosabela.appendChild(dvText)
    let tbody = tabela.createTBody()
    let novaLinha = tbody.insertRow(-1)
    let novaCelula = novaLinha.insertCell(-1)
    novaCelula.innerText = 'LP='
    for (j = 0; j < nColunas; j++) {
        novaCelula = novaLinha.insertCell(-1)
        novaCelula.innerText = dadosTabela[linhaPivo][j]
    }
    novaCelula = novaLinha.insertCell(-1)
    novaCelula.innerText = '(÷' + valorPivo + ')'

    novaLinha = tbody.insertRow(-1)
    novaCelula = novaLinha.insertCell(-1)
    novaCelula.innerText = 'NLP ='
    for (j = 0; j < NLP.length; j++) {
        let novaCelula = novaLinha.insertCell(-1)
        novaCelula.innerText = NLP[j]
    }
    novaCelula = novaLinha.insertCell(-1)
    novaCelula.innerText = ''
    calculosabela.appendChild(tabela)
}

function mostrarCalculos() {
    let calculosabela = document.getElementById("calculos")
    for (l = 0; l < oldTabela.length; l++) {
        if (l !== linhaPivo) {
            let tabela = document.createElement('table')
            tabela.className = 'table'
            let dvText = document.createElement('div')
            dvText.innerHTML = '<b>Nova Linha ' + (l + 1) + ':</b>'
            calculosabela.appendChild(dvText)
            let tbody = tabela.createTBody()
            let novaLinha = tbody.insertRow(-1)
            let novaCelula = novaLinha.insertCell(-1)
            novaCelula.innerText = 'NLP='
            for (j = 0; j < nColunas; j++) {
                novaCelula = novaLinha.insertCell(-1)
                novaCelula.innerText = NLP[j]
            }
            novaCelula = novaLinha.insertCell(-1)
            novaCelula.innerText = '*-(' + oldTabela[l][colunaPivo] + ')'

            novaLinha = tbody.insertRow(-1)
            novaCelula = novaLinha.insertCell(-1)
            novaCelula.innerText = ' ='
            for (j = 0; j < NLP.length; j++) {
                let novaCelula = novaLinha.insertCell(-1)
                novaCelula.innerText = lIntermediariaAux[l][i]
            }
            novaCelula = novaLinha.insertCell(-1)
            novaCelula.innerText = '+'

            novaLinha = tbody.insertRow(-1)
            novaCelula = novaLinha.insertCell(-1)
            novaCelula.innerText = ' Antiga='
            for (j = 0; j < NLP.length; j++) {
                let novaCelula = novaLinha.insertCell(-1)
                novaCelula.innerText = oldTabela[l][j]
            }
            novaCelula = novaLinha.insertCell(-1)
            novaCelula.innerText = ''

            novaLinha = tbody.insertRow(-1)
            novaCelula = novaLinha.insertCell(-1)
            novaCelula.innerText = ' NL' + (l + 1) + '='
            for (j = 0; j < NLP.length; j++) {
                let novaCelula = novaLinha.insertCell(-1)
                novaCelula.innerText = dadosTabela[l][j]
            }
            novaCelula = novaLinha.insertCell(-1)
            novaCelula.innerText = ''

            calculosabela.appendChild(tabela)
        }
    }
}
/* Nova linha é NLP vezes
o elemento na intersecção da sua linha
com sinal contrário
   somado com os valores da linha antiga) */
function recalcularTabela() {
    //NLP
    NLP = []
    for (j = 0; j < nColunas; j++) {
        NLP[j] = (dadosTabela[linhaPivo][j] / valorPivo)
    }
    console.log('NLP: ' + NLP)
    mostrarNLP()
    //FIM NLP

    lIntermediariaAux = []
    nTabelas += 1
    let novaTabela = [];
    for (i = 0; i < dadosTabela.length; i++) {
        novaTabela[i] = new Array(nColunas);
        lIntermediariaAux[i] = new Array(nColunas);
    }
    console.log('Novas Linhas:')
    for (i = 0; i < dadosTabela.length; i++) {
        for (j = 0; j < nColunas; j++) {
            if (i === linhaPivo) {
                novaTabela[i][j] = NLP[j]
            } else {
                lIntermediariaAux[i][j] = dadosTabela[i][colunaPivo] * -1 * NLP[j]
                novaTabela[i][j] = lIntermediariaAux[i][j] + dadosTabela[i][j]
            }
        }
        console.log(i + ' : ' + novaTabela[i])
    }
    oldTabela = dadosTabela
    dadosTabela = novaTabela
    mostrarCalculos()
}

function verificarSolucao() {
    for (j = 0; j < nColunas - 1; j++) {
        if (dadosTabela[0][j] < 0) {
            return false
        }
    }
    return true
}

function calcularVBS() {
    let calculosabela = document.getElementById("calculos")
    let tableVB = document.createElement('table')
    tableVB.className = 'table'
    let vbHead = tableVB.createTHead();
    let vbBody = tableVB.createTBody();
    let novaLinha = vbHead.insertRow(-1)
    let novaCelula = novaLinha.insertCell(-1);
    novaCelula.innerText = 'Variáveis Básicas:'
    novaCelula = novaLinha.insertCell(-1);
    novaCelula.innerText = 'Variáveis Não Básicas:'
    novaCelula = novaLinha.insertCell(-1);
    novaCelula.innerText = 'Valor de Z'

    calculosabela.appendChild(tableVB)
}

function reformularRestricoes(e) {
    e.preventDefault()
    //gerar novas linhas e prencher a tabela
    var num_variavies = document.getElementById('num_variavies').value;
    var num_restricoes = document.getElementById('num_restricoes').value;
    varColunas = ['Z']
    for(i=1; i <= num_variavies; i++){
        varColunas.push('X'+i);
    }
    for(i=1; i <= (parseInt(num_restricoes)+1); i++){
        varColunas.push('XF'+i);
    }
    varColunas.push('b');
    nColunas = varColunas.length
    dadosTabela = [];
    for (i = 0; i <= num_restricoes; i++) {
        dadosTabela.push(new Array(nColunas));
    }
    //Primeira Coluna
    dadosTabela[0][0] = 1
    for (i = 1; i <= num_restricoes; i++) {
        dadosTabela[i][0] = 0
    }//end Primeira coluna   
    var valoresExpressoes = []
    document.getElementById("valores_form")
            .querySelectorAll("input").forEach((input) => {
                valoresExpressoes.push(input.value)
            })
    //colunas do meio
    console.log(valoresExpressoes)
    for (i=0;i <=num_restricoes; i++){
        for(j=1; j<nColunas; j++){
            if (i == 0) { //linha Z
                if (j <= (num_restricoes)) {
                    dadosTabela[i][j] = valoresExpressoes[j-1]
                } else {
                    dadosTabela[i][j] = 0
                }
            } else { //outras linhas
                if (j <= (num_restricoes)) {
                    dadosTabela[i][j] = valoresExpressoes[(/*calculo maluco*/)]
                } else { // 0 menos na do seu xf1
                    dadosTabela[i][j] = 0
                }
            }
        }
    }//end colunas do meio
    console.log(dadosTabela)

    NLP = []
    nTabelas = 0
    otima = false
    document.getElementById('novas_restricoes').innerHTML += '<button class="btn btn-primary" onclick="calcularSimplex()">Calcular Tabelas</button>'
}

function valoresTeste(){
    /// DEVO PREECNEHR
    varColunas = ['Z', 'x1', 'x2', 'x3', 'x4', 'xF1', 'xF2', 'xF3', 'b']
    let linhaTabela1 = [1, -5, 3, -4, 1, 0, 0, 0, 0]
    let linhaTabela2 = [0, 1, 1, 1, 1, 1, 0, 0, 600]
    let linhaTabela3 = [0, 2, 0, 1, 0, 0, 1, 0, 280]
    let linhaTabela4 = [0, 1, 0, 0, 3, 0, 0, 1, 150]
    dadosTabela = [linhaTabela1, linhaTabela2, linhaTabela3, linhaTabela4]
    oldTabela = dadosTabela
    nColunas = dadosTabela[0].length
    NLP = []
    nTabelas = 0
    otima = false
}

function calcularSimplex() {
    let calculosabela = document.getElementById("calculos")
    calculosabela.innerHTML = ''

    valoresTeste()
    while (!otima) {
        encontrarPivos()
        mostrarTabela()
        recalcularTabela()
        if (verificarSolucao()) {
            otima = true
            mostrarTabela()
        }
    }
}