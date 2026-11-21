\# ACADEX — Know Your Course, Before It Begins



\## Project Overview

\*\*ACADEX\*\* is a cross-platform desktop application built using \*\*Electron.js, Node.js, HTML5, CSS3, and Vanilla JavaScript\*\*. It helps students share structured course experiences, explore upcoming semester roadmaps, and prepare before a semester begins.



\## Report Summary

\- \*\*Problem Statement:\*\* Students often start a new semester without clear insight into course expectations, prerequisite links, and preparation tips from seniors.

\- \*\*Objective:\*\* Build a lightweight desktop roadmap and checklist tool with local persistence and multi-OS packaging.

\- \*\*System Architecture:\*\*

&#x20; - \*\*Main Process (`main.js`):\*\* Manages application lifecycle and launches the main window.

&#x20; - \*\*Renderer Process (`index.html`, `style.css`, `renderer.js`):\*\* Handles course insight submission, semester filtering, deletion, and `localStorage` persistence.

&#x20; - \*\*Child Window (`guide.html`):\*\* Displays the Pre-Semester Preparation Checklist.

\- \*\*Packaging:\*\* Configured `electron-builder` and GitHub Actions for Windows (`.exe`), Linux (`.deb`, `.AppImage`), and macOS (`.dmg`).

