import { Link } from "react-router-dom";
import { IoMdFlower } from "react-icons/io";

export default function ProfileFriends({ friends }) {
  return (
    <section className="flex justify-center flex-col md:text-xl text-sm border-2 border-black dark:border-white m-2">
      <h1 className="md:text-3xl text-center ">Friends</h1>
      <div className="grid grid-cols-3 md:grid-cols-8 justify-center ">
        {friends.map((friend, index) => (
          <div
            className="flex flex-row justify-center p-1 rounded-lg border-2 m-2"
            style={{ borderColor: friend.color }}
          >
            <Link
              to={`/user/${friend._id}`}
              className="flex flex-row items-center"
            >
              <IoMdFlower
                style={{ color: friend.color }}
                className="flex flex-row"
              />
              <div className="flex flex-row" key={index}>
                {friend.username}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
