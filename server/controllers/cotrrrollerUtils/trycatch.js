const tryCatch = (controller) => {
    return async (req, res) => {
        try {
            await controller(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Something went wrong, try again later' });
        }
    };
};

module.exports = tryCatch;
