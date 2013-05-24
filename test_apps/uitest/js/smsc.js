'use stricts';

window.addEventListener('load', function() {
                         document.getElementById("setSmsc").addEventListener('click', setSmsc);
                       });

window.addEventListener('unload', function() {
                         document.getElementById("setSmsc").removeEventListener('click', setSmsc);
                       });

window.addEventListener('load', function() {
                         document.getElementById("getSmsc").addEventListener('click', getSmsc);
                       });

window.addEventListener('unload', function() {
                         document.getElementById("getSmsc").removeEventListener('click', getSmsc);
                       });

function debug(str) {
  dump("####### Gaia:smsc.js:" + str + "\n");
}

function getSmsc() {

  debug("getSmsc(), start");

  document.getElementById("smsc").value = window.navigator.mozMobileMessage.smscAddress;
}

function setSmsc() {
  debug("setSmsc(), start");

  window.navigator.mozMobileMessage.smscAddress = document.getElementById("smsc").value;
}
