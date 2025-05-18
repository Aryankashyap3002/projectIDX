import { createProjectService, getProjectTreeService, getAllProjectsService } from "../services/projectService.js";

export const createProjectController = async (req, res) => {
    let name = req.body.name;
    const projectId = await createProjectService(name);
    console.log("ProjectId is", projectId);

    return res.json({ message: 'Project created', data: projectId });
}

export const getProjectTree = async (req, res) => {
    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({
        data: tree,
        success: true,
        message: "Successfully fetched the tree"
    });
}

export const getAllProjectsController = async (req, res) => {
    try {
        const projects = await getAllProjectsService();
        return res.status(200).json({
            data: projects,
            success: true,
            message: "Successfully retrieved all projects"
        });
    } catch (error) {
        console.error("Error retrieving projects:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve projects",
            error: error.message
        });
    }
}