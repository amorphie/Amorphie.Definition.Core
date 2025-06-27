#!/usr/bin/env node

/**
 * Helper script to get the currently active file in VS Code
 * This script works with VS Code's API when available
 */

const fs = require('fs');
const path = require('path');

function getActiveFile() {
    // Try to get active file from environment variable (set by VS Code extension)
    const activeFile = process.env.VSCODE_ACTIVE_FILE;
    
    if (activeFile && fs.existsSync(activeFile)) {
        const fileName = path.basename(activeFile);
        
        // Check if it's a workflow JSON file
        if (fileName.endsWith('.json') && fileName.includes('workflow')) {
            console.log(fileName);
            process.exit(0);
        }
    }
    
    // If no active file or not a workflow file, exit without output
    process.exit(1);
}

getActiveFile(); 