'use stricts';

window.addEventListener('load', function() {
                         document.getElementById("webcrypto").addEventListener('click', webcrypto);
                       });

window.addEventListener('unload', function() {
                         document.getElementById("webcrypto").removeEventListener('click', webcrypto);
                       });

function debug(str) {
  dump("####### Gaia:webcrypto.js:" + str + "\n");
}

function webcrypto() {

  debug("webcrypto(), start");

  debug(typeof (window.crypto));
  var array = new Uint32Array(10);
  window.crypto.getRandomValues(array);

  console.log("Your lucky numbers:");
  for (var i = 0; i < array.length; i++) {
          console.log(array[i]);
  }
}

