// State Management
const state = {
    counter: 0,
    increment: 1,
    totalIncrements: 0,
    totalDecrements: 0,
    highestValue: 0,
    history: [],
    multiCounters: {},
    settings: {
        theme: 'light',
        counterColor: '#6366f1',
        soundEnabled: false,
        autoSave: true
    }
};

// DOM Elements
const elements = {
    // Navigation
    navButtons: document.querySelectorAll('.nav-btn'),
    dashboards: document.querySelectorAll('.dashboard'),
    
    // Main Counter
    mainCounter: document.getElementById('main-counter'),
    decreaseBtn: document.getElementById('decrease-btn'),
    resetBtn: document.getElementById('reset-btn'),
    increaseBtn: document.getElementById('increase-btn'),
    incrementValue: document.getElementById('increment-value'),
    
    // Statistics
    currentStat: document.getElementById('current-stat'),
    totalIncrements: document.getElementById('total-increments'),
    totalDecrements: document.getElementById('total-decrements'),
    highestValue: document.getElementById('highest-value'),
    historyList: document.getElementById('history-list'),
    clearHistoryBtn: document.getElementById('clear-history-btn'),
    
    // Multi-Counter
    counterNameInput: document.getElementById('counter-name-input'),
    addCounterBtn: document.getElementById('add-counter-btn'),
    multiCounters: document.getElementById('multi-counters'),
    
    // Settings
    themeSelect: document.getElementById('theme-select'),
    counterColor: document.getElementById('counter-color'),
    soundToggle: document.getElementById('sound-toggle'),
    autoSaveToggle: document.getElementById('auto-save-toggle'),
    resetSettingsBtn: document.getElementById('reset-settings-btn'),
    clearAllBtn: document.getElementById('clear-all-btn')
};

// Initialize App
function init() {
    loadFromLocalStorage();
    setupEventListeners();
    updateUI();
    applyTheme(state.settings.theme);
    updateCounterColor(state.settings.counterColor);
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    elements.navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const dashboard = btn.dataset.dashboard;
            switchDashboard(dashboard);
        });
    });
    
    // Main Counter Controls
    elements.decreaseBtn.addEventListener('click', () => decrementCounter());
    elements.increaseBtn.addEventListener('click', () => incrementCounter());
    elements.resetBtn.addEventListener('click', () => resetCounter());
    elements.incrementValue.addEventListener('change', (e) => {
        state.increment = parseInt(e.target.value) || 1;
        saveToLocalStorage();
    });
    
    // Statistics
    elements.clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Multi-Counter
    elements.addCounterBtn.addEventListener('click', addMultiCounter);
    elements.counterNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addMultiCounter();
    });
    
    // Settings
    elements.themeSelect.addEventListener('change', (e) => {
        state.settings.theme = e.target.value;
        applyTheme(e.target.value);
        saveToLocalStorage();
    });
    
    elements.counterColor.addEventListener('change', (e) => {
        state.settings.counterColor = e.target.value;
        updateCounterColor(e.target.value);
        saveToLocalStorage();
    });
    
    elements.soundToggle.addEventListener('change', (e) => {
        state.settings.soundEnabled = e.target.checked;
        saveToLocalStorage();
    });
    
    elements.autoSaveToggle.addEventListener('change', (e) => {
        state.settings.autoSave = e.target.checked;
        saveToLocalStorage();
    });
    
    elements.resetSettingsBtn.addEventListener('click', resetSettings);
    elements.clearAllBtn.addEventListener('click', clearAllData);
}

// Dashboard Navigation
function switchDashboard(dashboardName) {
    // Update nav buttons
    elements.navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.dashboard === dashboardName);
    });
    
    // Update dashboards
    elements.dashboards.forEach(dashboard => {
        dashboard.classList.toggle('active', dashboard.id === `${dashboardName}-dashboard`);
    });
    
    // Update stats when viewing statistics dashboard
    if (dashboardName === 'stats') {
        updateStatsDashboard();
    }
}

// Counter Functions
function incrementCounter() {
    state.counter += state.increment;
    state.totalIncrements++;
    if (state.counter > state.highestValue) {
        state.highestValue = state.counter;
    }
    addToHistory('Increment', state.increment);
    updateUI();
    saveToLocalStorage();
    playSound();
    animateCounter();
}

function decrementCounter() {
    state.counter -= state.increment;
    state.totalDecrements++;
    addToHistory('Decrement', -state.increment);
    updateUI();
    saveToLocalStorage();
    playSound();
    animateCounter();
}

function resetCounter() {
    if (state.counter !== 0) {
        addToHistory('Reset', -state.counter);
    }
    state.counter = 0;
    updateUI();
    saveToLocalStorage();
    playSound();
    animateCounter();
}

// Multi-Counter Functions
function addMultiCounter() {
    const name = elements.counterNameInput.value.trim();
    if (!name) {
        alert('Please enter a counter name');
        return;
    }
    if (state.multiCounters[name]) {
        alert('A counter with this name already exists');
        return;
    }
    
    state.multiCounters[name] = 0;
    elements.counterNameInput.value = '';
    renderMultiCounters();
    saveToLocalStorage();
}

function removeMultiCounter(name) {
    delete state.multiCounters[name];
    renderMultiCounters();
    saveToLocalStorage();
}

function incrementMultiCounter(name) {
    state.multiCounters[name] = (state.multiCounters[name] || 0) + 1;
    renderMultiCounters();
    saveToLocalStorage();
}

function decrementMultiCounter(name) {
    state.multiCounters[name] = (state.multiCounters[name] || 0) - 1;
    renderMultiCounters();
    saveToLocalStorage();
}

function resetMultiCounter(name) {
    state.multiCounters[name] = 0;
    renderMultiCounters();
    saveToLocalStorage();
}

function renderMultiCounters() {
    const counters = Object.keys(state.multiCounters);
    
    if (counters.length === 0) {
        elements.multiCounters.innerHTML = '<p class="empty-state">No counters yet. Create one to get started!</p>';
        return;
    }
    
    elements.multiCounters.innerHTML = counters.map(name => `
        <div class="multi-counter-item">
            <div class="multi-counter-name">${escapeHtml(name)}</div>
            <div class="multi-counter-value">${state.multiCounters[name]}</div>
            <div class="multi-counter-buttons">
                <button class="btn btn-decrease" onclick="decrementMultiCounter('${name}')">-</button>
                <button class="btn btn-reset" onclick="resetMultiCounter('${name}')">Reset</button>
                <button class="btn btn-increase" onclick="incrementMultiCounter('${name}')">+</button>
            </div>
            <button class="delete-counter-btn" onclick="removeMultiCounter('${name}')">Delete Counter</button>
        </div>
    `).join('');
}

// History Functions
function addToHistory(action, value) {
    const entry = {
        action,
        value,
        time: new Date().toLocaleTimeString()
    };
    state.history.unshift(entry);
    
    // Keep only last 50 entries
    if (state.history.length > 50) {
        state.history = state.history.slice(0, 50);
    }
    
    renderHistory();
}

function renderHistory() {
    if (state.history.length === 0) {
        elements.historyList.innerHTML = '<p class="empty-state">No actions yet. Start counting!</p>';
        return;
    }
    
    elements.historyList.innerHTML = state.history.map(entry => {
        const sign = entry.value >= 0 ? '+' : '';
        const valueClass = entry.value >= 0 ? 'success' : 'danger';
        return `
            <div class="history-item">
                <div>
                    <span class="history-action">${entry.action}</span>
                    <span class="history-value ${valueClass}">${sign}${entry.value}</span>
                </div>
                <span class="history-time">${entry.time}</span>
            </div>
        `;
    }).join('');
}

function clearHistory() {
    if (confirm('Are you sure you want to clear the history?')) {
        state.history = [];
        renderHistory();
        saveToLocalStorage();
    }
}

// UI Update Functions
function updateUI() {
    elements.mainCounter.textContent = state.counter;
    elements.mainCounter.style.color = state.settings.counterColor;
}

function updateStatsDashboard() {
    elements.currentStat.textContent = state.counter;
    elements.totalIncrements.textContent = state.totalIncrements;
    elements.totalDecrements.textContent = state.totalDecrements;
    elements.highestValue.textContent = state.highestValue;
    renderHistory();
}

function animateCounter() {
    elements.mainCounter.classList.add('updated');
    setTimeout(() => {
        elements.mainCounter.classList.remove('updated');
    }, 200);
}

// Settings Functions
function applyTheme(theme) {
    document.body.className = '';
    if (theme !== 'light') {
        document.body.classList.add(`${theme}-theme`);
    }
    elements.themeSelect.value = theme;
}

function updateCounterColor(color) {
    const counterDisplay = document.querySelector('.counter-display');
    counterDisplay.style.background = `linear-gradient(135deg, ${color}, ${adjustBrightness(color, -20)})`;
    elements.counterColor.value = color;
}

function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + percent));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + percent));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
        state.settings = {
            theme: 'light',
            counterColor: '#6366f1',
            soundEnabled: false,
            autoSave: true
        };
        applyTheme('light');
        updateCounterColor('#6366f1');
        elements.soundToggle.checked = false;
        elements.autoSaveToggle.checked = true;
        saveToLocalStorage();
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to clear ALL data? This cannot be undone!')) {
        state.counter = 0;
        state.totalIncrements = 0;
        state.totalDecrements = 0;
        state.highestValue = 0;
        state.history = [];
        state.multiCounters = {};
        updateUI();
        renderHistory();
        renderMultiCounters();
        updateStatsDashboard();
        localStorage.removeItem('counterAppData');
        alert('All data has been cleared!');
    }
}

// Sound Functions
function playSound() {
    if (state.settings.soundEnabled) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Local Storage Functions
function saveToLocalStorage() {
    if (state.settings.autoSave) {
        const data = {
            counter: state.counter,
            increment: state.increment,
            totalIncrements: state.totalIncrements,
            totalDecrements: state.totalDecrements,
            highestValue: state.highestValue,
            history: state.history,
            multiCounters: state.multiCounters,
            settings: state.settings
        };
        localStorage.setItem('counterAppData', JSON.stringify(data));
    }
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('counterAppData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            state.counter = data.counter || 0;
            state.increment = data.increment || 1;
            state.totalIncrements = data.totalIncrements || 0;
            state.totalDecrements = data.totalDecrements || 0;
            state.highestValue = data.highestValue || 0;
            state.history = data.history || [];
            state.multiCounters = data.multiCounters || {};
            if (data.settings) {
                state.settings = { ...state.settings, ...data.settings };
            }
            
            // Update UI elements
            elements.incrementValue.value = state.increment;
            elements.themeSelect.value = state.settings.theme;
            elements.counterColor.value = state.settings.counterColor;
            elements.soundToggle.checked = state.settings.soundEnabled;
            elements.autoSaveToggle.checked = state.settings.autoSave;
            
            renderMultiCounters();
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally accessible for onclick handlers
window.decrementMultiCounter = decrementMultiCounter;
window.incrementMultiCounter = incrementMultiCounter;
window.resetMultiCounter = resetMultiCounter;
window.removeMultiCounter = removeMultiCounter;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

