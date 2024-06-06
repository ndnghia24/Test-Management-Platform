const controller = {};
const db = require('../../models/index');

controller.getRequirement = async (req,res) => {
    try {
        const projectId = req.params.id;
        
        const [requirements, requirementTypes] = await Promise.all([
            db.sequelize.query(
                'SELECT requirement_id AS requirement_code, name AS requirement_name FROM requirements WHERE project_id = ? ORDER BY requirement_id',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT }
            ),
            db.sequelize.query(
                'SELECT name FROM requirement_types WHERE project_id = ?',
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

module.exports = controller;