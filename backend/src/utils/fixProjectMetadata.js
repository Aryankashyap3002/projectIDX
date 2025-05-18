import fs from 'fs/promises';
import path from 'path';

/**
 * Utility to fix a project's metadata file
 * 
 * @param {string} projectId - The ID of the project to fix
 * @param {object} updates - The updates to apply to the metadata
 * @returns {Promise<object>} - The updated metadata
 */
export const fixProjectMetadata = async (projectId, updates = {}) => {
  try {
    const projectsDir = path.resolve('./projects');
    const metadataFile = path.join(projectsDir, projectId, '.project-meta.json');
    
    // Check if the file exists
    try {
      await fs.access(metadataFile);
    } catch (err) {
      throw new Error(`Project metadata file not found for project ${projectId}`);
    }
    
    // Read the current metadata
    const content = await fs.readFile(metadataFile, 'utf8');
    let metadata;
    
    try {
      metadata = JSON.parse(content);
    } catch (err) {
      // If the file is corrupted, create a new one
      metadata = {
        id: projectId,
        name: 'recovered-project',
        createdAt: new Date().toISOString(),
        status: 'error',
        error: 'Metadata file was corrupted and has been reset'
      };
    }
    
    // Apply updates
    const updatedMetadata = { ...metadata, ...updates };
    
    // Write back to file
    await fs.writeFile(metadataFile, JSON.stringify(updatedMetadata, null, 2));
    
    return updatedMetadata;
  } catch (err) {
    console.error(`Failed to fix project metadata:`, err);
    throw err;
  }
};

/**
 * Utility to reset error status for a project
 * 
 * @param {string} projectId - The ID of the project to reset
 * @returns {Promise<object>} - The updated metadata
 */
export const resetProjectErrorStatus = async (projectId) => {
  return fixProjectMetadata(projectId, {
    status: 'ready',
    error: undefined  // Removes the error field
  });
};

/**
 * Utility to manually create a basic project metadata file
 * (Useful for initializing a project from scratch)
 * 
 * @param {string} projectId - The ID of the project to create
 * @param {string} projectName - The name of the project
 * @returns {Promise<object>} - The created metadata
 */
export const createBasicProjectMetadata = async (projectId, projectName = 'manual-project') => {
  const metadata = {
    id: projectId,
    name: projectName,
    createdAt: new Date().toISOString(),
    status: 'ready',
    framework: 'manual'
  };
  
  return fixProjectMetadata(projectId, metadata);
};