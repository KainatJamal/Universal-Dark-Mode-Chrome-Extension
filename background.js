// Action button click listener to toggle dark mode
chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get('darkModeEnabled', (data) => {
        const newDarkModeState = !data.darkModeEnabled;
        chrome.storage.sync.set({ darkModeEnabled: newDarkModeState });

        // Send a message to toggle dark mode in the current tab
        chrome.tabs.sendMessage(tab.id, { action: 'toggleDarkMode' });
    });
});

// Set up the extension on installation or update
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ darkModeEnabled: false });

    // Inject content script into all currently open tabs
    chrome.tabs.query({ url: ["http://*/*", "https://*/*"] }, (tabs) => {
        tabs.forEach(tab => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
        });
    });
});

// Inject content script into newly created tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^https?:\/\//.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
    }
});
