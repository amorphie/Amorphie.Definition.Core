#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Watches CSX files and automatically updates workflow JSON files
 */

function findWorkflowDirectories(baseDir) {
    const workflowDirs = [];
    
    function scanDirectory(dirPath) {
        try {
            const items = fs.readdirSync(dirPath, { withFileTypes: true });
            
            items.forEach(item => {
                if (item.isDirectory()) {
                    const fullPath = path.join(dirPath, item.name);
                    
                    // Check if this directory has a workflow JSON file and src directory
                    const hasWorkflowJson = fs.readdirSync(fullPath)
                        .some(file => file.endsWith('.json') && file.includes('workflow'));
                    const hasSrcDir = fs.existsSync(path.join(fullPath, 'src'));
                    
                    if (hasWorkflowJson && hasSrcDir) {
                        workflowDirs.push(fullPath);
                    }
                    
                    // Recursively scan subdirectories
                    scanDirectory(fullPath);
                }
            });
        } catch (error) {
            console.warn(`Cannot scan directory ${dirPath}: ${error.message}`);
        }
    }
    
    scanDirectory(baseDir);
    return workflowDirs;
}

function updateWorkflow(workflowDir) {
    const updateScript = path.join(__dirname, 'update-workflow-rules.js');
    const workspaceRoot = path.resolve(__dirname, '../..');
    
    try {
        console.log(`\n🔄 Updating: ${path.relative(workspaceRoot, workflowDir)}`);
        const output = execSync(`node "${updateScript}" "${workflowDir}"`, { 
            encoding: 'utf-8',
            cwd: workspaceRoot 
        });
        
        // Show only the success message
        const successMatch = output.match(/✅ Successfully updated \d+ rules in .+/);
        if (successMatch) {
            console.log(successMatch[0]);
        } else {
            console.log('⚠️  No changes detected');
        }
    } catch (error) {
        console.error(`❌ Error updating workflow: ${error.message}`);
    }
}

// Main execution
const workspaceRoot = path.resolve(__dirname, '../..');
const examplesDir = path.join(workspaceRoot, 'examples');

console.log('👀 Workflow Watcher Started');
console.log('=' .repeat(50));
console.log('Watching for CSX file changes...');
console.log('Press Ctrl+C to stop');
console.log('=' .repeat(50));

if (!fs.existsSync(examplesDir)) {
    console.error('Examples directory not found!');
    process.exit(1);
}

const workflowDirs = findWorkflowDirectories(examplesDir);

if (workflowDirs.length === 0) {
    console.log('No workflow directories found');
    process.exit(0);
}

console.log(`Found ${workflowDirs.length} workflow directories to watch:`);
workflowDirs.forEach((dir, index) => {
    console.log(`${index + 1}. ${path.relative(workspaceRoot, dir)}`);
});

// Set up file watchers
const watchers = [];
const debounceMap = new Map();

workflowDirs.forEach(workflowDir => {
    const srcDir = path.join(workflowDir, 'src');
    
    if (fs.existsSync(srcDir)) {
        const watcher = fs.watch(srcDir, { recursive: false }, (eventType, filename) => {
            if (filename && filename.endsWith('.csx')) {
                console.log(`\n📝 Detected change: ${filename} (${eventType})`);
                
                // Debounce rapid changes
                const key = `${workflowDir}:${filename}`;
                if (debounceMap.has(key)) {
                    clearTimeout(debounceMap.get(key));
                }
                
                debounceMap.set(key, setTimeout(() => {
                    updateWorkflow(workflowDir);
                    debounceMap.delete(key);
                }, 500));
            }
        });
        
        watchers.push(watcher);
    }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Stopping file watchers...');
    watchers.forEach(watcher => watcher.close());
    process.exit(0);
});

// Keep the process alive
console.log('\n✅ File watchers are active. Modify any .csx file to see automatic updates.');
setInterval(() => {
    // Keep alive
}, 1000); 