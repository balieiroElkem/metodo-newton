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
    // let x = math.clone(x0);
    // let iteracoes = 0;

    // while (iteracoes < maxIter) {
    //     let fx = f.evaluate({ x: x });
    //     let jacobian = calcularJacobian(df, x);
    //     let delta = math.lusolve(jacobian, math.multiply(-1, fx)).valueOf();

    //     x = math.add(x, delta);

    //     if (normaEuclidiana(delta) < epsilon) {
    //         return x;
    //     }

    //     iteracoes++;
    // }

    // throw new Error('Não foi possível encontrar uma solução dentro do número máximo de iterações.');
}

function normaEuclidiana(vetor) {
    return math.norm(vetor);
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

    // let jacobian = math.zeros(x.length, x.length);

    // for (let i = 0; i < x.length; i++) {
    //     for (let j = 0; j < x.length; j++) {
    //         jacobian._data[i][j] = df[i].evaluate({ x: x });
    //     }
    // }

    // return jacobian;
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