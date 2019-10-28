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
let linhaTabela1 = [1, -5, 3, -4, 1, 0, 0, 0, 0]
let linhaTabela2 = [0, 1, 1, 1, 1, 1, 0, 0, 600]
let linhaTabela3 = [0, 2, 0, 1, 0, 0, 1, 0, 280]
let linhaTabela4 = [0, 1, 0, 0, 3, 0, 0, 1, 150]
let dadosTabela = [linhaTabela1,
    linhaTabela2,
    linhaTabela3,
    linhaTabela4]
// */
let nColunas
let colunaPivo
let linhaPivo
let valorPivo
let NLP // Nova Linha Pivô

function getPivos() {
    nColunas = dadosTabela[0].length
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
}

function printTabela() {
    let divTabela = document.getElementById("divTabela")
    divTabela.innerHTML = 'Alou'
}

function verificarSolucaoOtima() { return false }

getPivos()
gerarNLP()
gerarNovaTabela()
printTabela()