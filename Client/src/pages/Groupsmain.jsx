import axios from "axios";
import React, { useEffect, useState } from "react";

const Groupsmain = ({ groupid }) => {
  const baseUrl = "http://localhost:5000";
  const [groupUsers, setGroupUsers] = useState([]);
  const [groupId, setGroupId] = useState(groupid);
  const [groupName, setGroupName] = useState("");
  const [currUser, setCurrUser] = useState(localStorage.getItem("email"));
  const [user_index_map, setUserIndexMap] = useState({});
  const [transactionMatrix, setTransactionMatrix] = useState([[]]);
  const [requestMoney, setRequestMoney] = useState(0);

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {}, [transactionMatrix]);

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
      //mapping user email to index
      let temp = {};
      groupdata.data.users.forEach((user) => {
        temp[user.email] = user.member_id;
      });

      setUserIndexMap(temp);
      console.log(user_index_map);

      //setting taransaction matrix

      let temp_trasactionmatrix = groupdata.data.transction_matrix;
      let tempt = [];
      console.log(temp_trasactionmatrix);
      temp_trasactionmatrix.forEach((row) => {
        console.log(row);
        tempt.push(row);
      });

      console.log(tempt);

      setTransactionMatrix(tempt);
      console.log(transactionMatrix);
    } catch (error) {}
  };

  const RequestMoney = async (from, to, groupid, amount) => {
    //chek if ampunt is a number
    if (isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    alert(" ready to send request");
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md ">
      <h1 className="text-xl font-bold mb-2">{groupName}</h1>
      <table className="w-full border-collapse border border-blue-500 ">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-blue-500 py-2 px-2">Email</th>
            <th className="border border-blue-500 py-2 px-2">To give</th>
            <th className="border border-blue-500 py-2 px-2">To take</th>
            <th className="border border-blue-500 py-2 px-2">Request money</th>
          </tr>
        </thead>
        <tbody>
          {groupUsers.map((user, index) => (
            <tr key={index} className="hover:bg-blue-200">
              <td className="border border-blue-500 py-2 px-4">{user.email}</td>
              <td className="border border-blue-500 py-2 px-4">
                <div className="flex flex-row justify-between">
                  <span>
                    {
                      transactionMatrix[user_index_map[currUser]][
                        user_index_map[user.email]
                      ]
                    }
                  </span>
                  <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
                    Settle
                  </button>
                </div>
              </td>
              <td className="border border-blue-500 py-2 px-4">
                <div className="flex flex-row justify-between">
                  <span>
                    {
                      transactionMatrix[user_index_map[user.email]][
                        user_index_map[currUser]
                      ]
                    }
                  </span>
                  <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
                    Settle
                  </button>
                </div>
              </td>

              {currUser === user.email ? (
                <td className="border border-blue-500 py-2 px-4">
                  {/*place this in center*/ }
                  <div className="flex flex-row justify-around">
                  <span>
                    My Account
                  </span>
                </div>
                 
                  
                </td>
              ) : (
                <td className="border border-blue-500 py-2 px-4">
                  <div className="flex flex-row justify-around">
                    <input
                      className="py-1 border border-gray-300 rounded text-sm" // Removed px-2 and reduced font size
                      id={`amountInput-${index}`}
                    />
                    <button
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" // Adjusted button margin
                      onClick={() => {
                        const amount = document.getElementById(
                          `amountInput-${index}`
                        ).value;
                        RequestMoney(currUser, user.email, groupId, amount);
                      }}
                    >
                      Request
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Groupsmain;
