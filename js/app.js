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
        let result = calcula(primeiraParcela, segundaParcela, pontoX1, pontoX2);
    });
}