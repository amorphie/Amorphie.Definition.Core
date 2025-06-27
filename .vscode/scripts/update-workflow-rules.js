#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Updates workflow JSON files by encoding CSX rule files to base64
 * Usage: node update-workflow-rules.js [directory] [specific-workflow-file]
 */

function removeLoadStatements(code) {
    // Remove #load statements and empty lines that follow
    return code
        .split('\n')
        .filter(line => !line.trim().startsWith('#load'))
        .join('\n')
        .replace(/^\n+/, ''); // Remove leading empty lines
}

function encodeToBase64(content) {
    return Buffer.from(content, 'utf-8').toString('base64');
}

function tryGetActiveWorkflowFile() {
    try {
        const activeFileScript = path.join(__dirname, 'get-active-file.js');
        const output = execSync(`node "${activeFileScript}"`, { 
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        return output.trim();
    } catch (error) {
        // No active workflow file found or script failed
        return null;
    }
}

function processWorkflowDirectory(dirPath, specificFile = null) {
    console.log(`Processing directory: ${dirPath}`);
    
    let targetFileName;
    
    if (specificFile) {
        // Use specific file if provided
        const specificPath = path.join(dirPath, specificFile);
        if (!fs.existsSync(specificPath)) {
            console.error(`Specified workflow file not found: ${specificFile}`);
            return;
        }
        if (!specificFile.endsWith('.json') || !specificFile.includes('workflow')) {
            console.error(`Specified file is not a workflow JSON file: ${specificFile}`);
            return;
        }
        targetFileName = specificFile;
        console.log(`Using specified workflow file: ${specificFile}`);
    } else {
        // Try to get active workflow file from VS Code
        const activeFile = tryGetActiveWorkflowFile();
        if (activeFile) {
            const activeFilePath = path.join(dirPath, activeFile);
            if (fs.existsSync(activeFilePath)) {
                targetFileName = activeFile;
                console.log(`Using active workflow file: ${activeFile}`);
            } else {
                console.log(`Active file not found in target directory: ${activeFile}`);
            }
        }
        
        if (!targetFileName) {
            // Find workflow JSON files (existing logic)
            const jsonFiles = fs.readdirSync(dirPath).filter(file => 
                file.endsWith('.json') && file.includes('workflow')
            );
            
            if (jsonFiles.length === 0) {
                console.log('No workflow JSON file found in directory');
                return;
            }
            
            targetFileName = jsonFiles[0];
            console.log(`Found workflow file: ${jsonFiles[0]}`);
            
            if (jsonFiles.length > 1) {
                console.log(`Note: Multiple workflow files found, using: ${targetFileName}`);
                console.log(`Other files: ${jsonFiles.slice(1).join(', ')}`);
            }
        }
    }
    
    const jsonFile = path.join(dirPath, targetFileName);
    
    // Read and parse JSON
    let workflowData;
    try {
        const jsonContent = fs.readFileSync(jsonFile, 'utf-8');
        workflowData = JSON.parse(jsonContent);
    } catch (error) {
        console.error(`Error reading JSON file: ${error.message}`);
        return;
    }
    
    // Find src directory
    const srcDir = path.join(dirPath, 'src');
    if (!fs.existsSync(srcDir)) {
        console.log('No src directory found');
        return;
    }
    
    // Get all CSX files in src directory
    const csxFiles = fs.readdirSync(srcDir).filter(file => file.endsWith('.csx'));
    console.log(`Found ${csxFiles.length} CSX files`);
    
    // Create mapping of CSX files
    const csxContentMap = {};
    csxFiles.forEach(file => {
        const filePath = path.join(srcDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const cleanContent = removeLoadStatements(content);
        const encoded = encodeToBase64(cleanContent);
        csxContentMap[`./src/${file}`] = encoded;
        console.log(`Processed: ${file}`);
    });
    
    // Update JSON data
    let updatesCount = 0;
    
    function updateTasksInCollection(tasks, collectionName) {
        if (!Array.isArray(tasks)) return;
        
        tasks.forEach(task => {
            if (task.rule && task.rule.location) {
                const location = task.rule.location;
                if (csxContentMap[location]) {
                    task.rule.code = csxContentMap[location];
                    updatesCount++;
                    console.log(`Updated rule: ${location} in ${collectionName}`);
                }
            }
            if (task.mapping && task.mapping.location) {
                const location = task.mapping.location;
                if (csxContentMap[location]) {
                    task.mapping.code = csxContentMap[location];
                    updatesCount++;
                    console.log(`Updated mapping: ${location} in ${collectionName}`);
                }
            }
        });
    }
    
    function updateRulesInStates(states) {
        if (!Array.isArray(states)) return;
        
        states.forEach(state => {
            // Update transitions
            if (state.transitions) {
                state.transitions.forEach(transition => {
                    if (transition.rule && transition.rule.location) {
                        const location = transition.rule.location;
                        if (csxContentMap[location]) {
                            transition.rule.code = csxContentMap[location];
                            updatesCount++;
                            console.log(`Updated rule: ${location} in transition: ${transition.key}`);
                        }
                    }

                    if (transition.onExecutionTasks) {
                        updateTasksInCollection(transition.onExecutionTasks, `transition: ${transition.key}`);
                    }
                });
            }
            
            // Update onEntries
            if (state.onEntries) {
                updateTasksInCollection(state.onEntries, `state: ${state.key} onEntries`);
            }
            
            // Update onExits
            if (state.onExits) {
                updateTasksInCollection(state.onExits, `state: ${state.key} onExits`);
            }
        });
    }
    
    // Update startTransition
    if (workflowData.attributes && workflowData.attributes.startTransition) {
        const startTransition = workflowData.attributes.startTransition;
        if (startTransition.onExecutionTasks) {
            updateTasksInCollection(startTransition.onExecutionTasks, 'startTransition');
        }
    }
    
    // Update sharedTransitions
    if (workflowData.attributes && workflowData.attributes.sharedTransitions) {
        workflowData.attributes.sharedTransitions.forEach(sharedTransition => {
            if (sharedTransition.onExecutionTasks) {
                updateTasksInCollection(sharedTransition.onExecutionTasks, `sharedTransition: ${sharedTransition.key}`);
            }
        });
    }
    
    // Update states
    if (workflowData.attributes && workflowData.attributes.states) {
        updateRulesInStates(workflowData.attributes.states);
    }
    
    // Write updated JSON back to file
    if (updatesCount > 0) {
        try {
            fs.writeFileSync(jsonFile, JSON.stringify(workflowData, null, 2), 'utf-8');
            console.log(`\n✅ Successfully updated ${updatesCount} rules in ${targetFileName}`);
        } catch (error) {
            console.error(`Error writing JSON file: ${error.message}`);
        }
    } else {
        console.log('\n⚠️  No rules were updated');
    }
}

// Main execution
const targetDir = process.argv[2] || process.cwd();
const specificFile = process.argv[3]; // Optional specific workflow file name
const fullPath = path.resolve(targetDir);

console.log('🔄 Workflow Rules Updater');
console.log('=' .repeat(50));

if (!fs.existsSync(fullPath)) {
    console.error(`Directory does not exist: ${fullPath}`);
    process.exit(1);
}

processWorkflowDirectory(fullPath, specificFile); 