import IndividualFriendRequest from "./IndividualFriendRequest";
export default function ProfilesReceivedFriendRequestsList({
  friendRequests,
  userId,
}) {
  console.log("friend requests", friendRequests);
  return (
    <section className="ml-5 flex justify-center flex-col md:text-3xl text-2xl">
      <h1 className="md:text-5xl">Friend Requests</h1>
      <div className="flex justify-center flex-col">
        {friendRequests ? (
          friendRequests.map((friend, index) => (
            <IndividualFriendRequest
              key={index}
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
