import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import { useParams, Link } from "react-router-dom";
export default function UserSearchResults() {
  const { searchTerm } = useParams();
  const { loading, error, data } = useQuery(QUERY_USERS, {
    variables: { username: searchTerm },
  });
  if (data) {
    console.log("data", data);
  }
  return (
    <div>
      {data ? (
        <div>
          <Link to={`/user/${data.searchUsers._id}`}>
            <h1>{data.searchUsers.username}</h1>
          </Link>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
