const display = document.getElementById('display');
const buttons = document.getElementById('buttons');

// Funciones flecha
const sumar = (a, b) => `${parseFloat(a) + parseFloat(b)}`;
const restar = (a, b) => `${parseFloat(a) - parseFloat(b)}`;
const multiplicar = (a, b) => `${parseFloat(a) * parseFloat(b)}`;
const dividir = (a, b) => {
  if (parseFloat(b) === 0) return 'Error';
  return `${parseFloat(a) / parseFloat(b)}`;
};

buttons.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if (value !== undefined) {
    if (value === '±') {
      if (display.value.startsWith('-')) {
        display.value = display.value.slice(1);
      } else {
        display.value = '-' + display.value;
      }
    } else if (value === '.') {
      const lastNumber = display.value.split(/[-+*/]/).pop();
      if (!lastNumber.includes('.')) display.value += value;
    } else {
      display.value += value;
    }
  }

  if (action === 'clear') {
    display.value = '';
  }

  if (action === 'calculate') {
    try {
      const match = display.value.match(/^(-?\d+(\.\d+)?)([+\-*/])(-?\d+(\.\d+)?)$/);
      if (!match) throw new Error("Formato inválido");

      const num1 = match[1];
      const operador = match[3];
      const num2 = match[4];

      let resultado;
      switch (operador) {
        case '+':
          resultado = sumar(num1, num2);
          break;
        case '-':
          resultado = restar(num1, num2);
          break;
        case '*':
          resultado = multiplicar(num1, num2);
          break;
        case '/':
          resultado = dividir(num1, num2);
          break;
        default:
          resultado = 'Error';
      }

      display.value = `${resultado}`;
    } catch (e) {
      alert('Expresión inválida');
    }
  }
});
