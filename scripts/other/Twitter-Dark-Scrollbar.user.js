// ==UserScript==
// @name         Twitter Dark Scrollbar
// @description  Sets scrollbar color to dark on Twitter.
// @version      1.0
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/other/Twitter-Dark-Scrollbar.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/other/Twitter-Dark-Scrollbar.user.js
// @match        https://twitter.com/*
// @match        https://x.com/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const darkModeCSS = `
        :root {
            color-scheme: dark;
        }
    `;

    GM_addStyle(darkModeCSS);
})();
