// ==UserScript==
// @name         GitHub Repo Traffic Button
// @description  Add a button to view current repo traffic on GitHub
// @version      1.2
// @namespace    https://github.com/yungsamd17/UserScripts
// @license      MIT License
// @downloadURL  https://github.com/yungsamd17/UserScripts/raw/main/scripts/other/Github-Repo-Traffic-Button.user.js
// @updateURL    https://github.com/yungsamd17/UserScripts/raw/main/scripts/other/Github-Repo-Traffic-Button.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @match        https://github.com/*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function addRepoTrafficButton() {
        const sidebar = document.querySelector('.Layout-sidebar');
        if (sidebar) {
            const repoUrl = window.location.href;
            const username = repoUrl.split('/')[3];
            const repoName = repoUrl.split('/')[4];

            const trafficButton = document.createElement('a');
            trafficButton.href = `https://github.com/${username}/${repoName}/graphs/traffic`;
            trafficButton.className = 'btn btn-sm mb-2 d-block mx-auto text-center';
            trafficButton.textContent = 'Repo Traffic';
            trafficButton.style.margin = '10px auto';

            sidebar.appendChild(trafficButton);
        }
    }

    addRepoTrafficButton();
})();
