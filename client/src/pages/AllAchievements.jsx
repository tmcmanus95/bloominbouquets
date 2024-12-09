import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { QUERY_ALL_ACHIEVEMENTS } from "../utils/queries";
export default function AllAchievements() {
  const { userId } = useParams();
  const [achievements, setAchievements] = useState([]);
  const { data, loading } = useQuery(QUERY_ALL_ACHIEVEMENTS, {
    variables: { userId: userId },
  });
  if (data) {
    console.log(data);
  }
  if (achievements) {
    console.log(achievements);
  }
  useEffect(() => {
    setAchievements(data?.user?.achievements);
  }, [data]);
  return (
    <>
      {achievements ? (
        <>
          <h1>
            {achievements.map((achievement) => (
              <div key={achievement._id}>{achievement.title}</div>
            ))}
          </h1>
        </>
      ) : (
        <>
          <h1>no achievements</h1>
        </>
      )}
    </>
  );
}
