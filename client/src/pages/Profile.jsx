import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import ProfileWords from "../components/ProfileWords";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  if (data) {
    console.log(data);
  }
  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <div className="flex justify-center text-3xl ">
        <h1 className="m-6">{data.me.username}</h1>
      </div>

      {data ? <ProfileWords words={data.me.words} /> : <h1>Loading</h1>}
    </div>
  );
}
