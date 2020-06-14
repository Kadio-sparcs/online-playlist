import React, { Component } from "react";
import VideoDataService from "../services/service";

export default class AddVideo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeVideo = this.onChangeVideo.bind(this);
    this.saveVideo = this.saveVideo.bind(this);
    this.newVideo = this.newVideo.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeVideo(e) {
    this.setState({
      video: e.target.value
    });
  }

  saveVideo() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      video: this.state.video
    };

    VideoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          video: response.data.video,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newVideo() {
    this.setState({
      id: null,
      title: "",
      description: "",
      video: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newVideo}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="video">Video URL</label>
              <input
                type="text"
                className="form-control"
                id="video"
                required
                value={this.state.video}
                onChange={this.onChangeVideo}
                name="video"
              />
            </div>

            <button onClick={this.saveVideo} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}