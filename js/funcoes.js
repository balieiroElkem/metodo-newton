function renderFormula() {
    const textInput = document.querySelector(".input-equacao").value;
    const containerFormula = document.getElementById("formula");

    const formulaDigitada = `\\(${textInput}\\)`;

    containerFormula.innerHTML = formulaDigitada;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, containerFormula]);
    // MathJax.typeset([containerFormula]);
}