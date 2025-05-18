import uuid4 from "uuid4";
import fs from 'fs/promises';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execPromisified } from "../utils/execUtility.js";
import path from 'path';
import directoryTree from "directory-tree";
import PQueue from 'p-queue';

// Create a queue with concurrency of 1 (process one at a time)
const projectCreationQueue = new PQueue({
  concurrency: 1,          // Number of projects to create simultaneously
  timeout: 300000,         // 5 minute timeout per task (adjust as needed)
  throwOnTimeout: true,    // Throw error when timeout is reached
  autoStart: true          // Start processing immediately
});

export const createProjectService = async (name) => {
  // Add the project creation task to the queue
  return projectCreationQueue.add(async () => {
    const projectId = uuid4();
    const projectPath = `./projects/${projectId}`;

    if(name) {
      REACT_PROJECT_COMMAND = `npm create vite@latest ${name} --yes -- --template react`;
    } else {
      REACT_PROJECT_COMMAND = REACT_PROJECT_COMMAND;
    }
    
    try {
      // Create directory and start project creation
      await Promise.all([
        fs.mkdir(projectPath),
        execPromisified(REACT_PROJECT_COMMAND, { cwd: projectPath })
      ]);
      
      return projectId;
    } catch (error) {
      // Clean up if something fails
      await fs.rm(projectPath, { recursive: true, force: true });
      throw error;
    }
  });
}

export const getProjectTreeService = async (projectId) => {
    const projectPath = path.resolve(`./projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}

export const getAllProjectsService = async () => {
    try {
        // Get the projects directory path
        const projectsDir = path.resolve('./projects');
        
        // Read all directories in the projects folder
        const dirEntries = await fs.readdir(projectsDir, { withFileTypes: true });
        
        // Filter only directories (each directory represents a project)
        const projectDirs = dirEntries.filter(entry => entry.isDirectory());
        
        // Map project directories to project info objects
        const projects = await Promise.all(projectDirs.map(async (dir) => {
            const projectId = dir.name;
            const projectPath = path.join(projectsDir, projectId);
            
            try {
                // Read project package.json to get more info (if needed)
                const packageJsonPath = path.join(projectPath, 'package.json');
                let packageInfo = {};
                
                try {
                    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
                    packageInfo = JSON.parse(packageJsonContent);
                } catch (err) {
                    // Package.json might not exist or be readable, continue with empty object
                }
                
                // Get project stats
                const stats = await fs.stat(projectPath);
                
                return {
                    id: projectId,
                    name: packageInfo.name || projectId,
                    description: packageInfo.description || '',
                    createdAt: stats.birthtime,
                    lastModified: stats.mtime,
                    path: projectPath
                };
            } catch (err) {
                // If there's an error with this specific project, return minimal info
                return {
                    id: projectId,
                    name: projectId,
                    error: 'Failed to read project details'
                };
            }
        }));
        
        // Sort by creation date (newest first)
        projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return projects;
    } catch (error) {
        console.error('Error listing projects:', error);
        throw new Error('Failed to list projects: ' + error.message);
    }
}