let count = 0;
let revealed = false;

function updateScrollbar(data) {
  const DELIMITER = '\t\t\t\t\t';
  const MARKET_CAP = `$${data.total_market_cap_usd.toLocaleString('en')}`;
  const VOLUME_24H = `$${data.total_24h_volume_usd.toLocaleString('en')}`;
  const NUM_ACTIVATE_CURR = data.active_currencies.toLocaleString('en');
  const BITCOIN_SHARE = `${Number(data.bitcoin_percentage_of_market_cap)
    .toFixed(2)
    .toLocaleString('en')}%`;

  $('#scroll-bar')
    .append(MARKET_CAP.fontcolor('blue'))
    .append(`${DELIMITER}Total 24h Volume: ${VOLUME_24H.fontcolor('blue')}`)
    .append(
      `${DELIMITER}Active Currencies: ${NUM_ACTIVATE_CURR.fontcolor('blue')}`
    )
    .append(
      `${DELIMITER}Bitcoin Percentage of Market Cap: ${BITCOIN_SHARE.fontcolor(
        'blue'
      )}`
    );
}

function updateCryptoData(info, n) {
  $(`#cryptoname${n}`).html(info.name);
  $(`#cryptosymbol${n}`).html(info.symbol);
  $(`#cryptorank${n}`).html(info.rank);

  const PRICE = `$${Number(info.price_usd).toLocaleString('en')}`;
  const PRICE_BTC = Number(info.price_btc).toLocaleString('en');
  const DAY_VOLUME = `$${Number(info['24h_volume_usd']).toLocaleString('en')}`;
  const MARKET_CAP = `$${Number(info.market_cap_usd).toLocaleString('en')}`;
  const AVL_SUPPLY = Number(info.available_supply).toLocaleString('en');
  console.log(MARKET_CAP);
  console.log(AVL_SUPPLY);
  const MAX_SUPPLY =
    info.max_supply == null
      ? 'N/A'
      : Number(info.max_supply).toLocaleString('en');
  const PERCENTAGE_CHANGE = {
    hour: {
      val: `${info.percent_change_1h}%`,
      color: info.percent_change_1h < 0 ? '#FF0000' : 'green'
    },
    day: {
      val: `${info.percent_change_24h}%`,
      color: info.percent_change_24h < 0 ? '#FF0000' : 'green'
    },
    week: {
      val: `${info.percent_change_7d}%`,
      color: info.percent_change_7d < 0 ? '#FF0000' : 'green'
    }
  };

  $(`#cryptoprice${n}`).html(PRICE);
  $(`#cryptopriceb${n}`).html(PRICE_BTC);
  $(`#dayvolume${n}`).html(DAY_VOLUME);
  console.log(200);
  $(`#marketcap${n}`).html(MARKET_CAP);
  $(`#asupply${n}`).html(AVL_SUPPLY);
  $(`#msupply${n}`).html(MAX_SUPPLY);
  $(`#pchange1h${n}`)
    .html(PERCENTAGE_CHANGE.hour.val)
    .css('color', PERCENTAGE_CHANGE.hour.color);
  $(`#pchange24h${n}`)
    .html(PERCENTAGE_CHANGE.day.val)
    .css('color', PERCENTAGE_CHANGE.day.color);
  $(`#pchange7d${n}`)
    .html(PERCENTAGE_CHANGE.week.val)
    .css('color', PERCENTAGE_CHANGE.week.color);
}

function showGlobalInfo() {
  const URL = 'https://api.coinmarketcap.com/v1/global/';
  fetch(URL)
    .then(res => res.json())
    .then(updateScrollbar);
}

function changeComparison() {
  if (count == 0) {
    document.getElementById('cryptoinfo').style.display = 'flex';

    count++;
  }
  const crypto1 = $('#dropdown1').val();
  const crypto2 = $('#dropdown2').val();
  const url1 = `https://api.coinmarketcap.com/v1/ticker/${crypto1}/`;
  const url2 = `https://api.coinmarketcap.com/v1/ticker/${crypto2}/`;

  fetch(url1)
    .then(res => res.json())
    .then(data => updateCryptoData(data[0], 1));

  fetch(url2)
    .then(res => res.json())
    .then(data => updateCryptoData(data[0], 2));
}

window.onload = function() {
  $('#sbutton').click(changeComparison);
  $('#cryptoinfo').css('display', 'none');

  $('#sbutton').click(function() {
    if (count % 2 == 1) {
      $('#tables').slideToggle();
      count++;
      revealed = true;
    }
  });

  $('#hide').click(function() {
    if (count % 2 == 0 && revealed) {
      $('#tables').slideToggle();
      count++;
      revealed = false;
    }
  });

  showGlobalInfo();
};
