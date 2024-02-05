import React from "react";
import Navbar from "../components/Navbar";
import Groupsmain from "./Groupsmain";
import { useParams } from "react-router-dom";

const Group = () => {
  //acces group id from param
const {groupid} = useParams();




  return (
    <div>
      <Navbar />
      <div className="bg-blue-200  m-1">
        <div className="overflow-y-auto" style={{ height:"86vh" }}>
          <Groupsmain groupid={groupid} />
        </div>
      </div>
    </div>
  );
};

export default Group;
