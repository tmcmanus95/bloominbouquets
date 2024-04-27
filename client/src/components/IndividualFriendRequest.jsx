import { CiCircleCheck } from "react-icons/ci";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useMutation } from "@apollo/client";
import { ACCEPT_FRIEND_REQUEST } from "../utils/mutations";

export default function IndividualFriendRequest({ friendRequest, userId }) {
  const [acceptFriendRequest, error] = useMutation(ACCEPT_FRIEND_REQUEST);
  const requesterId = friendRequest._id;
  console.log("requesterID,", requesterId);
  const handleAcceptFriendRequest = async () => {
    console.log("requesterID,", requesterId);
    console.log("userId,", userId);

    const { data } = await acceptFriendRequest({
      variables: {
        requesterId: requesterId,
        userId: userId,
      },
    });
  };
  return (
    <div className="flex flex-row">
      <h1>User: {friendRequest.username}</h1>
      <h1 className="flex flex-row">
        <span>
          <CiCircleCheck onClick={handleAcceptFriendRequest} />
        </span>
        <span>
          <FaRegCircleXmark />
        </span>
      </h1>
    </div>
  );
}
