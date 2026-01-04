/* Admin JS Logic */

const AdminApp = {
    isAuthenticated: () => {
        return localStorage.getItem('admin_auth') === 'true';
    },

    login: (password) => {
        if (password === 'admin123') {
            localStorage.setItem('admin_auth', 'true');
            AdminApp.logAccess('Login', 'Successful');
            return true;
        }
        AdminApp.logAccess('Login Attempt', 'Failed');
        return false;
    },

    logout: () => {
        AdminApp.logAccess('Logout', 'User Initiated');
        localStorage.removeItem('admin_auth');
        window.location.href = 'login.html';
    },

    checkAuth: () => {
        const path = window.location.pathname;
        if (!AdminApp.isAuthenticated() && !path.includes('login.html')) {
            window.location.href = 'login.html';
        } else if (AdminApp.isAuthenticated() && path.includes('login.html')) {
            window.location.href = 'dashboard.html';
        }
    },

    // --- New Features ---

    // 1. Access Logs
    logAccess: (action, status) => {
        const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
        const newLog = {
            id: 'LOG-' + Date.now().toString().slice(-6),
            timestamp: new Date().toLocaleString(),
            action: action,
            status: status,
            device: navigator.platform // Basic device info
        };
        logs.unshift(newLog);
        // Keep only last 50 logs
        if (logs.length > 50) logs.pop();
        localStorage.setItem('admin_logs', JSON.stringify(logs));
    },

    getLogs: () => {
        return JSON.parse(localStorage.getItem('admin_logs') || '[]');
    },

    deleteLog: (id) => {
        let logs = AdminApp.getLogs();
        logs = logs.filter(log => log.id !== id);
        localStorage.setItem('admin_logs', JSON.stringify(logs));
    },

    clearAllLogs: () => {
        localStorage.removeItem('admin_logs');
    },

    // 2. Dark Mode
    toggleDarkMode: () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
    },

    loadTheme: () => {
        const pref = localStorage.getItem('theme_preference');
        if (pref === 'dark') {
            document.body.classList.add('dark-mode');
        }
    },

    // 3. Hacker Clock
    startHackerClock: () => {
        const clockEl = document.getElementById('hackerClock');
        if (!clockEl) return;

        const dateEl = clockEl.querySelector('.hacker-clock-date');
        const timeEl = clockEl.querySelector('.hacker-clock-time');

        const updateClock = () => {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('en-US', { hour12: false });

            if (dateEl) dateEl.innerText = dateStr.toUpperCase();
            if (timeEl) timeEl.innerText = timeStr;
        };

        updateClock();
        setInterval(updateClock, 1000);
    },

    init: () => {
        // console.log('Admin App Initialized');
        AdminApp.checkAuth();
        AdminApp.loadTheme();
        AdminApp.startHackerClock();

        // Logout handler
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                AdminApp.logout();
            });
        }

        // Dark Mode Toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                AdminApp.toggleDarkMode();
            });
        }
    }
};

// Initialize if we are in the admin context
if (window.location.pathname.includes('/admin/')) {
    AdminApp.init();
}
