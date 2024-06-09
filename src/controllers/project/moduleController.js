const controller = {};
const db = require('../../models/index');

controller.getModule = async (req,res) => {
    try {
        res.render('module-view', {
            title: 'Tetto',
            cssFile: 'module-view.css',
            projectId: req.params.id,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

controller.getAllModule = async (req,res) => {
    try {
        const projectId = req.params.id;
        const modules = await db.modules.findAll({
            where: {
                project_id: projectId
            },
            raw: true
        },);
        res.status(200).send({ modules });
    } catch (error) {
        console.error('Error getting modules:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.addModule = async (req,res) => {
    try {
        const projectId = req.params.id;
        const module = req.body;
        module.project_id = projectId;

        await db.modules.create(module);
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error adding module:', error);
        res.status(500).send({ success: false, error });
    }
}

module.exports = controller;