// content.js

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'toggleDarkMode') {
      const isDarkMode = document.body.classList.toggle('dark-mode');
      
      // Optionally, you can save the state if needed
      chrome.storage.sync.set({ darkMode: isDarkMode });
      
      // Apply dark mode styles (add your own styles here)
      if (isDarkMode) {
        document.body.style.backgroundColor = '#121212'; // Dark background
        document.body.style.color = '#ffffff'; // Light text color
      } else {
        document.body.style.backgroundColor = ''; // Reset to original
        document.body.style.color = ''; // Reset to original
      }
    }
  });
  