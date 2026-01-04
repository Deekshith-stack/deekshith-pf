/* Data Manager - LocalStorage Handler */

const DB_KEYS = {
    PROJECTS: 'portfolio_projects',
    SKILLS: 'portfolio_skills',
    CERTIFICATIONS: 'portfolio_certifications',
    PROFILE: 'portfolio_profile',
    SETTINGS: 'portfolio_settings'
};

const DataManager = {
    // --- Generic Helpers ---
    get: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    set: (key, data) => {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // --- Projects ---
    getProjects: () => {
        return DataManager.get(DB_KEYS.PROJECTS) || [];
    },

    saveProject: (project) => {
        const projects = DataManager.getProjects();
        if (project.id) {
            // Update
            const index = projects.findIndex(p => p.id === project.id);
            if (index !== -1) projects[index] = project;
        } else {
            // Create
            project.id = Date.now().toString();
            project.createdAt = new Date().toISOString();
            projects.push(project);
        }
        DataManager.set(DB_KEYS.PROJECTS, projects);
        return project;
    },

    deleteProject: (id) => {
        let projects = DataManager.getProjects();
        projects = projects.filter(p => p.id !== id);
        DataManager.set(DB_KEYS.PROJECTS, projects);
    },

    // --- Skills ---
    getSkills: () => {
        return DataManager.get(DB_KEYS.SKILLS) || [];
    },

    saveSkill: (skill) => {
        const skills = DataManager.getSkills();
        if (skill.id) {
            const index = skills.findIndex(s => s.id === skill.id);
            if (index !== -1) skills[index] = skill;
        } else {
            skill.id = Date.now().toString();
            skills.push(skill);
        }
        DataManager.set(DB_KEYS.SKILLS, skills);
    },

    // --- Certifications ---
    getCertifications: () => {
        return DataManager.get(DB_KEYS.CERTIFICATIONS) || [];
    },

    // --- Messages (Contact Form) ---
    getMessages: () => {
        return DataManager.get('portfolio_messages') || [];
    },

    saveMessage: (msg) => {
        const messages = DataManager.getMessages();
        msg.id = 'REF-' + Math.floor(100000 + Math.random() * 900000); // 6-digit Ref ID
        msg.date = new Date().toLocaleString();
        msg.status = 'unread'; // Default status
        messages.unshift(msg); // Add to top
        DataManager.set('portfolio_messages', messages);
        return msg.id;
    },

    deleteMessage: (id) => {
        let messages = DataManager.getMessages();
        messages = messages.filter(msg => msg.id !== id);
        DataManager.set('portfolio_messages', messages);
    },

    updateMessageStatus: (id, status) => {
        const messages = DataManager.getMessages();
        const msg = messages.find(m => m.id === id);
        if (msg) {
            msg.status = status;
            DataManager.set('portfolio_messages', messages);
        }
    },

    // --- Profile Views ---
    getProfileViews: () => {
        return parseInt(DataManager.get('portfolio_views') || '1284'); // Default base
    },

    incrementProfileViews: () => {
        let count = DataManager.getProfileViews();
        count++;
        DataManager.set('portfolio_views', count);
        return count;
    },

    // --- Initialization with Detail Data (if empty) ---
    init: () => {
        if (!DataManager.get(DB_KEYS.PROJECTS)) {
            // Seed initial data if needed
            console.log('Initializing Database...');
            // We could load from data/content.json here if we fetch it
        }
    }
};

// Auto-init
DataManager.init();
