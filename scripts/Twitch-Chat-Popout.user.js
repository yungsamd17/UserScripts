// ==UserScript==
// @name         Twitch Chat Popout
// @description  Adds a chat-icon button to the Twitch player control bar that opens the channel's chat popout in a small window.
// @version      1.0
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/Twitch-Chat-Popout.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/Twitch-Chat-Popout.user.js
// @icon         https://raw.githubusercontent.com/yungsamd17/UserScripts/main/scripts/icons/Twitch-Chat-Popout.png
// @match        https://player.twitch.tv/*
// @match        https://embed.twitch.tv/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Ordinary Twitch pages have player controls too, so decide from the URL
    // before touching the DOM (loading site chrome is ambiguous otherwise).
    const isPlayerOnlyContext = () =>
        window.location.hostname === 'player.twitch.tv' ||
        window.location.hostname === 'embed.twitch.tv';

    // Top-level www.twitch.tv routes that are not channel pages.
    const RESERVED = new Set([
        'directory', 'search', 'settings', 'subscriptions', 'drops',
        'store', 'p', 'popout', 'clip', 'clips', 'videos', 'about',
        'schedule', 'chat', 'jobs', 'turbo', 'prime', 'downloads'
    ]);

    const isClipPage = () =>
        window.location.href.includes('/clip/') ||
        window.location.hostname === 'clips.twitch.tv';

    const getChannelName = () => {
        if (isClipPage()) return null;
        const host = window.location.hostname;
        if (host === 'player.twitch.tv' || host === 'embed.twitch.tv') {
            try {
                return new URLSearchParams(window.location.search).get('channel');
            } catch (e) {
                return null;
            }
        }
        if (host === 'www.twitch.tv') {
            const first = window.location.pathname.split('/').filter(Boolean)[0];
            if (!first || RESERVED.has(first.toLowerCase())) return null;
            return first;
        }
        return null;
    };

    const findControls = () =>
        document.querySelector('[class*="player-controls__right-control-group"]') ||
        document.querySelector('[data-a-target="player-controls"]');

    const ensureStyle = () => {
        if (document.getElementById('twitch-chat-popout-style')) return;
        const style = document.createElement('style');
        style.id = 'twitch-chat-popout-style';
        style.textContent = [
            '.chat-popout-btn{border:none;border-radius:50%;padding:2px;cursor:pointer;',
            'width:30px;height:30px;display:flex;align-items:center;justify-content:center;background:transparent;}',
            '.chat-popout-btn:hover{background-color:rgba(255,255,255,.13);}',
            '.chat-popout-btn:active{background-color:rgba(255,255,255,.16);}',
            '.chat-popout-btn:focus{background-color:rgba(255,255,255,.13);}'
        ].join('');
        document.head.appendChild(style);
    };

    const openChatPopout = () => {
        const channel = getChannelName();
        if (!channel) return;
        window.open(
            `https://www.twitch.tv/popout/${encodeURIComponent(channel)}/chat`,
            '_blank',
            'width=380,height=600,menubar=no,toolbar=no'
        );
    };

    const removeButton = () => {
        const existingButton = document.querySelector('.chat-popout-btn');
        if (existingButton) existingButton.remove();
    };

    const createButton = () => {
        if (!isPlayerOnlyContext() || isClipPage()) {
            removeButton();
            return;
        }
        const target = findControls();
        if (!target) {
            removeButton();
            return;
        }
        if (document.querySelector('.chat-popout-btn')) return;
        if (!getChannelName()) return;

        ensureStyle();
        const wrapper = document.createElement('div');
        wrapper.className = 'twitch-chat-popout-userscript';
        const button = document.createElement('button');
        button.className = 'chat-popout-btn';
        button.title = 'Open chat popout';
        button.innerHTML = [
            '<svg viewBox="0 0 24 24" height="18" width="18">',
            '<path fill="#ffffff" d="M4 2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8l-4 4V4a2 2 0 0 1 2-2z',
            'M7 8h10v1.5H7V8zm0 3.5h7V13H7v-1.5z"></path></svg>'
        ].join('');
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            openChatPopout();
        });
        wrapper.appendChild(button);
        const children = target.children;
        if (children.length >= 2) {
            target.insertBefore(wrapper, children[children.length - 2]);
        } else {
            target.appendChild(wrapper);
        }
    };

    const observer = new MutationObserver(createButton);
    observer.observe(document.body, { childList: true, subtree: true });
    createButton();
})();
