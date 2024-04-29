import { Link } from "react-router-dom";
export default function ProfileFriends({ friends }) {
  return (
    <section className="ml-5 flex justify-center flex-col md:text-3xl text-2xl">
      <h1 className="md:text-5xl">Friends</h1>
      <div className="flex justify-center flex-col">
        {friends.map((friend, index) => (
          <Link to={`/user/${friend._id}`}>
            <div key={index}>{friend.username}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
