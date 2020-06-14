module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            video: String,
            published: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Video = mongoose.model("video", schema);
    return Video;
};