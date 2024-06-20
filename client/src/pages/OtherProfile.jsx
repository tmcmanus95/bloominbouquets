import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import ProfileWords from "../components/ProfileWords";
import { IoMdPersonAdd, IoMdFlower } from "react-icons/io";
import { SEND_FRIEND_REQUEST } from "../utils/mutations";
import { GiFlowerPot } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserReceivedWords from "../components/UserReceivedWords";

export default function OtherProfile() {
  const { otherPersonsId } = useParams();
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  let userBackgroundColor = "";
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
    userBackgroundColor = data.user.color;
    for (let i = 0; i < data.me.friends.length; i++) {
      if (data.me.friends[i]._id === otherPersonsId) {
        isFriend = true;
      }
    }
  }
  const handleAddFriend = async () => {
    const { data } = await sendFriendRequest({
      variables: {
        userId: myId,
        recipientId: otherPersonsId,
      },
    });
    setFriendRequestSent(true);
  };
  return (
    <>
      {data ? (
        <div className="dark:bg-slate-800 dark:text-white">
          <div className="flex justify-center text-3xl">
            <h1
              style={{ backgroundColor: userBackgroundColor }}
              className="m-6"
            >
              {data.user.username}
            </h1>
            {isFriend ? (
              <>
                <IoMdFlower />
                <h6 className="text-xs">Friends</h6>
              </>
            ) : !friendRequestSent ? (
              <IoMdPersonAdd onClick={handleAddFriend} />
            ) : (
              <></>
            )}
          </div>
          {isFriend ? (
            <Link to="/sendABouquet">
              <div className="flex flex-row ml-3 bg-green-100 p-3 w-72">
                <GiFlowerPot />
                <p className="flex text-center">
                  Send a bouquet to {data.user.username}
                </p>
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
