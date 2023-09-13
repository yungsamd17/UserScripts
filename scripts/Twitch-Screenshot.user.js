// ==UserScript==
// @name         Twitch Screenshot
// @description  Adds a button to the Twitch Player to enable you to copy to clipboard and download screenshots.
// @version      1.7
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/Twitch-Screenshot.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/Twitch-Screenshot.user.js
// @icon         https://raw.githubusercontent.com/yungsamd17/UserScripts/main/scripts/icons/Twitch-Screenshot.png
// @match        https://www.twitch.tv/*
// @match        https://player.twitch.tv/*
// @match        https://embed.twitch.tv/*
// @grant        GM_download
// @grant        GM_clipboard
// @run-at       document-end
// ==/UserScript==
// (Screenshot icon by Icons8)

(function() {
    'use strict';

    // capture for copy to clipboard and downloading
    async function captureScreenshot() {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            try {
                await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
                console.log("%cTwitch Screenshot:", "color: #9147ff", "Screenshot copied to clipboard.");
            } catch (error) {
                console.log("%cTwitch Screenshot: Screenshot failed to copy to clipboard!", "color: #ff8080");
            }

            const timestamp = getTimestamp();
            const dataURL = canvas.toDataURL('image/png');
            // temp anchor element for downloading
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = `Twitch-Screenshot-${timestamp}.png`;
            downloadLink.click();
        }
    }

    // event listener for Alt + S screenshot shortcut
    window.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 's' || event.key === 'S') {
            captureScreenshot();
        }
    });
    
    // get timestamp in local time
    function getTimestamp() {
        const now = new Date();
        const options = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        return now.toLocaleString('en-US', options)
            .replace(/ /g, '-')
            .replace(/:/g, '_');
    }

    // button CSS style
    const customStyles = `
        .screenshot-button {
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
        .screenshot-button:hover {
            background-color: #772ce8;
        }
        .screenshot-button:active {
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
        divWrapper.classList.add('twitch-screenshot-userscript');
        const button = document.createElement('button');
        button.title = 'Take a screenshot (alt+s)'; // button hover
        const buttonText = document.createElement('span');
        buttonText.textContent = 'Screenshot'; // button Text
        button.className = 'screenshot-button';
        // button click event listener
        button.addEventListener('click', captureScreenshot);
        // append the button text to the button
        buttonText.className = 'button-text';
        button.appendChild(buttonText);
        // append the button to the div wrapper
        divWrapper.appendChild(button);
        // find the element with class
        const targetClass = '[class*="Layout-sc-1xcs6mc-0"][class*="player-controls__right-control-group"]';
        const targetElement = document.querySelector(targetClass);
        if (targetElement) {
            targetElement.insertBefore(divWrapper, targetElement.firstChild);
            console.log("%cTwitch Screenshot:", "color: #9147ff", "Button created.");
        } else {
            console.error("Twitch Screenshot: Target element not found!");
        }
    }

    // wait for the page load, then create the button
    window.addEventListener('load', createButton);
})();
