// ==UserScript==
// @name         Twitch Screenshot
// @description  Adds a button to the Twitch Player to enable you to take and download screenshots.
// @version      1.4
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
// @run-at       document-end
// ==/UserScript==
// (Screenshot icon by Icons8)

(function() {
    'use strict';

    // Function to capture and download the screenshot with a custom timestamp format
    function captureScreenshot() {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            const timestamp = getFormattedTimestamp();

            const dataURL = canvas.toDataURL('image/png');

            // Create a temporary anchor element for downloading
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = `Twitch-Screenshot-${timestamp}.png`;
            downloadLink.click();
        }
    }

    // Function to get the formatted timestamp in the local time zone
    function getFormattedTimestamp() {
        const now = new Date();
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        };

        return now.toLocaleString('en-US', options)
            .replace(/ /g, '-')
            .replace(/:/g, '_')
            .replace(/,/g, '');
    }

    // Function to create and style the button
    function createButton() {
        console.log("%cTwitch Screenshot:", "color: #9147ff", "Creating button...");
        
        // Create a div wrapper for the button
        const divWrapper = document.createElement('div');
        divWrapper.classList.add('twitch-screenshot-userscript');
        
        const button = document.createElement('button');

        // Button hover tooltip
        button.title = 'Click to take a screenshot.';

        // Create a span element for the button text
        const buttonText = document.createElement('span');
        buttonText.textContent = 'Screenshot';

        buttonText.style.color = 'white';
        buttonText.style.margin = '0 6px 0 6px';
        buttonText.style.fontWeight = 'bold';

        button.appendChild(buttonText);

        // Button style
        button.style.backgroundColor = '#9147ff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.margin = '0 6px 0 6px';
        button.style.padding = '5px 2px 5px 2px'
        button.style.cursor = 'pointer';
        button.style.width = 'auto';
        button.style.display = 'flex';
        button.style.alignItems = 'center';

        // Button hover
        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = '#772ce8';
        });

        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = '#9147ff';
        });

        button.addEventListener('mousedown', function() {
            button.style.backgroundColor = '#5c16c5';
        });

        button.addEventListener('mouseup', function() {
            button.style.backgroundColor = '#772ce8';
        });

        // Click event listener on the button
        button.addEventListener('click', captureScreenshot);

        // Append the button to the div wrapper
        divWrapper.appendChild(button);

        // Find the element with class
        const targetClass = '[class*="Layout-sc-1xcs6mc-0"][class*="player-controls__right-control-group"]';
        const targetElement = document.querySelector(targetClass);

        if (targetElement) {
            // Insert the div wrapper as the first child of the target element
            targetElement.insertBefore(divWrapper, targetElement.firstChild);
            console.log("%cTwitch Screenshot:", "color: #9147ff", "Button created and inserted.");
        } else {
            console.log("%cTwitch Screenshot: Target element not found!", "color: #ff8080");
        }
    }

    // Wait for the page load, then create the button
    window.addEventListener('load', createButton);
})();
