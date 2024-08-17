import { Link } from "react-router-dom";
import { IoMdFlower } from "react-icons/io";

export default function ProfileFriends({ friends, userId }) {
  return (
    <section className="flex justify-center flex-col md:text-xl text-sm border-2 border-black dark:border-white m-2">
      <h1 className="md:text-3xl text-center ">Friends</h1>
      <div className="grid grid-cols-3 md:grid-cols-8 justify-center ">
        {friends.map((friend, index) => (
          <div
            className="flex flex-row justify-center p-1 rounded-lg border-2 m-2 overflow-hidden"
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
              <div className="flex flex-row " key={index}>
                {friend.username}
              </div>
            </Link>
          </div>
        ))}
        <Link
          to={`/user/${userId}/friends`}
          className="border-green-500 border-2 hover:cursor:pointer text-center hover:border-green-700 m-0 relative bottom-0 right-0"
        >
          All Friends
        </Link>
      </div>
    </section>
  );
}
