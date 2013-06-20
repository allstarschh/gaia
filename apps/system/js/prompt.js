/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

//const kPaymentConfirmationScreen = '../payment.html';

var Prompt = {
  chromeEventId: null,
  trustedUILayers: {},

  init: function init() {
    window.addEventListener('mozChromeEvent', this);
  },

  handleEvent: function onMozChromeEvent(e) {
    dump("System app: Prompt.js e.detail="+JSON.stringify(e.detail));
  },

  _openTrustedUI: function _openTrustedUI(frame) {
    // The payment flow is shown within the trusted UI with the name of
    // the mozPay caller application as title.
    var title = WindowManager.getCurrentDisplayedApp().name;
    title = title ? title : navigator.mozL10n.get('payment-flow');
    TrustedUIManager.open(title, frame, this.chromeEventId);
  },

  _dispatchEvent: function _dispatchEvent(obj) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('mozContentEvent', true, true, obj);
    window.dispatchEvent(event);
  }
};

Prompt.init();
