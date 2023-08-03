// ==UserScript==
// @name         Open in Spotify Desktop client
// @description  Opens spotify links in the desktop app
// @version      1.2
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/Open-in-Spotify-Desktop-client.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/Open-in-Spotify-Desktop-client.user.js
// @icon         https://raw.githubusercontent.com/yungsamd17/UserScripts/main/scripts/icons/Open-in-Spotify.png
// @match        https://open.spotify.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var data=document.URL.match(/[\/\&](track|playlist|album|artist|show|episode)\/([^\&\#\/\?]+)/i);
    console.log("This is a "+data[1]+" with id:"+data[2]+"\nAttempting to redirect");
    window.location.replace('spotify:'+data[1]+':'+data[2]);
})();