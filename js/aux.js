document.getElementById('gera_restricoes').addEventListener(
    'click', gerarRestricoes, false
);

function deixaInteiros(e){
    var value = e.value;
    value = value.replace(/\D/g, "");
    e.value = value
}

function gerarRestricoes(e){
    document.getElementById('restricoes').innerHTML = ''
    e.preventDefault();
    var num_variavies = document.getElementById('num_variavies').value;
    var num_restricoes = document.getElementById('num_restricoes').value;

    for(var j=0; j<num_restricoes; j++) {
        var line = "<div class='restricao'>";
        for(var i=1;i<=num_variavies;i++) {
            if(j == 0 && i == 1) {
                line += "<span>Z = </span>";
            }
            line += "<input data-zx='" + i + "' />";
            line += "<span>x" + i;
            if (i == num_variavies) {
                line += " <= <input data-zx='" + j+i + "' />";
            } else {
                line += " + ";
            }
            line += "</span>";
        }
        line += "</div>";
        document.getElementById('restricoes').innerHTML += line;
    }
}