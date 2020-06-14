const db = require("../models");
const Video = db.videos;

// Create and Save a new Video
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Title can not be empty!" });
        return;
    }
    if (!req.body.video) {
        res.status(400).send({ message: "Video can not be empty!" });
        return;
    }

    // Create a Video
    const video = new Video({
        title: req.body.title,
        description: req.body.description,
        video: req.body.video,
        published: req.body.published ? req.body.publised : false
    });

    //Save Video in the database
    video
        .save(video)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Video."
            });
        });
};

// Retrieve all Videos from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Video.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving videos."
            });
        });
};

// Find a single Video with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Video.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Video with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Video with id=" + id });
            });
};

// Update a Video by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Video.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Video with id=${id}. Maybe Video was not found!`
                });
            } else res.send({ message: "Video was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Video with id="+ id
            });
        });
};

// Delete a Video with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Video.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Video with id=${id}. Maybe Video was not found!`
                });
            } else {
                res.send({
                    message: "Video was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Video with id=" + id
            });
        });
};

// Delete all Videos from the database.
exports.deleteAll = (req, res) => {
    Video.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Videos were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all videos."
            });
        });
};

// Find all published Videos
exports.findAllPublished = (req, res) => {
    Video.find({ published: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving videos."
            });
        });
};