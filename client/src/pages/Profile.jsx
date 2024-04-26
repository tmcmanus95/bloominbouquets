import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
export default function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  if (data) {
    console.log(data);
  }
  return <div className="mt-20 flex justify-center"></div>;
}
