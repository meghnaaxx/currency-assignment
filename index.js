var amount = document.getElementById('amount');
var currency = document.getElementById('country');
var rate = 83.350;

amount.addEventListener('input', function() {
    update();
});
currency.addEventListener('input', function() {
    rate_update()
    update()
});

function rate_update() {

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
}

function update() {
    let value = amount.value;
    var ourfee = 0.02*value;
    document.getElementById('bankfees').innerHTML = '0 ' + currency.value;
    document.getElementById('ourfee').innerHTML = ourfee + ' ' + currency.value;
    document.getElementById('totalfee').innerHTML = ourfee + ' ' + currency.value;
    document.getElementById('convertamount').innerHTML = (value-ourfee) + ' ' + currency.value;
    
    document.getElementById('rquantity').value = (value/rate).toFixed(3);
    
    console.log(amount.value + currency.value);
}

var recieved_quantity = document.getElementById('rquantity');

recieved_quantity.addEventListener('input', function() {
    update_rev();
});

function update_rev() {
    var r_amount = recieved_quantity.value;

    document.getElementById('convertamount').innerHTML = (r_amount*rate) + ' ' + currency.value;
    document.getElementById('amount').value = (r_amount*rate)*(100/98);
    var ourfee = 0.02*(r_amount*rate)*(100/98);
    document.getElementById('bankfees').innerHTML = '0 ' + currency.value;
    document.getElementById('ourfee').innerHTML = ourfee + ' ' + currency.value;
    document.getElementById('totalfee').innerHTML = ourfee + ' ' + currency.value;
    

}
