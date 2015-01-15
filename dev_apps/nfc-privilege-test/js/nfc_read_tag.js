var NfcReadTagDemo = {
  tagContainer: null,

  init: function nd_init() {
    dump('NfcReadTagDemo init');
    var content = document.getElementById('content');
    var globalMsg = document.getElementById('global-message');
    this.tagContainer = content.querySelector('[data-type="tag-container"]')

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
  },

  handleTagFound: function nd_handleTagFound(event) {
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
    tagId.textContent = "";
    var len = tag.id ? tag.id.length : 0;
    for (var i = 0; i < len; i++) {
      tagId.textContent += tag.id[i].toString(16);
    }
    tagType.textContent = tag.type;
    maxNDEFSize.textContent = tag.maxNDEFSize;
    readOnly.textContent = tag.isReadOnly;
    formatable.textContent = tag.isFormatable;
    canReadOnly.textContent = tag.canBeMadeReadOnly;
    isLost.textContent = tag.isLost;
    return false;
  }
};

window.addEventListener('load', () => NfcReadTagDemo.init());
