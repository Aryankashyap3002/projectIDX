import { createProjectService, getProjectTreeService } from "../service/projectservice.js";

export const createProjectController = async (req, res) => {
    console.log("Inside controllers");
    const projectId = await createProjectService();

    return res.json({ message: 'project is created', data: projectId });
}

export const getProjectTree = async (req, res) => {
    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({
        data: tree,
        success: true,
        message: "Successfully fetched the tree"
    })
}