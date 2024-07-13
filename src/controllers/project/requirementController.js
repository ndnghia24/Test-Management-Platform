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

        res.render('requirement-view', {
            title: 'Requirements',
            cssFile: 'requirement-view.css',
            projectId,
            requirement_types: requirementTypes,
            requirements,
            permissions: res.locals.permissions,
            projectName: res.locals.projectName,
            part: 'Requirement'
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

        // query test cases by requirement in test_case_requirement table
        const testCases = await db.sequelize.query(
            'SELECT t.testcase_id, t.name ' +
            'FROM test_cases AS t, test_case_requirement AS tr ' +
            'WHERE t.project_id = :projectId ' +
            'AND tr.requirement_id = :requirementId ' +
            'AND t.testcase_id = tr.testcase_id',
            { replacements: { projectId: projectId, requirementId: requirementId }, type: db.sequelize.QueryTypes.SELECT}
        );

        // replace requirement_type_id with requirement_type_name in requirement object
        requirement[0][0].requirement_type_name = requirementType[0].find(type => type.requirement_type_id === requirement[0][0].requirement_type_id).name;

        // add test cases to requirement object
        requirement[0][0].test_cases = testCases;

        console.log(requirement[0][0]);

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
    const t = await db.sequelize.transaction();
    try {
        const projectId = req.params.id;
        const { name, requirement_type_id, description } = req.body;

        const requirements = await db.requirements.create({
            name : name,
            requirement_type_id : requirement_type_id,
            description : description,
            project_id : projectId
        }, { transaction: t });


        // checking name cannot contain special characters and less than 100 characters
        if (name.match(/[^a-zA-Z0-9 ]/)) {
            await t.rollback();
            return res.status(400).send('Requirement name cannot contain special characters');
        }

        if (name.length > 100) {
            await t.rollback();
            return res.status(400).send('Requirement name too long');
        }

        // checking requirement name ảready exists
        const requirementExists = await db.sequelize.query(
            'SELECT * FROM requirements WHERE project_id = ? AND name = ?',
            { replacements: [projectId, name], type: db.sequelize.QueryTypes.SELECT }
        );

        if (requirementExists.length > 0) {
            await t.rollback();
            return res.status(400).send('Requirement name already exists');
        }

        await t.commit();
        res.status(200).send({ success: true});
    } catch (error) {
        await t.rollback();
        console.error('Error adding requirement:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.editRequirement = async (req,res) => {
    const t = await db.sequelize.transaction();
    try {
        const projectId = req.params.id;
        const { description } = req.body;

        console.log(req.body);
        console.log(req.query.requirementId);

        const requirementUpdate = await db.requirements.update({
            description: description
        }, {
            where: {
                project_id: projectId,
                requirement_id: req.query.requirementId
            },
            transaction: t
        });

        await t.commit();
        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error editing requirement:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.deleteRequirement = async (req,res) => {
    const t = await db.sequelize.transaction();
    try {
        const projectId = req.params.id;
        const requirementId = req.query.requirementId;

        await db.requirements.destroy({
            where: {
                project_id: projectId,
                requirement_id: requirementId
            },
            transaction: t
        });

        await t.commit();
        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
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
    const t = await db.sequelize.transaction();
    try {
        const projectId = req.params.id;
        const { requirement_type_name, description } = req.body;

        // if requirement type name already exists, return error
        const requirementTypeExists = await db.requirement_types.findOne({
            where: {
                name: requirement_type_name,
                project_id: projectId
            }
        });

        if (requirementTypeExists) {
            return res.status(400).send({ success: false, error: 'Requirement type already exists' });
        }

        const requirementType = await db.requirement_types.create({
            name: requirement_type_name,
            description: description,
            release_id: null,
            project_id: projectId
        }, { transaction: t });

        await t.commit();
        res.status(200).send({ success: true });
    } catch (error) {
        await t.rollback();
        console.error('Error adding requirement type:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.exportExcel = async (req,res) => {
    try {
        const projectId = req.params.id;

        const requirements = await db.sequelize.query(
            'SELECT r.requirement_id AS requirement_code, r.name AS requirement_name, rt.name AS requirement_type, r.description ' +
            'FROM requirements AS r, requirement_types AS rt ' +
            'WHERE r.project_id = :projectId ' +
            'AND r.requirement_type_id = rt.requirement_type_id ' +
            'ORDER BY r.requirement_id',
            { replacements: { projectId: projectId }, type: db.sequelize.QueryTypes.SELECT }
        );

        res.status(200).send({ requirements });
    } catch (error) {
        console.error('Error exporting requirements:', error);
        res.status(500).send({ success: false, error });
    }
}

module.exports = controller;