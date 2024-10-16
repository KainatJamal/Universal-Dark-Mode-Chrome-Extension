import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  padding: 20px;
`;

const Slider = styled.input`
  width: 100%;
`;

const AccessibilitySettings = () => {
  const [fontSize, setFontSize] = useState(16);
  const [contrast, setContrast] = useState(1);
  const [colorblindMode, setColorblindMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Helper function to use localStorage as a fallback
  const useStorage = (key, defaultValue, storageType = 'sync') => {
    const storageAvailable = typeof chrome !== 'undefined' && chrome.storage && chrome.storage[storageType];

    const getFromStorage = (callback) => {
      if (storageAvailable) {
        chrome.storage[storageType].get([key], (data) => {
          callback(data[key] !== undefined ? data[key] : defaultValue);
        });
      } else {
        const localValue = localStorage.getItem(key);
        callback(localValue !== null ? JSON.parse(localValue) : defaultValue);
      }
    };

    const setToStorage = (value) => {
      if (storageAvailable) {
        chrome.storage[storageType].set({ [key]: value });
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    };

    return [getFromStorage, setToStorage];
  };

  // Use helper function to manage storage
  const [getFontSize, setFontSizeStorage] = useStorage('fontSize', 16);
  const [getContrast, setContrastStorage] = useStorage('contrast', 1);
  const [getColorblindMode, setColorblindModeStorage] = useStorage('colorblindMode', false);
  const [getDarkMode] = useStorage('darkModeEnabled', false);

  useEffect(() => {
    getFontSize(setFontSize);
    getContrast(setContrast);
    getColorblindMode(setColorblindMode);
    getDarkMode(setDarkMode);
  }, []);

  const handleFontSizeChange = (e) => {
    const newFontSize = e.target.value;
    setFontSize(newFontSize);
    setFontSizeStorage(newFontSize);
    document.body.style.fontSize = `${newFontSize}px`;
  };

  const handleContrastChange = (e) => {
    const newContrast = e.target.value;
    setContrast(newContrast);
    setContrastStorage(newContrast);
    document.body.style.filter = `contrast(${newContrast})`;
  };

  const handleColorblindModeChange = () => {
    const newMode = !colorblindMode;
    setColorblindMode(newMode);
    setColorblindModeStorage(newMode);
    document.body.classList.toggle('colorblind-mode', newMode);
  };

  const handleDarkModeToggle = (e) => {
    const newDarkMode = e.target.checked; // Get the current state of the checkbox
    setDarkMode(newDarkMode);
    
    // Check if chrome and chrome.tabs are defined
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0) {
          // Send a message to the content script to toggle dark mode
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode' });
        } else {
          console.error('No active tabs found.');
        }
      });
    } else {
      console.error('Chrome APIs are not available.');
    }
  };
  
  return (
    <SettingsContainer>
      <h2>Accessibility Settings</h2>
      <label>
        Font Size:
        <Slider type="range" min="10" max="30" value={fontSize} onChange={handleFontSizeChange} />
      </label>
      <label>
        Contrast:
        <Slider type="range" min="1" max="2" step="0.1" value={contrast} onChange={handleContrastChange} />
      </label>
      <label>
        Colorblind Mode:
        <input type="checkbox" checked={colorblindMode} onChange={handleColorblindModeChange} />
      </label>
      <label>
        Dark Mode:
        <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
      </label>
    </SettingsContainer>
  );
};

export default AccessibilitySettings;
