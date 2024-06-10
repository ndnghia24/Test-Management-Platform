const controller = {};
const db = require('../../models/index');

controller.getModule = async (req,res) => {
    try {
        const projectId = req.params.id;

        const [modules] = await Promise.all([
            db.sequelize.query(
                'SELECT * FROM modules WHERE project_id = ?',
                { replacements: [projectId], type: db.sequelize.QueryTypes.SELECT}
            ),
        ]);
    
        // infomation: 1 module has a root_module_id, represent the parent module
        // if root_module_id is 0, then it is a parent module
        // build the tree structure, then convert it to array json and send it to the client

        const moduleMap = new Map();
        
        // Khởi tạo các node trong map
        modules.forEach(module => {
            moduleMap.set(module.module_id, { ...module, children: [] });
        });  
        const tree = [];  
        modules.forEach(module => {
            if (module.root_module_id === 0) {
                tree.push(moduleMap.get(module.module_id));
                } else {
                const parent = moduleMap.get(module.root_module_id);
                if (parent) {
                    parent.children.push(moduleMap.get(module.module_id));
                }
            }
        });

        res.locals.modules = JSON.stringify(tree, null, 2);

        res.render('module-view', {
            title: 'Modules',
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