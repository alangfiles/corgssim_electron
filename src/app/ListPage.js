import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ControlsModal from "./ControlsModal";

export const ListPage = () => {
  const [selected, setSelected] = useState(0);
  const [gamepad, setGamepad] = useState(false);
  const [controlModelOpen, setControlModelOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("gamepadconnected", (e) => {
      setGamepad(true);
    });

    const controllerListener = setInterval(() => {
      try {
        if (navigator.getGamepads().length == 0) {
          return;
        }

        if (navigator.getGamepads()[0] == null) {
          return;
        }

        let gamepads = navigator.getGamepads();

        if (
          //left
          gamepads[0]?.buttons[12]?.pressed == true ||
          gamepads[0]?.buttons[14]?.pressed == true ||
          gamepads[0]?.axes[0] < -0.5
        ) {
          setSelected(0);
        }
        if (
          //right
          gamepads[0]?.buttons[13]?.pressed == true ||
          gamepads[0]?.buttons[15]?.pressed == true ||
          gamepads[0]?.axes[0] > 0.5
        ) {
          setSelected(1);
        }
        if (
          gamepads[0]?.buttons[0]?.pressed == true ||
          gamepads[0]?.buttons[1]?.pressed == true ||
          gamepads[0]?.buttons[9]?.pressed == true
        ) {
          //clear the timer and go
          clearInterval(controllerListener);
          window.location = selected == 0 ? "/run/corgssim" : "/run/corgssimJ";
        }
      } catch (e) {
        console.log("error in controller reading: ", e);
      }
    }, 100);
    //on unmount we get rid of this listener
    return () => clearInterval(controllerListener);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img alt="CORGS SIMULATOR Title" src="img/title.jpg" width="500px" />

      <p style={{ maxWidth: "800px", textAlign: "center" }}>
        Fight through the crowds of the Central Ohio Retro Gaming Society
        Convention. Collect all 6 items and impress the KING OF VIDEO GAMES.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          className={`outer-selectable ${selected === 0 && "outer-selected"}`}
        >
          <div
            className={`box inner-selectable ${selected === 0 &&
              "inner-selected"}`}
          >
            <Link
              key={"corgssim"}
              to={"/run/corgssim"}
              onMouseOver={() => {
                setSelected(0);
              }}
            >
              <div className="container">
                <center>
                  <h4>NES Release</h4>
                </center>
                <center>
                  <img alt="nes label" src="img/neslabel3.jpg" width="300px" />
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

        <div
          className={`box outer-selectable ${selected === 1 &&
            "outer-selected"}`}
        >
          <div
            className={`box inner-selectable ${selected === 1 &&
              "inner-selected"}`}
          >
            <Link
              onMouseOver={() => {
                setSelected(1);
              }}
              key={"corgssimJ"}
              to={"/run/corgssimJ"}
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
            : "No Gamepad Detected (Press any button)"}
        </center>
      </div>

      <div style={{ position: "absolute", right: 100, bottom: 0 }}>
        <span>Created by Brian Burke and Alan Files</span>
      </div>
      <div style={{ position: "absolute", right: 0, bottom: 0 }}>
        <img src="img/brianalan.png" height="100px" alt="Authors" />
      </div>
    </div>
  );
};
