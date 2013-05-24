'use stricts';

window.addEventListener('load', function() {
                         document.getElementById("importX509").addEventListener('click', importX509);
                       });

window.addEventListener('unload', function() {
                         document.getElementById("importX509").removeEventListener('click', importX509);
                       });

window.addEventListener('load', function() {
                         document.getElementById("listX509").addEventListener('click', listX509);
                       });

window.addEventListener('unload', function() {
                         document.getElementById("listX509").removeEventListener('click', listX509);
                       });

window.addEventListener('load', function() {
                         document.getElementById("listPK11Token").addEventListener('click', listPK11Token);
                       });

window.addEventListener('unload', function() {
                         document.getElementById("listPK11Token").removeEventListener('click', listPK11Token);
                       });

window.addEventListener('load', function() {
                         document.getElementById("listPK11Module").addEventListener('click', listPK11Module);
                       });

window.addEventListener('unload', function() {
                         document.getElementById("listPK11Module").removeEventListener('click', listPK11Module);
                       });

function debug(str) {
  dump("####### Gaia:x509.js:" + str + "\n");
}

function importX509() {

  debug("importX509(), start");

  window.navigator.mozWifiManager.importCATest();
}

function listX509() {

  debug("listX509(), start");

  window.navigator.mozWifiManager.listCATest();
}

function listPK11Token() {

  debug("listPK11Token(), start");
  window.navigator.mozWifiManager.listPK11TokenTest();
}

function listPK11Module() {

  debug("listPK11Module(), start");
  window.navigator.mozWifiManager.listPK11ModuleTest();
}
