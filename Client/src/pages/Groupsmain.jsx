import axios from "axios";
import React, { useEffect, useState } from "react";

const Groupsmain = ({ groupid }) => {
  const baseUrl = "http://localhost:5000";
  const [groupUsers, setGroupUsers] = useState([]);
  const [groupId, setGroupId] = useState(groupid);
  const [groupName, setGroupName] = useState("");
  const [currUser, setCurrUser] = useState(localStorage.getItem("email"));

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    setCurrUser(email);

    try {
      const groupdata = await axios(`${baseUrl}/groups/getgroupinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
          groupid: groupId,
        },
      });

      setGroupName(groupdata.data.name);
      setGroupUsers(groupdata.data.users);
    } catch (error) {}
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md min">
    <h1 className="text-xl font-bold mb-2">{groupName}</h1>
    <table className="w-full border-collapse border border-blue-500">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="border border-blue-500 py-2 px-4">Email</th>
          <th className="border border-blue-500 py-2 px-4">To give</th>
          <th className="border border-blue-500 py-2 px-4">To take</th>
          <th className="border border-blue-500 py-2 px-4">Request money</th>
        </tr>
      </thead>
      <tbody>
        {groupUsers.map((user, index) => (
          <tr key={index} className="hover:bg-blue-200">
            <td className="border border-blue-500 py-2 px-4">{user.email}</td>
            <td className="border border-blue-500 py-2 px-4">Random<button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Settle</button></td>
            <td className="border border-blue-500 py-2 px-4">Random<button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Settle</button></td>
            <td className="border border-blue-500 py-2 px-4"><button className="px-2 py-1 bg-blue-500 text-white rounded">Request</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default Groupsmain;
