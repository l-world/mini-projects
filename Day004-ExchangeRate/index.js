var RATE_API = 'https://api.exchangerate-api.com/v4/latest/';
var currency_one = document.getElementById('currency_one'), currency_two = document.getElementById('currency_two'), input_one = document.getElementById('input_one'), input_two = document.getElementById('input_two'), btn = document.querySelector('.btn'), exchange_result = document.getElementById('exchange_result');
calculate();
function calculate() {
    var currencyOne = currency_one.value, currencyTwo = currency_two.value;
    fetch("".concat(RATE_API).concat(currencyOne))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var rate = data.rates[currencyTwo];
        exchange_result.innerHTML = "1 ".concat(currencyOne, " = ").concat(+input_one.value * rate, " ").concat(currencyTwo);
        input_two.value = "".concat(+input_one.value * rate);
    });
}
currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change', calculate);
input_one.addEventListener('input', calculate);
input_two.addEventListener('input', calculate);
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function (e) {
    var temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();
});
