import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { EDIT_USER_COLOR } from "../utils/mutations";
import ProfileWords from "../components/ProfileWords";
import ProfilesReceivedFriendRequestsList from "../components/ProfilesReceivedFriendRequestsList";
import ProfileFriends from "../components/ProfileFriends";
import { ColorPicker } from "antd";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  if (data) {
    console.log("hey data", data);
  }
  const [editUserColor, error] = useMutation(EDIT_USER_COLOR);
  const handleEditUserColor = async (value) => {
    console.log("value", value);
    const { r, g, b } = value.metaColor;
    function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    const hexColor = rgbToHex(r, g, b);
    let hex = hexColor.split(".");
    let userId = data.me._id;
    console.log("hex", hex[0]);
    console.log("data.me._id", data.me._id);
    console.log("editing color");
    try {
      const { data } = await editUserColor({
        variables: { userId: userId, color: hex[0] },
      });
    } catch (error) {
      console.log("Could not edit color", error);
    }
  };
  return (
    <>
      {data ? (
        <div className="dark:bg-slate-800 dark:text-white">
          <div className="flex justify-center text-3xl">
            <h1 className="m-6">{data.me.username}</h1>
            <ColorPicker
              onChangeComplete={(value) => handleEditUserColor(value)}
            />
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
