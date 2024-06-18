import IndividualFriendRequest from "./IndividualFriendRequest";
export default function ProfilesReceivedFriendRequestsList({
  friendRequests,
  userId,
}) {
  return (
    <section className="ml-5 flex justify-center flex-col md:text-xl text-xl">
      <h1 className="md:text-xl">Friend Requests</h1>
      <div className="flex justify-center flex-col">
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
