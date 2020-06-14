import React, { Component } from "react";
import VideoDataService from "../services/service";

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeVideo = this.onChangeVideo.bind(this);
    this.getVideo = this.getVideo.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateVideo = this.updateVideo.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);

    this.state = {
      currentVideo: {
        id: null,
        title: "",
        description: "",
        video: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getVideo(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentVideo: {
          ...prevState.currentVideo,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentVideo: {
        ...prevState.currentVideo,
        description: description
      }
    }));
  }

  onChangeVideo(e) {
    const video = e.target.value;
    
    this.setState(prevState => ({
      currentVideo: {
        ...prevState.currentVideo,
        video: video
      }
    }));
  }

  getVideo(id) {
    VideoDataService.get(id)
      .then(response => {
        this.setState({
          currentVideo: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentVideo.id,
      title: this.state.currentVideo.title,
      video: this.state.currentVideo.video,
      description: this.state.currentVideo.description,
      published: status
    };

    VideoDataService.update(this.state.currentVideo.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentVideo: {
            ...prevState.currentVideo,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateVideo() {
    VideoDataService.update(
      this.state.currentVideo.id,
      this.state.currentVideo
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The video was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteVideo() {    
    VideoDataService.delete(this.state.currentVideo.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/videos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentVideo } = this.state;

    return (
      <div>
        {currentVideo ? (
          <div className="edit-form">
            <h4>Video</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentVideo.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentVideo.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="video">Video URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="video"
                  value={currentVideo.video}
                  onChange={this.onChangeVideo}
                ></input>
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentVideo.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentVideo.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteVideo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateVideo}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a video...</p>
          </div>
        )}
      </div>
    );
  }
}