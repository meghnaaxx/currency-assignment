var amount = document.getElementById('amount');
var currency = 'USD';
var ratep = 0.0118;

amount.addEventListener('input', function() {
    update();
});

function rate_update() {
  run('INR', currency)
        .then(rate => {
          console.log(rate);
          let val = (rate).toFixed(5);
            document.getElementById('rate').innerHTML = '1 INR = ' +  val + ' ' + currency;
            ratep = (rate).toFixed(5);
        })
        .then(rate=>{
          console.log(rate);
          update();
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
        valuex = valuex + 1750;
        let ratepx = data.result;
        document.getElementById('rquantity').value = (valuex/ratepx).toFixed(3);
        return data.result;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
      });
}



function update() {
    let value = amount.value;
    value = value/ratep;
    
    let gst;

    if (value < 100000) {
      gst = Math.max(value * 0.01, 250);
    } else if (value <= 1000000) {
        gst = 1000 + ((value - 100000) * 0.005);
    } else {
        gst = Math.min(5500 + (value - 1000000) * 0.001, 60000);
    }
    gst=gst*0.1802;
    
    value = value+gst;
    value = value+1750;
    value = value*1.00238;
    let x = (gst + 1750).toFixed(0);
    console.log(value);
    document.getElementById('totalfee').innerHTML = x + ' INR';

    document.getElementById('convertamount').innerHTML = gst.toFixed(0) + ' INR';
    document.getElementById('rquantity').value = (value).toFixed(2);
    if(value>=700000){
      document.getElementById('notice').style.display = 'block';
    } else {
      document.getElementById('notice').style.display = 'none';
    }
    
}


var recieved_quantity = document.getElementById('rquantity');

recieved_quantity.addEventListener('input', function() {
    update_rev();
});

function update_rev() {
    var val = parseFloat(recieved_quantity.value);
    if(val>=700000){
      document.getElementById('notice').style.display = 'block';
    } else {
      document.getElementById('notice').style.display = 'none';
    }
    let gst = 0;

    if (val < 100000) {
      gst = Math.max(val * 0.01, 250);
    } else if (val <= 1000000) {
        gst = 1000 + ((val - 100000) * 0.005);
    } else {
        gst = Math.min(5500 + (val - 1000000) * 0.001, 60000);
    }
    gst = gst*0.1803;
    val = val-gst;
    val = val - 1750;
    let x = (gst + 1750).toFixed(0);
    document.getElementById('totalfee').innerHTML = x + ' INR';


    document.getElementById('convertamount').innerHTML = gst.toFixed(0) + ' INR';
    document.getElementById('amount').value = (val*ratep).toFixed(2);

}

function toggle() {
  var optionsDiv = document.getElementById("options");
  if (optionsDiv.style.display === "none") {
      optionsDiv.style.display = "block";
  } else {
      optionsDiv.style.display = "none";
  }
}

function selectOption(currency_n) { 
  currency = currency_n;
  rate_update();
  document.getElementById("selectedCurrency").innerHTML = currency_n + ' <button id="toggleOptionsButton" onclick="toggle()">↓</button>';
  document.getElementById("options").style.display = "none";
}
