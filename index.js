var amount = document.getElementById('amount');
var currency = 'USD';

var dict = {
"EUR":92.98,
"USD":84.8,
"GBP":106.47,
"CAD":62.04,
"AUD":55.57,
"DKK":12.65,
"HKD":10.69,
"JPY":1.1,
"NZD":50.75,
"QAR":23.07,
"RUB":1.4,
"SAR":22.37
}

amount.addEventListener('input', function() {
    update();
});

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
  update();
  document.getElementById("selectedCurrency").innerHTML = currency_n + ' <button id="toggleOptionsButton" onclick="toggle()">↓</button>';
  document.getElementById("options").style.display = "none";
}



function update() {
    let value = amount.value;
    let rate = dict[currency];
    value = value*rate;
    
    let gst;

    if (value < 100000) {
      gst = Math.max(value * 0.01, 250);
    } else if (value <= 1000000) {
        gst = 1000 + ((value - 100000) * 0.005);
    } else {
        gst = Math.min(5500 + (value - 1000000) * 0.001, 60000);
    }
    gst=gst*0.18;
    
    value = value+gst;
    value = value+1750;
    value = value;
    let x = (gst + 1750).toFixed(0);

    document.getElementById('totalfee').innerHTML = x + ' INR';
    document.getElementById('rate').innerHTML = '1 INR = ' + (1/rate).toFixed(4) + ' ' + currency;
    document.getElementById('convertamount').innerHTML = gst.toFixed(0) + ' INR';
    document.getElementById('rquantity').value = (value).toFixed(1);

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
    let rate = dict[currency];
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
    gst = gst*0.18;
    val = val-gst;
    val = val - 1750;
    let x = (gst + 1750).toFixed(0);

    document.getElementById('totalfee').innerHTML = x + ' INR';
    document.getElementById('rate').innerHTML = '1 INR = ' + (1/rate).toFixed(4) + ' ' + currency;
    document.getElementById('convertamount').innerHTML = gst.toFixed(0) + ' INR';
    document.getElementById('amount').value = (val/rate).toFixed(1);

}

