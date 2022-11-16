const RATE_API:string = 'https://api.exchangerate-api.com/v4/latest/';

const currency_one = document.getElementById('currency_one') as HTMLSelectElement,
      currency_two = document.getElementById('currency_two') as HTMLSelectElement,
      input_one = document.getElementById('input_one') as HTMLInputElement,
      input_two = document.getElementById('input_two') as HTMLInputElement,
      btn = document.querySelector('.btn'),
      exchange_result = document.getElementById('exchange_result') as HTMLSpanElement;

calculate();
function calculate():void{
    const currencyOne = currency_one.value,
          currencyTwo = currency_two.value;
    fetch(`${RATE_API}${currencyOne}`)
    .then( res => res.json())
    .then( data => {
        const rate = data.rates[currencyTwo];
        exchange_result!.innerHTML = `1 ${currencyOne} = ${+input_one.value * rate} ${currencyTwo}`
        input_two.value = `${+input_one.value * rate}`
    })
}  

currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change', calculate);
input_one.addEventListener('input', calculate);
input_two.addEventListener('input', calculate);

btn?.addEventListener('click', e => {
    const temp:string = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();
})
