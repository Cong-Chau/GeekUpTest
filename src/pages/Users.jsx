import { useState, useEffect } from "react";
import UserAvatar from "../components/items/UserAvatar";
import DetailUser from "../components/popups/DetailUser";
import DetailAlbum from "../components/popups/DetailAlbum";
function Users() {
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedUsers = sessionStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          sessionStorage.setItem("users", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, []);

  return (
    <div className="bg-gray-200 w-full min-h-screen py-8">
      <div className="bg-white w-[94%] mx-auto rounded-md p-4 overflow-x-auto">
        <div className="flex flex-col mb-4 gap-1">
          <h1 className="font-bold text-2xl">Users</h1>
          <p className="text-gray-600">Browse and manage users</p>
        </div>
        <table className="w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-center">ID</th>
              <th className="py-2 px-4 text-left">Avatar</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Website</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="px-4 text-center">{user.id}</td>
                <td className="px-4 py-2">
                  <UserAvatar name={user.name || "Unknown"} size={32} />
                </td>
                <td className="px-4">{user.name}</td>
                <td className="px-4">{user.email}</td>
                <td className="px-4">{user.phone}</td>
                <td className="px-4">
                  <a
                    href={
                      user.website.startsWith("http")
                        ? user.website
                        : `https://${user.website}`
                    }
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </td>
                <td className="px-4 text-center">
                  <button
                    onClick={() => setUserID(user.id)}
                    className="px-3 py-1 rounded-md bg-green-200 text-green-800 hover:bg-green-300"
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {userID && <DetailUser userID={userID} onClose={() => setUserID(null)} />}
    </div>
  );
}

export default Users;
