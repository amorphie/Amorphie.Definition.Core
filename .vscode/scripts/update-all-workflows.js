#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Updates all workflow JSON files in the examples directory
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

// Main execution
const workspaceRoot = path.resolve(__dirname, '../..');
const examplesDir = path.join(workspaceRoot, 'examples');

console.log('🔄 Updating All Workflow Rules');
console.log('=' .repeat(50));
console.log(`Scanning: ${examplesDir}`);

if (!fs.existsSync(examplesDir)) {
    console.error('Examples directory not found!');
    process.exit(1);
}

const workflowDirs = findWorkflowDirectories(examplesDir);

if (workflowDirs.length === 0) {
    console.log('No workflow directories found');
    process.exit(0);
}

console.log(`\nFound ${workflowDirs.length} workflow directories:`);
workflowDirs.forEach((dir, index) => {
    console.log(`${index + 1}. ${path.relative(workspaceRoot, dir)}`);
});

console.log('\n' + '='.repeat(50));

// Process each directory
let totalUpdated = 0;
const updateScript = path.join(__dirname, 'update-workflow-rules.js');

workflowDirs.forEach((dir, index) => {
    console.log(`\n[${index + 1}/${workflowDirs.length}] Processing: ${path.relative(workspaceRoot, dir)}`);
    console.log('-'.repeat(30));
    
    try {
        const output = execSync(`node "${updateScript}" "${dir}"`, { 
            encoding: 'utf-8',
            cwd: workspaceRoot 
        });
        console.log(output);
        
        // Count successful updates from output
        const matches = output.match(/✅ Successfully updated (\d+) rules/);
        if (matches) {
            totalUpdated += parseInt(matches[1]);
        }
    } catch (error) {
        console.error(`Error processing ${dir}: ${error.message}`);
    }
});

console.log('\n' + '='.repeat(50));
console.log(`🎉 Process completed! Total rules updated: ${totalUpdated}`);
console.log('='.repeat(50)); 