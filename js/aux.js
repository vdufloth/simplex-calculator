$(document).ready(function() {
    gerarRestricoes();
    deixaInteiro();
});


function deixaInteiro(){
    $("#inputNX, #inputNR").on("focusout", function() {
        var value = $(this).val();
        value = value.replace(/\D/g, "");
        $(this).val(value);
    });
}

function gerarRestricoes(){
    $("#gera_restricoes").on("click", function(e) {
        e.preventDefault();

        var num_variavies = $("#inputNX").val();
        var num_restricoes = $("#inputNR").val();

        for(var j=0; j<num_restricoes; j++) {
            var line = "<div class='restricao'>";
            for(var i=1;i<=num_variavies;i++) {
                if(j == 0 && i == 1) {
                    line += "<span>Z = </span>";
                }
                line += "<input data-zx='" + i + "' />";
                line += "<span>x" + i;
                if (i < num_variavies) {
                    line += " + ";
                }
                line += "</span>";
            }
            line += "</div>";

            $("#divret").append(line);
        }
    });
}