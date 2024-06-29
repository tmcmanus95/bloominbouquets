import { Link } from "react-router-dom";
import { IoMdFlower } from "react-icons/io";

export default function ProfileFriends({ friends }) {
  return (
    <section className="flex justify-center flex-col md:text-xl text-sm border-2 border-black">
      <h1 className="md:text-5xl text-center">Friends</h1>
      <div className="grid grid-cols-3 md:grid-cols-8 justify-center ">
        {friends.map((friend, index) => (
          <div className="flex flex-row border-2 justify-center border-black m-2 p-1 rounded-lg">
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
