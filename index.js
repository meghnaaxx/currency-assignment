var amount = document.getElementById('amount');
var currency = document.getElementById('country');
var ratep = 83.350;

amount.addEventListener('input', function() {
    update();
});
currency.addEventListener('input', function() {
    rate_update()
    update()
});

function rate_update() {
    run(currency.value, 'USD')
        .then(rate => {
            document.getElementById('rate').innerHTML = (1/rate).toFixed(2);
            ratep = (1/rate).toFixed(2);
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
}

function run(from, to) {
    const endpoint = 'convert';
    const access_key = '926d1be6e8159f8b0203c8dcb5c2f65e';
    const amount = '1';
    
    // Construct the URL
    const url = `https://api.currencylayer.com/${endpoint}?access_key=${access_key}&from=${from}&to=${to}&amount=${amount}`;
    
    // Execute the conversion using Fetch API
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let valuex = document.getElementById('amount').value;
        let ratepx = data.result;
        document.getElementById('rquantity').value = (valuex*ratepx).toFixed(3);
        return data.result;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
      });
}



function update() {
    let value = amount.value;
    var ourfee = 0.02*value;
    document.getElementById('bankfees').innerHTML = '0 ' + currency.value;
    document.getElementById('ourfee').innerHTML = ourfee + ' ' + currency.value;
    document.getElementById('totalfee').innerHTML = ourfee + ' ' + currency.value;
    document.getElementById('convertamount').innerHTML = (value-ourfee) + ' ' + currency.value;
    
    document.getElementById('rquantity').value = (value/ratep).toFixed(3);
    
    console.log(amount.value + currency.value);
}

var recieved_quantity = document.getElementById('rquantity');

recieved_quantity.addEventListener('input', function() {
    update_rev();
});

function update_rev() {
    var r_amount = recieved_quantity.value;

    document.getElementById('convertamount').innerHTML = (r_amount*ratep) + ' ' + currency.value;
    document.getElementById('amount').value = ((r_amount*ratep)*(100/98)).toFixed(3);
    var ourfee = (0.02*(r_amount*ratep)*(100/98)).toFixed(3);
    document.getElementById('bankfees').innerHTML = '0 ' + currency.value;
    document.getElementById('ourfee').innerHTML = ourfee + ' ' + currency.value;
    document.getElementById('totalfee').innerHTML = ourfee + ' ' + currency.value;
    

}
