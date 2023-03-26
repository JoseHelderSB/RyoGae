const access_key = "bD9w6dE9UDLlocekLBBruxBcLf89Hyeh";

const url = `https://api.currencylayer.com/live?access_key=${access_key}&currencies=JPY,BRL`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.quotes.USDBRL);
    console.log(data.quotes.USDJPY);
  });

const form = document.querySelector('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('from').value;
  const toCurrency = document.getElementById('to').value;

  const url = `https://api.currencylayer.com/live?access_key=${access_key}&currencies=${fromCurrency},${toCurrency}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // imprime os dados retornados pela API no console
      const rate = data.quotes[`USD${toCurrency}`] / data.quotes[`USD${fromCurrency}`];
      const convertedAmount = amount * rate;
      result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    })
    .catch(error => {
      result.textContent = "Ocorreu um erro ao converter as moedas. Por favor, tente novamente mais tarde.";
    });
});
