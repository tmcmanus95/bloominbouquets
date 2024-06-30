import IndividualFriendRequest from "./IndividualFriendRequest";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { QUERY_USER_FRIEND_REQUESTS } from "../utils/queries";
import { ACCEPT_FRIEND_REQUEST } from "../utils/mutations";
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoMdFlower,
} from "react-icons/io";

export default function ProfilesReceivedFriendRequestsList({ userId }) {
  const { data, error } = useQuery(QUERY_USER_FRIEND_REQUESTS, {
    variables: { userId: userId },
  });
  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
  const handleAcceptFriendRequest = async (requesterId) => {
    const { data } = await acceptFriendRequest({
      variables: {
        requesterId: requesterId,
        userId: userId,
      },
    });
    setReceivedFriendRequests(
      receivedFriendRequests.filter((request) => request._id !== requesterId)
    );
  };
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);

  useEffect(() => {
    if (data) {
      setReceivedFriendRequests(data.usersFriendRequests.friendRequests);
    }
  }, [data]);
  console.log("receivedfriendrequests", receivedFriendRequests);
  return (
    <section className="flex justify-center flex-col md:text-xl text-base border-2 border-black m-2">
      <h1 className="md:text-xl">Friend Requests</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 justify-center ">
        {receivedFriendRequests.length > 0 ? (
          receivedFriendRequests.map((friend) => (
            <div>
              <div className="flex flex-row border-2 border-black m-2 p-1 rounded-lg justify-between items-center">
                <div className="flex flex-row justify-center items-center">
                  <IoMdFlower style={{}} />
                  <h1>{friend.username}</h1>
                </div>
                <div className="justify-center flex flex-row">
                  <IoIosCheckmarkCircle
                    onClick={() => handleAcceptFriendRequest(friend._id)}
                    className="text-green-700 font-bold hover:text-green-900 hover:cursor-pointer"
                  />
                  <IoIosCloseCircle className="text-red-700 hover:text-red-900 hover:cursor-pointer" />
                </div>
              </div>
            </div>
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
