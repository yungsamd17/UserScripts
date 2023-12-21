// ==UserScript==
// @name         Twitch Channel Copy Button
// @description  Adds a button with copy icon to the Player to enable you to copy to channel username.
// @version      1.0
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/Twitch-Channel-Copy-Button.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/Twitch-Channel-Copy-Button.user.js
// @icon         https://raw.githubusercontent.com/yungsamd17/UserScripts/main/scripts/icons/Twitch-Channel-Copy-Button.png
// @match        https://player.twitch.tv/*
// @match        https://embed.twitch.tv/*
// @grant        GM_clipboard
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // create the button
    function createChannelCopyButton() {
        // remove the button on clips pages
        const isClipsPage = window.location.href.includes('/clip/') || window.location.href.includes('clips.twitch.tv');
        if (isClipsPage) {
            removeCopyButton();
            return;
        }

        const targetClass = '[class*="Layout-sc-1xcs6mc-0"][class*="player-controls__right-control-group"]';
        const targetElement = document.querySelector(targetClass);
        if (!targetElement) {
            removeCopyButton();
            return;
        }

        const existingButton = document.querySelector('.channel-copy-btn');
        if (existingButton) {
            return;
        }

        // button CSS style
        const customStyles = `
            .channel-copy-btn {
                border: none;
                border-radius: 0.4rem;
                padding: 2px;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .channel-copy-btn:hover {
                background-color: rgba(255,255,255,.13);
            }
            .channel-copy-btn:active {
                background-color: rgba(255,255,255,.16);
            }
            .channel-copy-btn:focus {
                background-color: rgba(255,255,255,.13);
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = customStyles;
        document.head.appendChild(styleElement);

        // create the button and add insert it
        const divWrapper = document.createElement('div');
        divWrapper.className = 'twitch-channel-copy-btn-userscript';
        const button = document.createElement('button');
        button.title = 'Copy Channel name (Alt+T)'; // button hover text
        const copyButtonIcon = `
            <svg class="copy-button-icon" viewBox="0 0 448 512" height="17" width="17">
                <path fill="#ffffff" d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"></path>
            </svg>
        `;
        button.className = 'channel-copy-btn';

        // button click event listener
        button.addEventListener('click', copyChannelUsername);
        button.innerHTML = copyButtonIcon;
        divWrapper.appendChild(button);
        // insert the div wrapper as the second-to-last child
        const children = targetElement.children;
        if (children.length >= 2) {
            targetElement.insertBefore(divWrapper, children[children.length - 2]);
        } else {
            targetElement.appendChild(divWrapper);
        }
    }

    // function to remove the button
    function removeCopyButton() {
        const existingButton = document.querySelector('.channel-copy-btn');
        if (existingButton) {
            existingButton.remove();
        }
    }

    async function copyChannelUsername() {
        if (window.location.href.startsWith("https://player.twitch.tv/?channel=")) {
            // Extract the username
            const urlParams = new URLSearchParams(window.location.search);
            const username = urlParams.get("channel");

            // Copy username to clipboard
            await navigator.clipboard.writeText(username);
            console.log("%cTwitch Channel Copy Button:", "color: #9147ff", "Channel username copied to clipboard.");
        }
    }

    // event listener for Alt+T screenshot shortcut
    window.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 't' || event.key === 'T') {
            copyChannelUsername();
        }
    });

    // MutationObserver to watch for DOM changes
    const observer = new MutationObserver(createChannelCopyButton);
    const observerOptions = {
        childList: true,
        subtree: true,
    };
    observer.observe(document.body, observerOptions);

    createChannelCopyButton();
})();