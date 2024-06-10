const controller = {};
const db = require('../../models/index');

controller.getReport = async (req,res) => {
    try {
        res.render('report-view', {
            title: 'Tetto',
            cssFile: 'report-view.css',
            projectId: req.params.id,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = controller;