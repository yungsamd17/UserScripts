// ==UserScript==
// @name            Change player.twitch.tv Title
// @description     Changes the tab title on player.twitch.tv pages to the channel name, upgrading to the correctly-cased name once the player loads.
// @version         1.4
// @author          yungsamd17
// @namespace       https://github.com/yungsamd17/UserScripts
// @license         MIT License
// @downloadURL     https://github.com/yungsamd17/UserScripts/raw/main/scripts/Change-Player-Twitch-Title.user.js
// @updateURL       https://github.com/yungsamd17/UserScripts/raw/main/scripts/Change-Player-Twitch-Title.user.js
// @icon            https://raw.githubusercontent.com/yungsamd17/UserScripts/main/scripts/icons/Change-Player-Twitch-Title.png
// @match           https://player.twitch.tv/*
// @grant           none
// @run-at          document-end
// ==/UserScript==

(function() {
    'use strict';

    const TITLE_SUFFIX = ' - Twitch Player';

    // Fall back to the URL's channel param (its casing can differ from Twitch's).
    const getChannelFromUrl = () => {
        try {
            return new URLSearchParams(window.location.search).get('channel');
        } catch (e) {
            return null;
        }
    };

    const applyTitle = (name) => {
        if (name) document.title = `${name}${TITLE_SUFFIX}`;
    };

    // Upgrade to the correctly-cased name from the embed info card once it appears.
    const updateFromInfoCard = (observer) => {
        const el = document.querySelector('[data-test-selector="stream-info-card-component__title-link"]');
        if (el && el.textContent.trim()) {
            applyTitle(el.textContent.trim());
            if (observer) observer.disconnect();
            return true;
        }
        return false;
    };

    const initial = getChannelFromUrl();
    if (initial) applyTitle(initial);

    const observer = new MutationObserver(() => updateFromInfoCard(observer));
    observer.observe(document.documentElement, { childList: true, subtree: true });

    const run = () => updateFromInfoCard(observer);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run, { once: true });
    } else {
        run();
    }
})();
