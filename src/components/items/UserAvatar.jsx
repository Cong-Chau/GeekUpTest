function UserAvatar({ name, size = 40, rounded = true }) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&size=${size}&rounded=${rounded}`;

  return (
    <img
      src={avatarUrl}
      alt={name}
      className="inline-block mr-2 mt-2"
      style={{ width: size, height: size }}
    />
  );
}

export default UserAvatar;
