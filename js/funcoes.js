function renderFormula() {
    const parcela1 = document.getElementById("parcela1").value;
    const parcela2 = document.getElementById("parcela2").value;
    katex.render(
        `\\begin{cases}${parcela1} \\\\${parcela2}\\end{cases}`,
        document.getElementById("formula"),
        { displayMode: true }
    );
}

function divideEquacaoPorSinal(equacao) {
    return equacao.split(/[+,-\s]+/);
}

function calcula(equacao1, equacao2, pontx1, pontx2, precisao) {
    const MAX_INTERACOES = 6;
    let variaveisEqua = removerDuplicatas([...identificarVariaveis(equacao1), ...identificarVariaveis(equacao2)]);

    let x = 0;
    let k = 1;
    let norma = 0;
    let max = 0;
    do {
        let matrizJacobiana = jacobiana(equacao1, equacao2, variaveisEqua[0], variaveisEqua[1], pontx1, pontx2);
        let matrizEquacao = formatMatrizEquacao(equacao1, equacao2, variaveisEqua[0], variaveisEqua[1], pontx1, pontx2);

        let s = math.multiply(math.inv(matrizJacobiana), math.multiply(matrizEquacao, -1));
        x = math.add(math.matrix([[pontx1], [pontx2]]), s); // aqui vem o valor de x1

        norma = calculaNorma(formatMatrizEquacao(equacao1, equacao2, variaveisEqua[0], variaveisEqua[1], math.row(x, 0).toArray()[0][0], math.row(x, 1).toArray()[0][0]));
        let x_inicial1 = pontx1;
        let x_inicial2 = pontx2; 
        pontx1 = math.row(x, 0).toArray()[0][0];
        pontx2 = math.row(x, 1).toArray()[0][0]; 
        max = math.max(math.abs(math.subtract(math.matrix([[pontx1], [pontx2]]), math.matrix([[x_inicial1], [x_inicial2]]))));
    } while (++k <= MAX_INTERACOES && norma > precisao && max > precisao);

    // 4x-x^3+y
    // -x^2/9+(4y-y^2)/4+1
    return [{variavel1:variaveisEqua[0], variavel2:variaveisEqua[1]}, math.round(x, 5)];
    // return [{variavel1:variaveisEqua[0], variavel2:variaveisEqua[1]}, x];
}

function jacobiana(equacao1, equacao2, variavel1, variavel2, pontx1, pontx2) {
    let obj = {};
    obj[variavel1] = pontx1;
    obj[variavel2] = pontx2;
    const jacobiana = math.matrix([
        [derivada(equacao1, variavel1).evaluate(obj), derivada(equacao1, variavel2).evaluate(obj)],
        [derivada(equacao2, variavel1).evaluate(obj), derivada(equacao2, variavel2).evaluate(obj)]
    ]);
    return jacobiana;
}

function formatMatrizEquacao(equacao1, equacao2, variavel1, variavel2, pontx1, pontx2) {
    let obj = {};
    obj[variavel1] = pontx1;
    obj[variavel2] = pontx2;
    const matriz = math.matrix([
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

function calculaNorma(matriz) {
    return math.norm(matriz, 'fro');
}