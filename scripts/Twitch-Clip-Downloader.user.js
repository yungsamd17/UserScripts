// ==UserScript==
// @name         Twitch Clip Downloader
// @description  Quick and easy way to download Twitch Clips.
// @version      1.0
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/Twitch-Clip-Downloader.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/Twitch-Clip-Downloader.user.js
// @icon         https://raw.githubusercontent.com/yungsamd17/UserScripts/main/scripts/icons/Twitch-Clip-Downloader.png
// @match        https://clips.twitch.tv/*
// @grant        GM_download
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // download twitch clip
    function downloadClip() {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            const videoURL = videoElement.src;
            // anchor download element
            const downloadLink = document.createElement('a');
            downloadLink.href = videoURL;
            downloadLink.click();
        }
    }

    // button CSS style
    const customStyles = `
        .twitchdown-button {
            background-color: #9147ff;
            border: none;
            border-radius: 0.4rem;
            margin-right: 6px;
            padding: 5px 2px 5px 2px;
            cursor: pointer;
            width: auto;
            height: 30px;
            display: inline-block;
            align-items: center;
        }
        .twitchdown-button:hover {
            background-color: #772ce8;
        }
        .twitchdown-button:active {
            background-color: #5c16c5;
        }
        .button-text {
            color: white;
            margin: 0 6px 0 6px;
            font-weight: bold;
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    // create elements
    function createButton() {
        const divWrapper = document.createElement('div');
        divWrapper.classList.add('twitch-clip-downloader-userscript');
        const button = document.createElement('button');
        const buttonText = document.createElement('span');
        buttonText.textContent = 'Download Clip'; // button Text
        button.className = 'twitchdown-button';
        // button click event listener
        button.addEventListener('click', downloadClip);
        // append the button text to the button
        buttonText.className = 'button-text';
        button.appendChild(buttonText);
        // append the button to the divwrapper
        divWrapper.appendChild(button);
        // find the element with class
        const targetClass = '[class*="Layout-sc-1xcs6mc-0"][class*="player-controls__right-control-group"]';
        const targetElement = document.querySelector(targetClass);
        if (targetElement) {
            targetElement.insertBefore(divWrapper, targetElement.firstChild);
        }
    }

    // wait for the page load, then create the button
    window.addEventListener('load', createButton);
})();
