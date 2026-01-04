/* AI Engine - Mock Logic for Student Portfolio */

const AIEngine = {

    // Use templates to simulate AI generation without backend API for now
    templates: {
        bio: [
            "Motivated [KEYWORDS] with a passion for building user-centric solutions. Skilled in modern web technologies and eager to contribute to innovative projects.",
            "Aspiring [KEYWORDS] dedicated to writing clean, efficient code. Quick learner with a strong foundation in computer science principles.",
            "Creative [KEYWORDS] looking to bridge the gap between design and development. Committed to continuous learning and excellence."
        ],
        resume: {
            fresher: "Enthusiastic Computer Science undergraduate with a strong academic record and hands-on experience in building web applications. proficient in HTML, CSS, JavaScript, and React. Eager to launch a career as a software developer.",
            intern: "Web Development Intern with 6 months of experience in building responsive user interfaces. Collaborated with senior developers to optimize website performance and accessibility.",
            junior: "Junior Software Developer with proven skills in full-stack development. Successfully delivered 3+ independent projects and contributed to open-source communities."
        },
        seo: "Title: [TOPIC] | Student Portfolio\nDescription: Discover my [TOPIC] showcasing my skills and experience in software development. Explore my latest work and achievements."
    },

    generate: (type, context) => {
        if (type === 'bio') {
            const template = AIEngine.templates.bio[Math.floor(Math.random() * AIEngine.templates.bio.length)];
            return template.replace('[KEYWORDS]', context.keywords);
        }
        else if (type === 'resume') {
            return AIEngine.templates.resume[context.level] || AIEngine.templates.resume.fresher;
        }
        else if (type === 'skills') {
            if (context.category === 'web') {
                return `
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        <span class="badge" style="background: #e6fffa; color: #2ecc71; padding: 4px 10px; border-radius: 4px;">React.js</span>
                        <span class="badge" style="background: #e6fffa; color: #2ecc71; padding: 4px 10px; border-radius: 4px;">Next.js</span>
                        <span class="badge" style="background: #e6fffa; color: #2ecc71; padding: 4px 10px; border-radius: 4px;">Tailwind CSS</span>
                        <span class="badge" style="background: #e6fffa; color: #2ecc71; padding: 4px 10px; border-radius: 4px;">TypeScript</span>
                    </div>
                    <p style="margin-top: 10px; font-size: 0.9rem; color: #666;">Trending technologies in 2026 for Web Development.</p>
                `;
            } else if (context.category === 'data') {
                return `
                     <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        <span class="badge" style="background: #ebf8ff; color: #3498db; padding: 4px 10px; border-radius: 4px;">Python</span>
                        <span class="badge" style="background: #ebf8ff; color: #3498db; padding: 4px 10px; border-radius: 4px;">Pandas</span>
                        <span class="badge" style="background: #ebf8ff; color: #3498db; padding: 4px 10px; border-radius: 4px;">TensorFlow</span>
                         <span class="badge" style="background: #ebf8ff; color: #3498db; padding: 4px 10px; border-radius: 4px;">SQL</span>
                    </div>
                `;
            } else {
                return `
                     <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        <span class="badge" style="background: #fff5f5; color: #e74c3c; padding: 4px 10px; border-radius: 4px;">Flutter</span>
                        <span class="badge" style="background: #fff5f5; color: #e74c3c; padding: 4px 10px; border-radius: 4px;">React Native</span>
                        <span class="badge" style="background: #fff5f5; color: #e74c3c; padding: 4px 10px; border-radius: 4px;">Swift</span>
                    </div>
                `;
            }
        }
        else if (type === 'seo') {
            return AIEngine.templates.seo.replace(/\[TOPIC\]/g, context.topic);
        }
        return 'AI Usage Limit Reached (Mock Mode)';
    }
};
