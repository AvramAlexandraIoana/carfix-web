import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { AppContext } from "../../context/app.context";

export default function DeveloperRoom() {
  let history = useHistory();
  const { user, setUser } = useContext(AppContext);

  const clearAll = () => {
    localStorage.clear();
    setUser(null);
  };
  return (
    <div>
      <Button block shape="round" onClick={() => history.push("/")}>
        HOME
      </Button>
      <Button block shape="round" onClick={() => history.push("/step-map-2d")}>
        Step map 2D
      </Button>
      <Button block shape="round" onClick={() => history.push("/step-custom")}>
        Step custom
      </Button>

      <Button onClick={clearAll}>Sterge TOT</Button>
    </div>
  );
}
