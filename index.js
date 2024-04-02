var amount = document.getElementById('amount');
var currency = document.getElementById('country');

amount.addEventListener('input', function() {
    update();
});
currency.addEventListener('input', function() {
    update()
});

function update() {
    let value = amount.value;
    var ourfee = 0.02*value;
    document.getElementById('bankfees').innerHTML = '0 ' + currency.value;
    document.getElementById('ourfee').innerHTML = ourfee + ' ' + currency.value;
    document.getElementById('totalfee').innerHTML = ourfee + ' ' + currency.value;
    document.getElementById('convertamount').innerHTML = (value-ourfee) + ' ' + currency.value;
    var rate;
    if (currency.value == 'INR'){
        rate = 83.350;
    }
    else if(currency.value == 'GBP'){
        rate = 1.254;
    }
    else if(currency.value == 'EUR'){
        rate = 1.073;
    }
    document.getElementById('rate').innerHTML = rate;
    document.getElementById('quantity').value = (value/rate).toFixed(3);
    
    console.log(amount.value + currency.value);
}
