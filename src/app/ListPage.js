import React, { useEffect, useState } from "react";
import "./ListPage.css";
import { Link } from "react-router-dom";

export const ListPage = () => {
  const [selected, setSelected] = useState(0);
  const [gamepad, setGamepad] = useState(false);

  useEffect(() => {
    window.addEventListener("gamepadconnected", (e) => {
      setGamepad(true);
    });

    // const controllerListener = setInterval(() => {
    //   if (navigator.getGamepads().length == 0) {
    //     return;
    //   }

    //   if (navigator.getGamepads()[0] == null) {
    //     return;
    //   }

    //   let gamepads = navigator.getGamepads();

    //   if (gamepads[0].buttons[14].pressed == true || gamepads[0].axis[0] < -0.5) {
    // left press
    //     setSelected(0);
    //   }
    //   if (gamepads[0].buttons[15].pressed == true || gamepads[0].axis[0] > 0.5) {
    // right press
    //     setSelected(1);
    //   }
    //   if (
    //     gamepads[0].buttons[0].pressed == true ||
    //     gamepads[0].buttons[1].pressed == true
    //   ) {
    //     //go!
    //     window.location = selected == 0 ? "/run/corgssim" : "/run/corgssimJ";
    //   }
    // }, 1000);
  }, []);

  return (
    <div className="drop-zone">
      <div className="container ListPage py-4">
        <div className="row justify-content-center">
          <img alt="CORGS SIMULATOR Title" src="img/title.jpg" width="500px" />

          <div className="col-md-8">
            <center>
              <p>
                Fight through the crowds of the Central Ohio Retro Gaming
                Society Convention. Collect all 6 items and impress the KING OF
                VIDEO GAMES.
              </p>
            </center>
          </div>

          <div className="col-md-5">
            <div
              className="mb-4"
              style={
                selected === 0
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
                  selected === 0
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
                  onMouseOver={() => {
                    setSelected(0);
                  }}
                >
                  <div className="container">
                    <center>
                      <h4>NES Release</h4>
                    </center>
                    <center>
                      <img
                        alt="nes label"
                        src="img/neslabel3.jpg"
                        width="300px"
                      />
                    </center>
                    <div>
                      <span>
                        <br />
                        The NES release for the CORGS Convention.
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
                selected === 1
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
                  selected === 1
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
                  onMouseOver={() => {
                    setSelected(1);
                  }}
                  key={"corgssimJ"}
                  to={"/run/corgssimJ"}
                  className="list-group-item"
                >
                  <div className="container">
                    <center>
                      <h4>Famicom Release</h4>
                    </center>
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
                        The famicom release, with minor changes from the NES
                        release.
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 70 }}>
            <center>
              {gamepad
                ? "Gamepad Detected!"
                : "No Gamepad Detected (Press a button to register)"}
            </center>
          </div>

          <div style={{ position: "absolute", right: 100, bottom: 0 }}>
            <span>Created by Brian Burke and Alan Files</span>
          </div>
          <div style={{ position: "absolute", right: 0, bottom: 0 }}>
            <img src="img/brianalan.png" height="100px" alt="Authors" />
          </div>
        </div>
      </div>
    </div>
  );
};
