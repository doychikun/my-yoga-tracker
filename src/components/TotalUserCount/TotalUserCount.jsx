import React from "react";
import { getAllUsers } from '../../services/users.service';
import { useEffect, useState } from "react";

export default function TotalUserCount() {
  const [usersCount, setUserCount] = useState([]);
  useEffect(() => {
    getAllUsers().then((data) => setUserCount(data));
  }, []);

  return (
    <h3>
      {`There are currently ${usersCount.length} users using our website!`}
    </h3>
  );
}
