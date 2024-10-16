document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    const toggleButton = document.getElementById('toggleDarkModeButton');
    console.log(toggleButton); // Check if the button is found
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            console.log("Button clicked"); // Check if the button click is registered
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode' });
            });
        });
    } else {
        console.error('Button with ID "toggleDarkModeButton" not found.');
    }
});
