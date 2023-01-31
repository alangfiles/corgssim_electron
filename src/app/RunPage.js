import React, { Component } from "react";
import { Button, Progress } from "reactstrap";

import ControlsModal from "./ControlsModal";
import Emulator from "../emulator/Emulator";
// import { loadBinary } from "./utils";

import "./RunPage.css";

/*
 * The UI for the emulator. Also responsible for loading ROM from URL or file.
 */
class RunPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      romName: null,
      romData: null,
      running: false,
      paused: false,
      controlsModalOpen: false,
      loading: true,
      loadedPercent: 3,
      error: null,
    };
  }

  render() {
    return (
      <div className="RunPage">
        {this.state.paused ? (
          <div
            style={{
              backgroundColor: "black",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: "200px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <h3>
                {this.state.romName === "corgssimJ"
                  ? "CORGS Simulator (International Release)"
                  : "CORGS Simulator (US Release)"}
              </h3>
              <br />
              <br />
              <Button
                outline
                color="primary"
                onClick={this.handlePauseResume}
                disabled={!this.state.running}
              >
                {this.state.paused ? "Resume" : "Pause"}
              </Button>
              <br />
              <Button
                onClick={() => {
                  window.location = "/";
                }}
                outline
                color="primary"
                disabled={!this.state.running}
              >
                Back to Menu
              </Button>
              <br />
              <Button
                outline
                color="primary"
                onClick={this.toggleControlsModal}
              >
                Controls
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}

        {this.state.error ? (
          this.state.error
        ) : (
          <div
            className="screen-container"
            ref={(el) => {
              this.screenContainer = el;
            }}
          >
            {this.state.loading ? (
              <Progress
                value={this.state.loadedPercent}
                style={{
                  position: "absolute",
                  width: "70%",
                  left: "15%",
                  top: "48%",
                }}
              />
            ) : this.state.romData ? (
              <Emulator
                romData={this.state.romData}
                paused={this.state.paused}
                ref={(emulator) => {
                  this.emulator = emulator;
                }}
              />
            ) : null}

            {/* TODO: lift keyboard and gamepad state up */}
            {this.state.controlsModalOpen && (
              <ControlsModal
                isOpen={this.state.controlsModalOpen}
                toggle={this.toggleControlsModal}
                keys={this.emulator.keyboardController.keys}
                setKeys={this.emulator.keyboardController.setKeys}
                promptButton={this.emulator.gamepadController.promptButton}
                gamepadConfig={this.emulator.gamepadController.gamepadConfig}
                setGamepadConfig={
                  this.emulator.gamepadController.setGamepadConfig
                }
              />
            )}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.layout);
    window.addEventListener("keyup", this.keyUp);
    this.layout();
    this.load();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.layout);
    if (this.currentRequest) {
      this.currentRequest.abort();
    }
  }

  load = () => {
    if (this.props.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.setState({ romName: slug });
      const localROMData = localStorage.getItem("blob-" + slug);
      const romDataBinaryString = Buffer.from(localROMData, "base64");
      //wait 500 seconds during load
      setTimeout(() => {
        this.handleLoaded(romDataBinaryString.toString("binary"));
      }, 500);
    }
  };

  keyUp = (e) => {
    if (e.keyCode === 27) {
      this.handlePauseResume();
    }
  };

  handleProgress = (e) => {
    if (e.lengthComputable) {
      this.setState({ loadedPercent: (e.loaded / e.total) * 100 });
    }
  };

  handleLoaded = (data) => {
    this.setState({ running: true, loading: false, romData: data });
  };

  handlePauseResume = () => {
    this.setState({ paused: !this.state.paused });
  };

  layout = () => {
    // let navbarHeight = parseFloat(window.getComputedStyle(this.navbar).height);
    this.screenContainer.style.height = `${window.innerHeight}px`;
    if (this.emulator) {
      this.emulator.fitInParent();
    }
  };

  toggleControlsModal = () => {
    this.setState({ controlsModalOpen: !this.state.controlsModalOpen });
  };
}

export default RunPage;
