import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import ProfileWords from "../components/ProfileWords";
import { IoMdPersonAdd, IoMdFlower } from "react-icons/io";
import { SEND_FRIEND_REQUEST } from "../utils/mutations";
import { GiFlowerPot } from "react-icons/gi";
import { Link } from "react-router-dom";
import UserReceivedWords from "../components/UserReceivedWords";

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
  let isFriend = false;
  let myId;
  const [sendFriendRequest, error] = useMutation(SEND_FRIEND_REQUEST);
  if (data) {
    myId = data.me._id;
    for (let i = 0; i < data.me.friends.length; i++) {
      if (data.me.friends[i]._id === otherPersonsId) {
        isFriend = true;
      }
    }
  }
  console.log("data. ", data);
  const handleAddFriend = async () => {
    const { data } = await sendFriendRequest({
      variables: {
        userId: myId,
        recipientId: otherPersonsId,
      },
    });
  };
  return (
    <>
      {data ? (
        <div className="dark:bg-slate-800 dark:text-white">
          <div className="flex justify-center text-3xl">
            <h1 className="m-6">{data.user.username}</h1>
            {isFriend ? (
              <>
                <IoMdFlower />
                <h6 className="text-xs">Friends</h6>
              </>
            ) : (
              <IoMdPersonAdd onClick={handleAddFriend} />
            )}
          </div>
          {isFriend ? (
            <Link to="/sendABouquet">
              <div>
                <GiFlowerPot />
                <p>Send a bouquet to {data.user.username}</p>
              </div>
            </Link>
          ) : (
            <></>
          )}
          <div>
            <ProfileWords words={data.user.words} />
          </div>
          <div>
            <UserReceivedWords bouquets={data.user.giftedWords} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
