const EXCHANGE_API = 'https://api.exchangerate-api.com/v4/latest/'

const currency_one = document.getElementById('currency-one'),
      amount_one = document.getElementById('amount-one'),
      currency_two = document.getElementById('currency-two'),
      amount_two = document.getElementById('amount-two'),

      btn = document.querySelector('.btn'),
      rateEl = document.getElementById('rate');

function caclulate(){
    const currencyOne = currency_one.value,
          currencyTwo = currency_two.value;
    
    fetch(`${EXCHANGE_API}${currencyOne}`)
    .then( res => res.json())
    .then( data => {
        const rate = data.rates[currencyTwo];
        rateEl.innerHTML = `1 ${currencyOne} =  <strong>${rate}</strong> ${currencyTwo}`;
        amount_two.value = (+amount_one.value * rate).toFixed(3)
    })
}

currency_one.addEventListener('change', caclulate);
amount_one.addEventListener('input', caclulate);
currency_two.addEventListener('change', caclulate);
amount_two.addEventListener('input', caclulate);

btn.addEventListener('click', e => {
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    caclulate();
});

caclulate();