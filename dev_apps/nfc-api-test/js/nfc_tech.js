var NfcTechDemo = {
  init: function nd_init() {
    dump('NfcTechDemo init');
    var content = document.getElementById('content');
    var errorMsg = document.getElementById('error-message');

    var nfc = window.navigator.mozNfc;
    if (!nfc) {
      errorMsg.textContent = 'NFC API not available.';
      return;
    }

    if (!nfc.enabled) {
      errorMsg.textContent = 'NFC is not enabled.';
      return;
    }

    document.getElementById('error-message').textContent = '';

    nfc.ontagfound = this.handleTagFound.bind(this);
    nfc.ontaglost = this.handleTagLost.bind(this);
  },

  handleTagFound: function nd_handleTagFound(event) {
    // clear success/error message.
    var errorMsg = document.getElementById('error-message');
    errorMsg.textContent = '';
    var sucMsg = document.getElementById('success-message');
    sucMsg.textContent = '';

    var tag = event.tag;

    var ndefHelper = new NDEFHelper();
    var isoDep = tag.selectTech('ISO-DEP');
    dump('XXX getting hardware information');
    isoDep.transceive(new Uint8Array([0x90, 0x60, 0x00, 0x00, 0x00])).
      then(response => {
        dump('XXX response='+ndefHelper.dumpUint8Array(response));
        dump('XXX getting software information');
        return isoDep.transceive(new Uint8Array([0x90, 0xaf, 0x00, 0x00, 0x00])); }).
      then(response => {
        dump('XXX response1='+ndefHelper.dumpUint8Array(response));
        dump('XXX getting UID/Batch Number/Production Data');
        return isoDep.transceive(new Uint8Array([0x90, 0xaf, 0x00, 0x00, 0x00])); }).
      then(response => {
        dump('XXX response2='+ndefHelper.dumpUint8Array(response));
        dump('XXX getting Master Key Settings');
        return isoDep.transceive(new Uint8Array([0x90, 0x45, 0x00, 0x00, 0x00])); }).
      then(response => {
        dump('XXX response3='+ndefHelper.dumpUint8Array(response));
        dump('XXX getting Master Key Version');
        return isoDep.transceive(new Uint8Array([0x90, 0x64, 0x00, 0x00, 0x01, 0x00, 0x00])); }).
      then(response => {
        dump('XXX response4='+ndefHelper.dumpUint8Array(response));
        dump('XXX getting Free Memeory and Use RID');
        return isoDep.transceive(new Uint8Array([0x90, 0x6e, 0x00, 0x00, 0x00])); }).
      then(response => {
        dump('XXX response5='+ndefHelper.dumpUint8Array(response));
        dump('XXX getting ApplicationId');
        return isoDep.transceive(new Uint8Array([0x90, 0x6a, 0x00, 0x00, 0x00])); }).
      then(response => {
        dump('XXX response6='+ndefHelper.dumpUint8Array(response));
      });

    return false;
  },

  handleTagLost: function nd_handleTagLost() {
  },
};

window.addEventListener('load', () => NfcTechDemo.init());
