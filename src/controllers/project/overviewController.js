const controller = {};
const db = require('../../models/index');

controller.getOverview = async (req,res) => {
    try {
        res.render('overview-view', {
            title: 'Tetto',
            cssFile: 'overview-view.css',
            projectId: req.params.id,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = controller;