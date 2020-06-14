import React, { Component } from "react";
import VideoDataService from "../services/service";
import { Link } from "react-router-dom";

export default class VideosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveVideos = this.retrieveVideos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveVideo = this.setActiveVideo.bind(this);
    this.removeAllVideos = this.removeAllVideos.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      videos: [],
      currentVideo: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveVideos();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveVideos() {
    VideoDataService.getAll()
      .then(response => {
        this.setState({
          videos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveVideos();
    this.setState({
      currentVideo: null,
      currentIndex: -1
    });
  }

  setActiveVideo(video, index) {
    this.setState({
      currentVideo: video,
      currentIndex: index
    });
  }

  removeAllVideos() {
    VideoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    VideoDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          videos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, videos, currentVideo, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h4>Video List</h4>

          <ul className="list-group">
            {videos &&
              videos.map((video, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveVideo(video, index)}
                  key={index}
                >
                  {video.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllVideos}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-8">
          {currentVideo ? (
            <div>
              <h4>Video</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentVideo.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentVideo.description}
              </div>
              <div>
                <label>
                  <strong>Video URL:</strong>
                </label>{" "}
                <a href={currentVideo.video}>{currentVideo.video}</a>
                <iframe title={currentVideo.title} width="560" height="315" src={"https://www.youtube.com/embed/" + currentVideo.video.split('=')[1]} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentVideo.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/videos/" + currentVideo.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Video...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}