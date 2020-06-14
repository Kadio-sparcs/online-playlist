module.exports = app => {
    const videos = require("../controllers/controller.js");

    var router = require("express").Router();

    // Create a new Video
    router.post("/", videos.create);

    // Retrieve all Videos
    router.get("/", videos.findAll);

    // Retrieve all published Videos
    router.get("/published", videos.findAllPublished);

    // Retrieve a single Video with id
    router.get("/:id", videos.findOne);

    // Update a Video with id
    router.put("/:id", videos.update);

    // Delete a Video with id
    router.delete("/:id", videos.delete);

    // Create a new Video
    router.delete("/", videos.deleteAll);

    app.use("/api/videos", router);
};