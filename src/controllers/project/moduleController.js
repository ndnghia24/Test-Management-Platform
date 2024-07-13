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
            if (module.root_module_id === 0 || module.root_module_id === null) {
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
            permissions: res.locals.permissions,
            projectName: res.locals.projectName,
            part: 'Module'
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

        // check datatype of module
        if (module.name.length > 100) {
            return res.status(400).send({ success: false, error: 'Module name too long' });
        }

        // checking module name are already exist or not
        const moduleExist = await db.sequelize.query(
            'SELECT * FROM modules WHERE project_id = ? AND name = ?',
            { replacements: [projectId, module.name], type: db.sequelize.QueryTypes.SELECT }
        );

        console.log(moduleExist);

        if (moduleExist.length > 0) {
            return res.status(400).send({ success: false, error: 'Module name already exists' });
        }

        await db.modules.create(module);
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error adding module:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.editModule = async (req,res) => {
    try {
        const moduleId = req.query.moduleId;
        const module = req.body;

        // check datatype of module
        if (module.name.length > 100) {
            return res.status(400).send({ success: false, error: 'Module name too long' });
        }

        await db.modules.update(module, {
            where: {
                module_id: moduleId
            }
        });
        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error editing module:', error);
        res.status(500).send({ success: false, error });
    }
}

controller.deleteModule = async (req,res) => {
    try {
        const moduleId = req.query.moduleId;
        
        await db.modules.destroy({
            where: {
                module_id: moduleId
            }
        });


        // remove all test cases related to this module

        await db.test_cases.destroy({
            where: {
                module_id: moduleId
            }
        });


        res.status(200).send({ success: true });
    } catch (error) {
        console.error('Error deleting module:', error);
        res.status(500).send({ success: false, error });
    }
}

module.exports = controller;