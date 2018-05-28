document.getElementById('sbutton').addEventListener('click',changeComparison);
document.getElementById('cryptoinfo').style.display= "none";

let crypto1 = document.getElementById('dropdown1').value;
let crypto2 = document.getElementById('dropdown2').value;
let url1 = "https://api.coinmarketcap.com/v1/ticker/" + crypto1 + "/";
let url2 = "https://api.coinmarketcap.com/v1/ticker/" + crypto2 + "/";
let count = 0;
let revealed = false;

$(function()
{
    $("#sbutton").click(function()
    {
        if(count % 2 == 1){
            $("#tables").slideToggle();
            count++;
            revealed = true;
            return false; 
        }

    }); 
});

$(function()
{
    $("#hide").click(function()
    {
        if(count % 2 == 0 && revealed){
            $("#tables").slideToggle();
            count++;
            revealed = false;
            return false; 
        }
    }); 
});

function globalinfo() {
    let url = "https://api.coinmarketcap.com/v1/global/"
    fetch(url)
        .then((res) => { return res.json() })
        .then((data) => {
            document.getElementById('scroll-bar').innerHTML += ('$' +
                Number(parseFloat(data.total_market_cap_usd).toFixed(2)).toLocaleString('en')).fontcolor('blue');
            document.getElementById('scroll-bar').innerHTML += '\t\t\t\t\tTotal 24h Volume: ' + ('$' +
                Number(parseFloat(data.total_24h_volume_usd).toFixed(2)).toLocaleString('en')).fontcolor('blue');
            document.getElementById('scroll-bar').innerHTML += '\t\t\t\t\tActive Currencies: ' +(
                Number(parseFloat(data.active_currencies).toFixed(2)).toLocaleString('en')).fontcolor('blue');
            document.getElementById('scroll-bar').innerHTML += '\t\t\t\t\tBitcoin Percentage of Market Cap: '+(
                Number(parseFloat(data.bitcoin_percentage_of_market_cap).toFixed(2)).toLocaleString('en') + '%').fontcolor('blue');
                if(Number(parseFloat(data.bitcoin_percentage_of_market_cap).toFixed(2)) == 
                    Number(parseFloat(data.bitcoin_percentage_of_market_cap).toFixed(1))){
                        document.getElementById('scroll-bar').innerHTML += '\t\t\t\t\tBitcoin Percentage of Market Cap: '+(
                            Number(parseFloat(data.bitcoin_percentage_of_market_cap).toFixed(2)).toLocaleString('en') + '0%')
                                .fontcolor('blue');    
                    }
        });
}

function changeComparison(){
    if(count == 0){
        document.getElementById('cryptoinfo').style.display= "flex";

        count++;
    }
    crypto1 = document.getElementById('dropdown1').value;
    crypto2 = document.getElementById('dropdown2').value;
    url1 = "https://api.coinmarketcap.com/v1/ticker/" + crypto1 + "/";
    url2 = "https://api.coinmarketcap.com/v1/ticker/" + crypto2 + "/";

    fetch(url1)
        .then((res) => { return res.json() })
        .then((data) => { 
            data.forEach((info1) => {
                document.getElementById('cryptoname1').innerHTML = info1.name;
                document.getElementById('cryptosymbol1').innerHTML = info1.symbol;
                document.getElementById('cryptorank1').innerHTML = info1.rank;
                document.getElementById('cryptoprice1').innerHTML = 
                    '$' + Number(parseFloat(info1.price_usd).toFixed(2)).toLocaleString('en');
                    if(Number(parseFloat(info1.price_usd).toFixed(1)).toLocaleString('en') ==
                        Number(parseFloat(info1.price_usd).toFixed(2)).toLocaleString('en')){
                            document.getElementById('cryptoprice1').innerHTML = 
                               '$' + Number(parseFloat(info1.price_usd).toFixed(2)).toLocaleString('en') + '0';
                        }
                document.getElementById('cryptopriceb1').innerHTML = info1.price_btc;
                document.getElementById('dayvolume1').innerHTML = 
                    '$' + Number(parseFloat(info1["24h_volume_usd"]).toFixed(0)).toLocaleString('en');
                document.getElementById('marketcap1').innerHTML = 
                    '$' + Number(parseFloat(info1.market_cap_usd).toFixed(0)).toLocaleString('en');
                document.getElementById('asupply1').innerHTML = 
                    Number(parseFloat(info1.available_supply).toFixed(2)).toLocaleString('en');
                document.getElementById('msupply1').innerHTML = 
                    Number(parseFloat(info1.max_supply).toFixed(2)).toLocaleString('en');
                document.getElementById('pchange1h1').innerHTML = info1.percent_change_1h + '%';
                document.getElementById('pchange24h1').innerHTML = info1.percent_change_24h + '%';
                document.getElementById('pchange7d1').innerHTML = info1.percent_change_7d + '%';
                if(info1.max_supply == null){
                    document.getElementById('msupply1').innerHTML = 'N/A';
                }
                if(info1.percent_change_1h.charAt(0) == '-'){
                    document.getElementById('pchange1h1').style.color = '#FF0000';
                }
                else{
                    document.getElementById('pchange1h1').style.color = 'green';
                }
                if(info1.percent_change_24h.charAt(0) == '-'){
                    document.getElementById('pchange24h1').style.color = '#FF0000';
                }
                else{
                    document.getElementById('pchange24h1').style.color = 'green';
                }
                if(info1.percent_change_7d.charAt(0) == '-'){
                    document.getElementById('pchange7d1').style.color = '#FF0000';
                }
                else{
                    document.getElementById('pchange7d1').style.color = 'green';
                }
            });
    })

    fetch(url2)
    .then((res) => { return res.json() })
    .then((data) => { 
        data.forEach((info2) => {
            document.getElementById('cryptoname2').innerHTML = info2.name;
            document.getElementById('cryptosymbol2').innerHTML = info2.symbol;
            document.getElementById('cryptorank2').innerHTML = info2.rank;
            document.getElementById('cryptoprice2').innerHTML = 
                '$' + Number(parseFloat(info2.price_usd).toFixed(2)).toLocaleString('en');
                if(Number(parseFloat(info2.price_usd).toFixed(1)).toLocaleString('en') ==
                Number(parseFloat(info2.price_usd).toFixed(2)).toLocaleString('en')){
                    document.getElementById('cryptoprice2').innerHTML = 
                       '$' + Number(parseFloat(info2.price_usd).toFixed(2)).toLocaleString('en') + '0';
                }
            document.getElementById('cryptopriceb2').innerHTML = info2.price_btc;
            document.getElementById('dayvolume2').innerHTML = 
                '$' + Number(parseFloat(info2["24h_volume_usd"]).toFixed(0)).toLocaleString('en');
            document.getElementById('marketcap2').innerHTML = 
                '$' + Number(parseFloat(info2.market_cap_usd).toFixed(0)).toLocaleString('en');
            document.getElementById('asupply2').innerHTML = 
                Number(parseFloat(info2.available_supply).toFixed(2)).toLocaleString('en');
            document.getElementById('msupply2').innerHTML = 
                Number(parseFloat(info2.max_supply).toFixed(2)).toLocaleString('en');
            document.getElementById('pchange1h2').innerHTML = info2.percent_change_1h + '%';
            document.getElementById('pchange24h2').innerHTML = info2.percent_change_24h + '%';
            document.getElementById('pchange7d2').innerHTML = info2.percent_change_7d + '%';
            if(info2.max_supply == null){
                document.getElementById('msupply2').innerHTML = 'N/A';
            }
            if(info2.percent_change_1h.charAt(0) == '-'){
                document.getElementById('pchange1h2').style.color = '#FF0000';
            }
            else{
                document.getElementById('pchange1h2').style.color = 'green';
            }
            if(info2.percent_change_24h.charAt(0) == '-'){
                document.getElementById('pchange24h2').style.color = '#FF0000';
            }
            else{
                document.getElementById('pchange24h2').style.color = 'green';
            }
            if(info2.percent_change_7d.charAt(0) == '-'){
                document.getElementById('pchange7d2').style.color = '#FF0000';
            }
            else{
                document.getElementById('pchange7d2').style.color = 'green';
            }
        });
    })
    globalinfo;
}

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('INSERT INTO crypto_prices VALUES (cryptoname1,cryptoprice1);', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

console.log("ok");




