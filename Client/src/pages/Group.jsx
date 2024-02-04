import React from "react";
import Navbar from "../components/Navbar";
import Groupsmain from "./Groupsmain";

const Group = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-blue-200  m-1">
        <div className="overflow-y-auto" style={{ height:"86vh" }}>
          <Groupsmain />
        </div>
      </div>
    </div>
  );
};

export default Group;
