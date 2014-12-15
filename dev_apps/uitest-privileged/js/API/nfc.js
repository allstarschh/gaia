var NfcDemo = {
  tagContainer: null,
  ndefMsgContainer: null,

  tag: null,

  init: function nd_init() {
    dump('NfcDemo init');
    var content = document.getElementById('content');
    var globalMsg = document.getElementById('global-message');
    this.tagContainer = document.getElementById('tag-container');
    this.ndefMsgContainer = document.getElementById('ndef-msg-container');
    this.ndefMsgContainer.hidden = true;

    var nfc = window.navigator.mozNfc;
    if (!nfc) {
      globalMsg.textContent = 'NFC API not available.';
      return;
    }

    if (!nfc.enabled) {
      globalMsg.textContent = 'NFC is not enabled.';
      return;
    }

    document.getElementById('global-message').textContent = '';

    nfc.ontagfound = this.handleTagFound.bind(this);
    nfc.ontaglost = this.handleTagLost.bind(this);
  },

  handleTagFound: function nd_handleTagFound(event) {
    this.tag = event.tag;

    var tag = event.tag;
    var techList = this.tagContainer.querySelector('[data-type="tech-list"]');
    var tagId = this.tagContainer.querySelector('[data-type="tag-id"]');
    var tagType = this.tagContainer.querySelector('[data-type="tag-type"]');
    var maxNDEFSize = this.tagContainer.querySelector('[data-type="max-ndef-size"]');
    var readOnly = this.tagContainer.querySelector('[data-type="read-only"]');
    var formatable = this.tagContainer.querySelector('[data-type="formatable"]');
    var canReadOnly = this.tagContainer.querySelector('[data-type="can-be-made-read-only"]');
    var isLost = this.tagContainer.querySelector('[data-type="is-lost"]');

    techList.textContent = tag.techList;
    tagId.textContent = this.dumpUint8Array(tag.id);
    tagType.textContent = tag.type;
    maxNDEFSize.textContent = tag.maxNDEFSize;
    readOnly.textContent = tag.isReadOnly;
    formatable.textContent = tag.isFormatable;
    canReadOnly.textContent = tag.canBeMadeReadOnly;
    isLost.textContent = tag.isLost;

    var ndefRecords = event.ndefRecords;
    var ndefLen = ndefRecords ? ndefRecords.length : 0;

    var recordCount = this.ndefMsgContainer.querySelector('[data-type="record-count"]');

    // clear previous ndef information
    var previousCount = recordCount.textContent;
    var i;
    for (i = 0; i < previousCount; i++) {
      var ndefContainer = document.getElementById("ndef#" + i);
      if (ndefContainer) {
        this.ndefMsgContainer.removeChild(ndefContainer);
      }
    }

    if (!ndefLen) {
      this.ndefMsgContainer.hidden = true;
      return true;
    }

    recordCount.textContent = ndefLen;
    var ndefTemplate = document.getElementById("ndef-template");
    ndefTemplate.hidden = true;

    for (i = 0; i < ndefLen; i++) {
      var ndefContainer = document.getElementById("ndef#" + i);
      if (!ndefContainer) {
        ndefContainer = ndefTemplate.cloneNode(true);
        ndefContainer.id = 'ndef#' + i;

        var tnf = ndefContainer.querySelector('[data-type="ndef-tnf"]');
        tnf.textContent = ndefRecords[i].tnf;

        var type = ndefContainer.querySelector('[data-type="ndef-type"]');
        type.textContent = this.dumpUint8Array(ndefRecords[i].type);

        var id = ndefContainer.querySelector('[data-type="ndef-id"]');
        id.textContent = this.dumpUint8Array(ndefRecords[i].id);

        var payload = ndefContainer.querySelector('[data-type="ndef-payload"]');
        payload.textContent = this.dumpUint8Array(ndefRecords[i].payload);

        ndefContainer.hidden = false;
        this.ndefMsgContainer.appendChild(ndefContainer);
      }
    }

    this.ndefMsgContainer.hidden = false;

    return false;
  },

  handleTagLost: function nd_handleTagLost() {
    var tag = this.tag;

    var isLost = this.tagContainer.querySelector('[data-type="is-lost"]');
    isLost.textContent = tag.isLost;
  },

  dumpUint8Array: function nd_dumpUint8Array(array) {
    var str = '[';
    var i;
    var arrayLen = array ? array.length : 0;
    for (i = 0; i < arrayLen; i++) {
      str += array[i].toString(16);
      if (i != array.length - 1) {
        str += ', ';
      }
    }

    return str + ']';
  }
};

window.addEventListener('load', () => NfcDemo.init());
