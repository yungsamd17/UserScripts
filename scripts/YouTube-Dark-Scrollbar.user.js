// ==UserScript==
// @name         YouTube Dark Scrollbar
// @description  Sets scrollbar color to dark while using dark theme on YouTube.
// @version      1.1
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/YouTube-Dark-Scrollbar.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/YouTube-Dark-Scrollbar.user.js
// @icon         https://raw.githubusercontent.com/yungsamd17/UserScripts/main/scripts/icons/YouTube-Dark-Scrollbar.png
// @match        https://www.youtube.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const html = document.documentElement;
    if (html.getAttribute("dark") != null) {
        html.style.colorScheme = "dark";
    }
})();