import IndividualFriendRequest from "./IndividualFriendRequest";
export default function ProfilesReceivedFriendRequestsList({
  friendRequests,
  userId,
}) {
  console.log("friend requests", friendRequests);
  return (
    <section className="ml-5 flex justify-center flex-col md:text-xl text-xl">
      <h1 className="md:text-xl">Friend Requests</h1>
      <div className="flex justify-center flex-col">
        {friendRequests ? (
          friendRequests.map((friend) => (
            <IndividualFriendRequest
              key={friend._id}
              friendRequest={friend}
              userId={userId}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
