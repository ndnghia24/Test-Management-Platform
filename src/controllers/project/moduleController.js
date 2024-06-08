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

module.exports = controller;