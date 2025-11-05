'use strict';

//(function() {

/**
 * The main object of the scrips.
 */
const chronoByte = {
    /**
     * A function for formatting logs.
     * @param {String} type - Message type, types include `INFO` `WARNING` `ERROR` `DEBUG`.
     * @param {String} message - The text to be printed into the console the console.
     */
    writeLog: (type, message) => {
        const validTypes = {
            INFO: 'color: #96d652; background-color: #485b34',
            WARNING: 'color: #ffa365; background-color: #654b39',
            ERROR: 'color: #fe7b7f; background-color: rgb(233, 131, 63)',
            DEBUG: 'color: rgb(230, 207, 0); background-color: #4a4a4a',
        };

        console.trace(`%c[${type}] - ${message}`, validTypes[type] ?? validTypes[1]);
    },
    /**
     * Dynamically redirect the user upon a nav button click.
     * @param {String} pageName - The page button the user clicked.
     */
    handleNavButton: (pageName) => {
        window.location.href = pageName;
    },
    /**
     * A list of projects to be displayed.
     */
    projects: [
        {
            name: 'Project Alpha',
            description: 'A cool project.',
            link: 'https://example.com/alpha'
        }
    ],

    /**
     * Check if the user is on a GitHub Pages site.
     */
    isGhPages: window.location.href.includes('.github.io'),

    /**
     * Sort numbers around.
     * @param {Array<Number>} array - The array of numbers to be sorted.
     * @returns {Array<Number>} - A version of an array which the numbers are sorted from 0 and up.
     */
    sortNumbers: (array) => {
        if (!array) return chronoByte.writeLog('WARNING', 'You must provide a an array of numbers for the sortNumbers() function.');
        if (Array.isArray(array) === false) return chronoByte.writeLog('WARNING', 'An invalid variable type was parsed in the sortNumbers() function.');
        return array.sort((a, b) => a - b);
    },
    /**
     * Dynamically sets html data to the projects page.
     * @param {String} element - The elements name, class or id.
     */
    generateProjects: (element) => {
        const container = document.getElementById(element);

        if (!container) {
            chronoByte.writeLog('ERROR', 'Could not find the container.');
            return;
        }

        container.innerHTML = '';

        if (chronoByte.projects.length === 0) {
            container.innerHTML = '<p>No projects available.</p>';
            return;
        }

        chronoByte.projects.forEach((project) => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('projectCard');
            projectDiv.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;
            container.appendChild(projectDiv);
        });

        chronoByte.writeLog('INFO', 'Projects loaded successfully.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    const isAppleProduct = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {  // Checks if the client is on a mobile device
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/eruda';
        script.onload = () => {
            if (typeof eruda !== 'undefined') {
                eruda.init();
                chronoByte.writeLog('INFO', 'Eruda successfully loaded. You now have a console on your phone!');
            } else chronoByte.writeLog('WARN', 'Eruda could not be initialized; Eruda appears undefined.');
        };
        script.onerror = () => {
            chronoByte.writeLog('ERROR', 'Failed to load Eruda script.');
        }; document.body.appendChild(script);
    } else chronoByte.writeLog('INFO', 'Eruda was not loaded as the user already has a console.');
    //Check for Apple products.
    if (isAppleProduct) chronoByte.writeLog("WARNING", "Client is an apple user!");
    if (window.location.pathname === '/projects.html' || window.location.pathname === '/chronoByte4812/projects') chronoByte.generateProjects('projectsPanel');
});
//})();
