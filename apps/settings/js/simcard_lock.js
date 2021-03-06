/* -*- Mode: js; js-indent-level: 2; indent-tabs-mode: nil -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

var SimPinLock = {
  simSecurityInfo: document.getElementById('simCardLock-desc'),
  simPinCheckBox: document.querySelector('#simpin-enabled input'),
  changeSimPinItem: document.getElementById('simpin-change'),
  changeSimPinButton: document.querySelector('#simpin-change button'),

  mobileConnection: null,

  updateSimCardStatus: function spl_updateSimStatus() {
    var _ = navigator.mozL10n.get;

    if (this.mobileConnection.cardState === 'absent') {
      this.simSecurityInfo.textContent = _('noSimCard');
      this.simPinCheckBox.disabled = true;
      this.changeSimPinItem.hidden = true;
      return;
    }
    // with SIM card, query its status
    var self = this;
    var req = this.mobileConnection.getCardLock('pin');
    req.onsuccess = function spl_checkSuccess() {
      var enabled = req.result.enabled;
      self.simSecurityInfo.textContent = (enabled) ?
        _('enabled') : _('disabled');
      self.simPinCheckBox.disabled = false;
      self.simPinCheckBox.checked = enabled;
      self.changeSimPinItem.hidden = !enabled;
    };
  },

  init: function spl_init() {
    this.mobileConnection = window.navigator.mozMobileConnection;
    if (!this.mobileConnection)
      return;

    var self = this;
    this.simPinCheckBox.onchange = function spl_toggleSimPin() {
      var enabled = this.checked;
      SimPinDialog.show('enable',
        function() {
          self.updateSimCardStatus();
        },
        function() {
          self.simPinCheckBox.checked = !enabled;
          self.updateSimCardStatus();
        }
      );
    };
    this.changeSimPinButton.onclick = function spl_changePin() {
      SimPinDialog.show('changePin', null, null);
    };

    this.updateSimCardStatus();
  }

};

window.addEventListener('localized', function spl_ready() {
  SimPinLock.init();
});

