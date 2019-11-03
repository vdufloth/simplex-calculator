/* Regras do Simplex
1. Identificar função objetivo
2. Identificar restrições
3. Criar tabela (dadosTabela)
4. Identificar pivôs
5. Recalcular tabela
6. Verificar se é ótima
   Se não for, voltar ao passo 4
*/

//LEMBRAR DE ZERAR OS DADOS DA TABELA QUANDO PEGAR UMA NOVA

//* Ex1 -> Z = 1120
let varColunas = ['Z', 'x1', 'x2', 'x3', 'x4', 'xF1', 'xF2', 'xF3', 'b']
let linhaTabela1 = [1, -5, 3, -4, 1, 0, 0, 0, 0]
let linhaTabela2 = [0, 1, 1, 1, 1, 1, 0, 0, 600]
let linhaTabela3 = [0, 2, 0, 1, 0, 0, 1, 0, 280]
let linhaTabela4 = [0, 1, 0, 0, 3, 0, 0, 1, 150]
let dadosTabela = [linhaTabela1,
                   linhaTabela2,
                   linhaTabela3,
                   linhaTabela4]
// */
let oldTabela = dadosTabela
let nColunas = dadosTabela[0].length
let colunaPivo
let linhaPivo
let valorPivo
let NLP // Nova Linha Pivô
let nTabelas = 0
let otima = false

function getPivos() {
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

// Linha selecionada dividido pelo elemento pivô
function gerarNLP() {
    NLP = []
    for (j = 0; j < nColunas; j++) {
        NLP[j] = (dadosTabela[linhaPivo][j] / valorPivo)
    }
    console.log('NLP: ' + NLP)
}

/* Nova linha é NLP vezes
   o elemento na intersecção da sua linha
   com sinal contrário
   somado com os valores da linha antiga) */
function gerarNovaTabela() {
    nTabelas += 1
    let novaTabela = [];
    for (i = 0; i < dadosTabela.length; i++) {
        novaTabela[i] = new Array(nColunas);
    }
    console.log('Novas Linhas:')
    for (i = 0; i < dadosTabela.length; i++) {
        for (j = 0; j < nColunas; j++) {
            if (i === linhaPivo) {
                novaTabela[i][j] = NLP[j]
            } else {
                novaTabela[i][j] =
                    dadosTabela[i][colunaPivo] * -1
                    * NLP[j]
                    + dadosTabela[i][j]
            }
        }
        console.log(i + ' : ' + novaTabela[i])
    }
    oldTabela = dadosTabela
    dadosTabela = novaTabela
}

function printTabela() {
    let divTabela = document.getElementById("divt")
    let tabela = document.createElement('table')
    tabela.className = 'simplex'
    tabela.createCaption().innerHTML = 'Tabela '+nTabelas
    
    let header = tabela.createTHead()
    let headerRow = header.insertRow(-1)
    for (j=0; j<varColunas.length; j++){
        let th = headerRow.insertCell(-1)
        th.innerText = varColunas[j]
    }

    let tbody = tabela.createTBody()
    for (i=0; i<dadosTabela.length; i++) {
        let novaLinha = tbody.insertRow(-1)
        if (i === 0) {
            novaLinha.className = 'linhaZ'
        }
        for (j=0; j<nColunas; j++) {
            let novaCelula = novaLinha.insertCell(-1)
            novaCelula.id = "T"+nTabelas+"I"+i+"J"+j
            novaCelula.innerText = dadosTabela[i][j]

            if (j == colunaPivo || i == linhaPivo) {
                if (j == colunaPivo && i == linhaPivo) {
                    novaCelula.className = "elementoPivo"
                } else {
                    novaCelula.className = "pivo"
                }
            }

            if (i == 0 && j == nColunas-1 && otima) {
                novaCelula.className = "valorZ"
            }
        }
    }
    divTabela.appendChild(tabela)
}

function ehOtima() {
    console.log('verificando se solucao e otima')
    for (j=0; j<nColunas-1; j++){
        if (dadosTabela[0][j] < 0) {
            return false
        }
    }
    return true
}

function printNLP(){
    let divTabela = document.getElementById("divt")
    let tabela = document.createElement('table')
    tabela.className = 'nlp'
    let dvText = document.createElement('div')
    dvText.innerText = 'Nova Linha Pivô:'
    divTabela.appendChild(dvText)
    let tbody = tabela.createTBody()
    let novaLinha = tbody.insertRow(-1)
    novaLinha.className = 'nlp'
    let novaCelula = novaLinha.insertCell(-1)
    novaCelula.innerText = 'LP='
    for (j=0; j<nColunas; j++) {
        novaCelula = novaLinha.insertCell(-1)
        novaCelula.innerText = dadosTabela[linhaPivo][j]        
    }
    novaCelula = novaLinha.insertCell(-1)
    novaCelula.innerText = '(÷'+valorPivo+')'

    novaLinha = tbody.insertRow(-1)
    novaLinha.className = 'nlp'
    novaCelula = novaLinha.insertCell(-1)
    novaCelula.innerText = 'NLP ='
    for (j=0; j<NLP.length; j++) {
        let novaCelula = novaLinha.insertCell(-1)
        novaCelula.innerText = NLP[j]
    }
    novaCelula = novaLinha.insertCell(-1)
    novaCelula.innerText = ''
    divTabela.appendChild(tabela)
}

function calcularSimplex(){
    console.log('Iniciando calculo ')
    while(!ehOtima()) {
        getPivos()
      //  gerarVs()
      //  printVs()
        printTabela()
        gerarNLP()
        printNLP()
        gerarNovaTabela()
    }
}