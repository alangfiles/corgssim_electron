import React, { Component } from "react";
import "./ListPage.css";
import { Link } from "react-router-dom";
import RomLibrary from "./RomLibrary";

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      romLibrary: RomLibrary.load(),
      selected: 0,
    };
  }

  render() {
    try {
      if (
        navigator.getGamepads()[0].axes[0] > 0.5 &&
        this.state.selected != 1
      ) {
        this.mouseOverJ();
      } else if (
        navigator.getGamepads()[0].axes[0] < -0.5 &&
        this.state.selected != 0
      ) {
        this.mouseOverU();
      }
    } catch (e) {
      console.log("No gamepads");
    }

    return (
      <div
        className="drop-zone"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        onKeyUp={this.handleKeyup}
      >
        <div className="container ListPage py-4">
          <div className="row justify-content-center">
            <img
              alt="CORGS SIMULATOR Title"
              src="img/title.jpg"
              width="500px"
            />

            <div className="col-md-8">
              <center>
                <p>
                  Fight through the crowds of the Central Ohio Retro Gaming
                  Society Convention. Collect all 6 items and impress the KING
                  OF VIDEO GAMES.
                </p>
              </center>
            </div>

            <div className="col-md-5">
              <div
                className="mb-4"
                style={
                  this.state.selected === 0
                    ? {
                        border: "4px solid #0e0f9b",
                        borderRadius: "8px",
                      }
                    : {
                        border: "4px solid transparent",
                        borderRadius: "8px",
                      }
                }
              >
                <div
                  style={
                    this.state.selected === 0
                      ? {
                          border: "12px solid #60a7f7",
                          borderRadius: "6px",
                        }
                      : {
                          border: "12px solid transparent",
                          borderRadius: "6px",
                        }
                  }
                >
                  <Link
                    key={"corgssim"}
                    to={"/run/corgssim"}
                    className="list-group-item "
                    onMouseOver={this.mouseOverU}
                  >
                    <div className="container">
                      <h4>CORGS Simulator (US NES)</h4>
                      <center>
                        <img
                          alt="nes label"
                          src="img/neslabel3.jpg"
                          width="200px"
                        />
                      </center>
                      <div>
                        <span>
                          <br />
                          The original release for the CORGS Convention.
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div
                className="mb-4"
                style={
                  this.state.selected === 1
                    ? {
                        border: "4px solid #0e0f9b",
                        borderRadius: "8px",
                      }
                    : {
                        border: "4px solid transparent",
                        borderRadius: "8px",
                      }
                }
              >
                <div
                  style={
                    this.state.selected === 1
                      ? {
                          border: "12px solid #60a7f7",
                          borderRadius: "6px",
                        }
                      : {
                          border: "12px solid transparent",
                          borderRadius: "6px",
                        }
                  }
                >
                  <Link
                    onMouseOver={this.mouseOverJ}
                    key={"corgssimJ"}
                    to={"/run/corgssimJ"}
                    className="list-group-item"
                  >
                    <div className="container">
                      <h4>CORGS Simulator (Famicom)</h4>
                      <center>
                        <img
                          alt="famicom label"
                          src="img/famicom.jpg"
                          width="300px"
                        />
                      </center>
                      <div>
                        <span>
                          <br />
                          The famicom release only has minor changes, mainly
                          that the main character is female. Something that was
                          thought too progressive for US markets at the time.
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* <ListGroup horizontal={true} className="mb-4">
                {Object.keys(config.ROMS)
                  .sort()
                  .map((key) => (
                    
                  ))}
              </ListGroup> */}
          </div>
        </div>
      </div>
    );
  }

  handleKeyup = (e) => {};

  mouseOverJ = (e) => {
    this.setState({ selected: 1 });
  };

  mouseOverU = (e) => {
    this.setState({ selected: 0 });
  };

  deleteRom = (hash) => {
    RomLibrary.delete(hash);
    this.updateLibrary();
  };

  updateLibrary = () => {
    this.setState({ romLibrary: RomLibrary.load() });
  };

  handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.items
      ? e.dataTransfer.items[0].getAsFile()
      : e.dataTransfer.files[0];

    RomLibrary.save(file).then((rom) => {
      this.updateLibrary();
      this.props.history.push({ pathname: "run/local-" + rom.hash });
    });
  };
  handleController = () => {
    if (navigator.getGamepads()[0].axes[0] > 0.5 && this.state.selected != 1) {
      this.setState({ selected: 1 });
    } else if (
      navigator.getGamepads()[0].axes[0] < -0.5 &&
      this.state.selected != 0
    ) {
      this.setState({ selected: 0 });
    }
  };
}

export default ListPage;
