import util from 'util';
import child_process from 'child_process';
import fs from 'fs/promises';
import uuid4 from 'uuid4';


const execPromisified = util.promisify(child_process.exec);

export const createProjectController = async (req, res) => {

   // create projecct on the project repo such that every project has a unique id.

    const projectId = uuid4();
    console.log("project Id: ", projectId);

    await fs.mkdir(`./projects/${projectId}`);

    // now call the create vite command for creating vite project on newly created project folder

    const response = await execPromisified('npm create vite@latest sandbox -- --template react', {
        cwd: `./projects/${projectId}` 
    })

    return res.json({ message: 'project is created', data: projectId });
 }