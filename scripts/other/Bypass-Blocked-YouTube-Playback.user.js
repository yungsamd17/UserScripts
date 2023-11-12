// ==UserScript==
// @name         Bypass Blocked YouTube Playback
// @description  Bypass YouTube Video Player getting blocked by Anti-Adblocked Detection.
// @version      1.0.0
// @author       yungsamd17
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/Bypass-Blocked-YouTube-Playback.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/Bypass-Blocked-YouTube-Playback.user.js
// @icon         https://raw.githubusercontent.com/yungsamd17/UserScripts/main/scripts/icons/YouTube-Dark-Scrollbar.png
// @match        https://www.youtube.com/*
// @run-at       document-end
// ==/UserScript==

(function() {
    // Store the current URL to check for changes
    let currentUrl = window.location.href;

    // Function to extract video ID from YouTube URL
    function getVideoId(url) {
        const match = url.match(/[?&]v=([^&]+)/);
        return match ? match[1] : null;
    }

    // Function to inject iframe into the specified div
    function injectIframe(videoId) {
        const iframeCode = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

        // Attempt to find the target div directly
        const targetDiv = document.querySelector('.style-scope.yt-playability-error-supported-renderers');

        if (targetDiv) {
            // Replace all children elements with the iframe
            while (targetDiv.firstChild) {
                targetDiv.removeChild(targetDiv.firstChild);
            }

            // Inject the iframe
            targetDiv.innerHTML = iframeCode;
            console.log("%cBypass Blocked YouTube Playback:", "color: #fe0000", "Video embed applied.");
        } else {
            console.error('Bypass Blocked YouTube Playback: Target element for Video embed not found.');
        }
    }

    // Function to remove the injected iframe
    function removeIframe() {
        // Attempt to find the target div directly
        const targetDiv = document.querySelector('.style-scope.yt-playability-error-supported-renderers');

        if (targetDiv) {
            // Remove the iframe
            targetDiv.innerHTML = '';
            console.log("%cBypass Blocked YouTube Playback:", "color: #fe0000", "Video embed removed.");
        } else {
            console.error('Bypass Blocked YouTube Playback: Target element for Video embed not found.');
        }
    }

    // Function to handle URL changes
    function handleUrlChange() {
        const newUrl = window.location.href;

        // Check if the URL has actually changed
        if (newUrl !== currentUrl) {
            currentUrl = newUrl;

            if (newUrl.includes('youtube.com') && newUrl.includes('watch?v=')) {
                const videoId = getVideoId(newUrl);

                if (videoId) {
                    // Add a 3-second delay before injecting the iframe
                    setTimeout(() => {
                        injectIframe(videoId);
                    }, 5000);
                } else {
                    console.error('Bypass Blocked YouTube Playback: Video ID not found.');
                }
            } else {
                // If it's not a YouTube video page, remove the injected iframe
                removeIframe();
            }
        }
    }

    // Run the script on page load
    handleUrlChange();
    console.log("%cBypass Blocked YouTube Playback:", "color: #fe0000", "Video embed applied.");

    // Observe changes in the document's URL
    const urlObserver = new MutationObserver(handleUrlChange);
    urlObserver.observe(document.documentElement, { childList: true, subtree: true });
})();
