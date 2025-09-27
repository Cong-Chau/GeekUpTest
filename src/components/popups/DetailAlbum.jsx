import UserAvatar from "../items/UserAvatar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function DetailAlbum({ albumID = null, onClose }) {
  const [user, setUser] = useState(null);
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}`)
      .then((response) => response.json())
      .then((data) => {
        const userID = data.userId;
        setAlbum(data);
        // Lấy user
        fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
          .then((response) => response.json())
          .then((userData) => {
            setUser(userData);
          })
          .catch((error) => console.error("Error fetching user:", error));

        // Lấy ảnh
        fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}/photos`)
          .then((response) => response.json())
          .then((photosData) => {
            setPhotos(photosData);
          })
          .catch((error) => console.error("Error fetching photos:", error));
      })
      .catch((error) => console.error("Error fetching album:", error));
  }, [albumID]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 w-2/3 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-between items-center mb-4">
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
          <div className="flex flex-row items-center gap-2">
            <UserAvatar name={user.name} size={48} />
            <div>
              <Link
                to={`/users/${user.id}`}
                className="font-semibold hover:font-bold hover:cursor-pointer"
              >
                {user?.name}
              </Link>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
        )}

        {/* Danh sách ảng */}
        <div className="mt-4 grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2 bg-gray-100">
          {photos.length > 0 ? (
            photos.map((photo) => (
              <div
                key={photo.id}
                className="flex flex-col items-center border border-gray-300 p-2 rounded hover:shadow-lg bg-white"
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <p className="text-sm text-center mt-2">{photo.title}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading photos...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailAlbum;
