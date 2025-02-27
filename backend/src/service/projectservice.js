import uuid4 from "uuid4";
import fs from 'fs/promises';
import { REACT_PROJECT_COMMAND } from "../config/serverConfig.js";
import { execPromisified } from "../utils/exceUtillity.js";
import directoryTree from "directory-tree";
import path from 'path'


export const createProjectService = async () => {
    // create projecct on the project repo such that every project has a unique id.

    const projectId = uuid4();
    console.log("project Id inside service : ", projectId);

    await fs.mkdir(`./projects/${projectId}`);

    // now call the create vite command for creating vite project on newly created project folder

    const response = await execPromisified(REACT_PROJECT_COMMAND, {
        cwd: `./projects/${projectId}` 
    });
    console.log
    return projectId;
}

export const getProjectTreeService = (projectId) => {
    const projectPath = path.resolve(`./projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}