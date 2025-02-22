const Activity = require('../models/activity.model');



// Get single activity
exports.getActivity = async (req, res) => {
    try {
        console.log(req.params.id);
        const activity = await Activity.find({ id: req.params.id });
        console.log(activity);
        // .select('-password');
        if (!activity) {
            return res.status(404).json({
                success: false,
                error: 'Activity not found'
            });
        }
        res.status(200).json({
            success: true,
            data: activity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

