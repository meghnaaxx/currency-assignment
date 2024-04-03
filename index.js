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
    run(currency.value, 'INR')
        .then(rate => {
          let val = (1/rate).toFixed(4);
            document.getElementById('rate').innerHTML = '1 INR = ' +  val + ' ' + currency.value;
            ratep = (rate).toFixed(4);
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
    value = value*ratep;
    console.log(value);
    value = value-1750;
    let gst;

    if (value < 100000) {
      gst = Math.max(value * 0.01, 250);
    } else if (value <= 1000000) {
        gst = 1000 + ((value - 100000) * 0.005);
    } else {
        gst = Math.min(5500 + (value - 1000000) * 0.001, 60000);
    }

    value = value-gst;

    document.getElementById('convertamount').innerHTML = gst + ' INR';
    document.getElementById('rquantity').value = (value).toFixed(3);
    
}


var recieved_quantity = document.getElementById('rquantity');

recieved_quantity.addEventListener('input', function() {
    update_rev();
});

function update_rev() {
    var val = parseFloat(recieved_quantity.value);
    console.log(val);
    let gst = 0;

    if (val < 100000) {
      gst = Math.max(val * 0.01, 250);
    } else if (val <= 1000000) {
        gst = 1000 + ((val - 100000) * 0.005);
    } else {
        gst = Math.min(5500 + (val - 1000000) * 0.001, 60000);
    }
    val = val+gst;
    val = val + 1750;
    console.log(val);

    document.getElementById('convertamount').innerHTML = gst + ' INR';
    document.getElementById('amount').value = (val/ratep).toFixed(2);

}
