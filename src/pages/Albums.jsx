import { useState, useEffect } from "react";
import { MoveLeft, MoveRight, Loader2 } from "lucide-react";
import UserAvatar from "../components/items/UserAvatar";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const maximunRows = 20;
  const totalPages = Math.ceil(100 / maximunRows); // API có 100 album cố định

  // Lấy danh sách users (1 lần duy nhất)
  useEffect(() => {
    // giả sử thời gian chờ
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // lấy userName từ userId
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  // Lấy albums theo trang
  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/albums?_start=${
            (currentPage - 1) * maximunRows
          }&_limit=${maximunRows}`
        );
        const data = await res.json();
        // Lưu thêm vào chứ không ghi đè
        setAlbums((prev) => [...prev, ...data]);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, [currentPage]);

  return (
    <div className="bg-gray-200 w-full min-h-screen py-8">
      <div className="bg-white w-[94%] mx-auto rounded-md p-4 overflow-x-auto">
        <table className="w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-center">ID</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {loading
              ? // Hiệu ứng preload (skeleton rows)
                Array.from({ length: maximunRows }).map((_, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 animate-pulse h-12"
                  >
                    <td className="px-4 text-center">
                      <div className="bg-gray-300 rounded w-6 h-4 mx-auto"></div>
                    </td>
                    <td className="px-4">
                      <div className="bg-gray-300 rounded w-40 h-4"></div>
                    </td>
                    <td className="px-4">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                        <div className="bg-gray-300 rounded w-24 h-4"></div>
                      </div>
                    </td>
                    <td className="px-4">
                      <div className="bg-gray-300 rounded w-12 h-6 mx-auto"></div>
                    </td>
                  </tr>
                ))
              : // Chỉ hiển thị maximunRows số bản ghi
                albums
                  .slice(
                    (currentPage - 1) * maximunRows,
                    currentPage * maximunRows
                  )
                  .map((album) => (
                    <tr
                      key={album.id}
                      className="border-b border-gray-200 hover:bg-gray-100 h-12"
                    >
                      <td className="px-4 text-center">{album.id}</td>
                      <td className="px-4">{album.title}</td>
                      <td className="px-4 text-left flex items-center space-x-2">
                        <UserAvatar
                          name={userMap[album.userId] || "Unknown"}
                          size={32}
                        />
                        <span>{userMap[album.userId] || "Unknown"}</span>
                      </td>
                      <td className="px-4">
                        <div className="flex items-center justify-center h-full space-x-3">
                          <button className="px-3 py-1 rounded-md bg-green-200 text-green-800 hover:bg-green-300">
                            Show
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 rounded-md flex items-center gap-1 ${
              currentPage === 1 || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <MoveLeft size={18} />
            Prev
          </button>

          {loading ? (
            <Loader2 className="animate-spin text-blue-500" size={20} />
          ) : (
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
          )}

          <button
            disabled={currentPage === totalPages || loading}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 rounded-md flex items-center gap-1 ${
              currentPage === totalPages || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
            <MoveRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Albums;
