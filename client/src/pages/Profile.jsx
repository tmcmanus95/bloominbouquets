import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import ProfileWords from "../components/ProfileWords";
import ProfilesReceivedFriendRequestsList from "../components/ProfilesReceivedFriendRequestsList";
import ProfileFriends from "../components/ProfileFriends";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  if (data) {
    console.log(data);
  }
  return (
    <>
      {data ? (
        <div className="dark:bg-slate-800 dark:text-white">
          <div className="flex justify-center text-3xl">
            <h1 className="m-6">{data.me.username}</h1>
          </div>
          <ProfileWords words={data.me.words} />
          <ProfilesReceivedFriendRequestsList
            friendRequests={data.me.friendRequests}
            userId={data.me._id}
          />
          <ProfileFriends friends={data.me.friends} />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
