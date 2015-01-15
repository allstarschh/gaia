var NfcFormatTagDemo = {
  tagContainer: null,

  init: function nd_init() {
    dump('NfcFormatTagDemo init');
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
    nfc.onpeerfound = function (event) {
      dump('peerfound');
    }
  },

  handleTagFound: function nd_handleTagFound(event) {
    var tag = event.tag;
    var result = this.tagContainer.querySelector('[data-type="format-result"]');

    tag.format().then(() => {
      result.style.color = "Green";
      result.textContent = "Pass";
    }).catch((err) => {
      result.style.color = "Red";
      result.textContent = err;
    });
    return false;
  }
};

window.addEventListener('load', () => NfcFormatTagDemo.init());
