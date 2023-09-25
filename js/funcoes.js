function renderFormula() {
    const parcela1 = document.getElementById("parcela1").value;
    const parcela2 = document.getElementById("parcela2").value;
    katex.render(
        `\\begin{array}{l}${parcela1} \\\\${parcela2}\\end{array}`,
        document.getElementById("formula"),
        { displayMode: true }
    );
}

function divideEquacaoPorSinal(equacao) {
    return equacao.split(/[+,-\s]+/);
}

function jocobiana(equacao1, equacao2) {

}

function derivada(equacao) {
    
}