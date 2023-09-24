window.onload = () => {
    document.querySelector(".input-equacao").addEventListener('keyup', renderFormula);

    document.getElementById("formPrincipal").addEventListener('submit', function (event) {
        event.preventDefault();
        const equacao = this.querySelector(".input-equacao").value;
    });
}