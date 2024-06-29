import IndividualFriendRequest from "./IndividualFriendRequest";
export default function ProfilesReceivedFriendRequestsList({
  friendRequests,
  userId,
}) {
  return (
    <section className="flex justify-center flex-col md:text-xl text-base border-2 border-black">
      <h1 className="md:text-xl">Friend Requests</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 justify-center ">
        {friendRequests.length > 0 ? (
          friendRequests.map((friend) => (
            <IndividualFriendRequest
              key={friend._id}
              friendRequest={friend}
              userId={userId}
            />
          ))
        ) : (
          <div>
            <h1>No friend requests</h1>
          </div>
        )}
      </div>
    </section>
  );
}
