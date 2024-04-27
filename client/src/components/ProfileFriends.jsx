export default function ProfileFriends({ friends }) {
  return (
    <section className="ml-5 flex justify-center flex-col md:text-3xl text-2xl">
      <h1 className="md:text-5xl">Friends</h1>
      <div className="flex justify-center flex-col">
        {friends.map((friend, index) => (
          <div key={index}>{friend.username}</div>
        ))}
      </div>
    </section>
  );
}
