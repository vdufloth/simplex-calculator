// Regras do Simplex
// Identificar função objetivo
// Identificar as restrições
// Criar tabela
let linhaTabela1 = [1, -7, -7.45, 4, 0]
let linhaTabela2 = [0, -1, 2, -2, 10]
let linhaTabela3 = [0, 1, 0, -2, 20]
let linhaTabela4 = [0, 5, 2, 5, 5]
let dadosTabela = [linhaTabela1, linhaTabela2, linhaTabela3, linhaTabela4]

let colunaPivo
let linhaPivo
let valorPivo

function getPivos(){
    let nColunas = dadosTabela[0].length
    colunaPivo = 0
    // Coluna Pivô = O menor valor da primeira linha
    let menorValor = dadosTabela[0][0]
    for (j=1; j < nColunas; j++){
        if (dadosTabela[0][j] < menorValor) {
            menorValor = dadosTabela[0][j]
            colunaPivo = j
        }
    }
    console.log('Coluna pivô: ' + colunaPivo + ' com valor: ' + menorValor)
    // Linha Pivô = Elemento independente (ultima coluna) dividido pelo valor da sua linha na coluna pivô
    // Seleciona a com o menor valor dentre os valores positivos dessas divisões
    linhaPivo = 0
    ultimaColuna = nColunas-1
    menorValor = (dadosTabela[1][ultimaColuna] / dadosTabela[1][colunaPivo])
    for (i=2; i < dadosTabela.length; i++){
        divisao = (dadosTabela[i][ultimaColuna] / dadosTabela[i][colunaPivo])
        if ((divisao > 0) && (divisao < menorValor)){
            menorValor = divisao
            linhaPivo = i
        }
    }
    console.log('Linha pivô:  ' + colunaPivo + ' com valor de divisão: ' + menorValor)
    valorPivo = dadosTabela[linhaPivo][colunaPivo]
    console.log('Valor pivô:  ' + valorPivo)
}

function printTabela(){}

function gerarNovaTabela(){}

function verificarSolucaoOtima(){ return false }

getPivos()