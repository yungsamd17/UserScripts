// ==UserScript==
// @name         Open in Spotify Desktop client
// @description  Opens spotify links in the desktop app
// @version      0.2
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/Open-in-Spotify-Desktop-client.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/Open-in-Spotify-Desktop-client.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=spotify.com
// @match        https://open.spotify.com/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var data=document.URL.match(/[\/\&](track|playlist|album|artist|show|episode)\/([^\&\#\/\?]+)/i);
    console.log("This is a "+data[1]+" with id:"+data[2]+"\nAttempting to redirect");
    window.location.replace('spotify:'+data[1]+':'+data[2]);

    setTimeout(function() {
      console.log("Closing tab");
      window.close();
    }, 100);
})();