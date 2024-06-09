const controller = {};
const db = require('../../models/index');

controller.getRequirement = async (req,res) => {
    try {
        const projectId = req.params.id;
        
        const [requirements, requirementTypes] = await Promise.all([
            db.sequelize.query(
                'SELECT requirement_id AS requirement_code, name AS requirement_name, requirement_type_id FROM requirements WHERE project_id = ? ORDER BY requirement_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT requirement_type_id, name FROM requirement_types WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            )
        ]);

        res.locals.requirement_types = requirementTypes;
        res.locals.requirements = requirements;
        res.render('requirement-view', {
            title: 'Tetto',
            cssFile: 'requirement-view.css',
            projectId: projectId,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.getSpecifyRequirement = async (req,res) => {
    try {
        const projectId = req.params.id;
        const requirementId = req.query.requirementId;

        const requirement = await Promise.all([
            db.sequelize.query(
                'SELECT name AS requirement_name, requirement_type_id, description FROM requirements WHERE project_id = ? AND requirement_id = ?',
                { replacements: [projectId, requirementId], type: db.sequelize.QueryTypes.SELECT }
            )
        ]);

        const requirementType = await Promise.all([
            db.sequelize.query(
                'SELECT requirement_type_id, name FROM requirement_types WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            )
        ]);

        // replace requirement_type_id with requirement_type_name in requirement object
        requirement[0][0].requirement_type_name = requirementType[0].find(type => type.requirement_type_id === requirement[0][0].requirement_type_id).name;

        // send json response
        res.status(200).send({ requirement});
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.getRequirementByTypeFilter = async (req,res) => {
    try {
        const projectId = req.params.id;

        // query requirement base on requirement type filter
        // query: requirementType=1&requirementType=2&requirementType=3
        const requirementTypes = req.query.requirementType;

        // incase just one requirement type, no need to use IN
        let requirementTypeFilter = '';
        if (requirementTypes.length > 1) {
            requirementTypeFilter = `AND requirement_type_id IN (${requirementTypes.join(',')})`;
        } else if (requirementTypes.length === 1) {
            requirementTypeFilter = `AND requirement_type_id = ${requirementTypes[0]}`;
        }
        
        const [requirements, requirementTypesList] = await Promise.all([
            db.sequelize.query(
                `SELECT requirement_id AS requirement_code, name AS requirement_name FROM requirements WHERE project_id = ? ${requirementTypeFilter} ORDER BY requirement_id`,
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT requirement_type_id, name FROM requirement_types WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            )
        ]);

        res.locals.requirement_types = requirementTypesList;
        res.locals.requirements = requirements;

        res.render('requirement-view', {
            title: 'Tetto',
            cssFile: 'requirement-view.css',
            projectId: projectId,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.addRequirement = async (req,res) => {
    try {
        const projectId = req.params.id;
        const requirement = req.body;
        requirement.project_id = projectId;

        await db.requirements.create(requirement);
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error adding requirement:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.editRequirement = async (req,res) => {
    try {
        const projectId = req.params.id;
        const requirement = req.body;

        await db.requirements.update(requirement, {
            where: {
                project_id: projectId,
                requirement_id: requirement.requirement_id
            }
        });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error editing requirement:', error);
        res.status(500).send({ success: false, error });
    }
}


controller.deleteRequirement = async (req,res) => {
    try {
        const projectId = req.params.id;
        const requirementId = req.query.requirementId;

        await db.requirements.destroy({
            where: {
                project_id: projectId,
                requirement_id: requirementId
            }
        });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error deleting requirement:', error);
        res.status(500).send({ success: false, error });
    }
}


controller.getRequirementType = async (req,res) => {
    try {
        const projectId = req.params.id;
        const requirementTypes = await db.requirement_types.findAll({
            where: {
                project_id: projectId
            },
            raw: true
        });
        res.status(200).send({ requirementTypes });
    } catch (error) {
        console.error('Error getting requirement types:', error);
        res.status(500).send({ success: false, error });
    }
}


controller.addRequirementType = async (req,res) => {
    try {
        const projectId = req.params.id;
        const requirementType = req.body;
        requirementType.project_id = projectId;

        await db.requirement_types.create(requirementType);
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error adding requirement type:', error);
        res.status(500).send({ success: false, error });
    }
}

module.exports = controller;