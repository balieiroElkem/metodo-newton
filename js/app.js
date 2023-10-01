window.onload = () => {
    document.querySelectorAll(".input-equacao").forEach(element => {
        element.addEventListener('keyup', renderFormula);
    });

    document.getElementById("formPrincipal").addEventListener('submit', function (event) {
        event.preventDefault();
        let primeiraParcela = this.querySelector("#parcela1").value;
        let segundaParcela = this.querySelector("#parcela2").value;
        let pontoX1 = this.querySelector("#pontox_1").value;
        let pontoX2 = this.querySelector("#pontox_2").value;
        let precisao = this.querySelector("#precisao").value;
        if (!primeiraParcela || !segundaParcela || !pontoX1 || !pontoX2 || !precisao) {
            alert("Todas os campos têm que serem preenchidos");
            return false;
        }
        let result = calcula(primeiraParcela, segundaParcela, pontoX1, pontoX2, precisao);
        const matriz = `\\begin{bmatrix} ${math.row(result[1], 0).toArray()} \\\\ ${math.row(result[1], 1).toArray()} \\end{bmatrix}`;
        const variaveis = `\\begin{array}{l}${result[0].variavel1} \\\\${result[0].variavel2}\\end{array}`;
        katex.render(matriz, document.getElementById("matriz"));
        katex.render(variaveis, document.getElementById("variaveis"));
    });
}