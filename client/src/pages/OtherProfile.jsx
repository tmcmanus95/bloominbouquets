import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USER, QUERY_MY_ID } from "../utils/queries";
import ProfileWords from "../components/ProfileWords";
import { IoMdPersonAdd } from "react-icons/io";
import { SEND_FRIEND_REQUEST } from "../utils/mutations";

export default function OtherProfile() {
  const { otherPersonsId } = useParams();
  const {
    loading,
    data,
    error: queryUserError,
  } = useQuery(QUERY_USER, {
    variables: {
      userId: otherPersonsId,
    },
  });
  const {
    loading: queryIDLoading,
    data: queryIDData,
    error: queryIDError,
  } = useQuery(QUERY_MY_ID);
  let myId;
  const [sendFriendRequest, error] = useMutation(SEND_FRIEND_REQUEST);
  if (data) {
    console.log("user data", data);
  }
  if (queryIDData) {
    myId = queryIDData.me._id;
  }

  const handleAddFriend = async () => {
    const { data } = await sendFriendRequest({
      variables: {
        userId: myId,
        recipientId: otherPersonsId,
      },
    });
    console.log("data");
  };
  return (
    <>
      {data ? (
        <div className="dark:bg-slate-800 dark:text-white">
          <div className="flex justify-center text-3xl">
            <h1 className="m-6">{data.user.username}</h1>
            <IoMdPersonAdd onClick={handleAddFriend} />
          </div>
          <div>
            <ProfileWords words={data.user.words} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
