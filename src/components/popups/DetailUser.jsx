import UserAvatar from "../items/UserAvatar";
import DetailAlbum from "./DetailAlbum";
import { useState, useEffect } from "react";

function DetailUser({ userID = null, onClose }) {
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [albumID, setAlbumID] = useState(null);
  useEffect(() => {
    // Lấy user từ sessionStorage
    const storedUsers = sessionStorage.getItem("users");
    if (storedUsers) {
      setUser(JSON.parse(storedUsers).find((u) => u.id === userID) || null);
    }

    // Kiểm tra albums trong sessionStorage
    const storedAlbums = sessionStorage.getItem("albums");
    if (storedAlbums) {
      const parsedAlbums = JSON.parse(storedAlbums);
      const filtered = parsedAlbums.filter((album) => album.userId === userID);
      if (filtered.length > 0) {
        setAlbums(filtered);
        return; // có rồi thì dừng
      }
    }

    // Nếu không có thì fetch từ API
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userID}`
        );
        const data = await res.json();
        setAlbums(data);

        // lưu lại vào sessionStorage (merge với albums cũ nếu có)
        if (storedAlbums) {
          const old = JSON.parse(storedAlbums);
          const merged = [
            ...old,
            ...data.filter((a) => !old.some((o) => o.id === a.id)),
          ];
          sessionStorage.setItem("albums", JSON.stringify(merged));
        } else {
          sessionStorage.setItem("albums", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Error fetching albums:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [userID]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-3xl h-11/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl">Show album</h1>
          <button
            className="font-bold hover:cursor-pointer hover:text-red-500"
            onClick={onClose}
          >
            X
          </button>
        </div>

        {/* Thông tin user */}
        {user ? (
          <div className="flex items-center gap-4 mb-6">
            <UserAvatar name={user.name} size={48} />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse mb-6" />
        )}

        {/* Danh sách album */}
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-2 px-4 text-center ">ID</th>
                <th className="py-2 px-4 text-left ">Title</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : albums.length > 0 ? (
                albums.map((album) => (
                  <tr
                    key={album.id}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-300"
                  >
                    <td className="px-4 py-2 text-center 0">{album.id}</td>
                    <td className="px-4 py-2 ">{album.title}</td>
                    <td className="px-4 py-2 text-center ">
                      <button
                        onClick={() => setAlbumID(album.id)}
                        className="px-3 py-1 rounded-md bg-green-200 text-green-800 hover:cursor-pointer hover:bg-green-300 transition-colors"
                      >
                        Show
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-400">
                    No albums found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {albumID && (
        <DetailAlbum albumID={albumID} onClose={() => setAlbumID(null)} />
      )}
    </div>
  );
}

export default DetailUser;
