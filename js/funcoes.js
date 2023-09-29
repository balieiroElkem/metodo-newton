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

function calcula(equacao1, equacao2, pontx1, pontx2) {
    let variaveisEqua = removerDuplicatas([...identificarVariaveis(equacao1), ...identificarVariaveis(equacao2)]);

    const matrizJacobiana = jacobiana(equacao1, equacao2, variaveisEqua[0], variaveisEqua[1], pontx1, pontx2);
    const matrizEquacao = formatMatrizEquacao(equacao1, equacao2, variaveisEqua[0], variaveisEqua[1], pontx1, pontx2);
    const resultMultiply = math.multiply(math.inv(matrizJacobiana), matrizEquacao);
    const resultx1 = math.add(math.matrix([[pontx1],[pontx2]]), resultMultiply);
    return resultx1;
}

function jacobiana(equacao1, equacao2, variavel1, variavel2, pontx1, pontx2) {
    let obj = {};
    obj[variavel1] = pontx1;
    obj[variavel2] = pontx2;
    let jacobiana = math.matrix([
        [derivada(equacao1, variavel1).evaluate(obj), derivada(equacao1, variavel2).evaluate(obj)],
        [derivada(equacao2, variavel1).evaluate(obj), derivada(equacao2, variavel2).evaluate(obj)]
    ]);
    return jacobiana;
}

function formatMatrizEquacao(equacao1, equacao2, variavel1, variavel2, pontx1, pontx2) {
    let obj = {};
    obj[variavel1] = pontx1;
    obj[variavel2] = pontx2;
    let matriz = math.matrix([
        [math.evaluate(equacao1, obj)],
        [math.evaluate(equacao2, obj)]
    ]);
    return matriz;
}

function derivada(equacao, variavel) {
    variavel = math.parse(variavel);
    return math.derivative(equacao, variavel);
}

function removerDuplicatas(array) {
    return [...new Set(array)];
}

function identificarVariaveis(equacao) {
    return equacao.match(/[a-zA-Z]/g);
}