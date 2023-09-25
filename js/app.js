window.onload = () => {
    document.querySelectorAll(".input-equacao").forEach(element => {
        element.addEventListener('keyup', renderFormula);
    });

    document.getElementById("formPrincipal").addEventListener('submit', function (event) {
        event.preventDefault();
        let primeiraParcela = this.querySelector("#parcela1").value;
        let segundaParcela = this.querySelector("#parcela2").value;
        let monomoPrimeiraParcela = divideEquacaoPorSinal(primeiraParcela);
        let monomoSegundoParcela = divideEquacaoPorSinal(segundaParcela);
    });
}