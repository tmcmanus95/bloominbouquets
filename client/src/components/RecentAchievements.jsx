import { Link } from "react-router-dom";
export default function RecentAchievements({ userId, achievements }) {
  return (
    <section className="relative m-2 flex justify-center flex-col border-black dark:border-white border-2">
      <h1 className="md:text-3xl text-center">Recent Achievements</h1>
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-8 content-start">
          {achievements ? (
            achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-row items-center md:text-base "
              >
                <p className="text-xs">{achievement.title}</p>
              </div>
            ))
          ) : (
            <></>
          )}
          <Link
            to={`/achievements/${userId}`}
            className="border-green-500 border-2 hover:cursor:pointer text-center hover:border-green-700 m-0 absolute bottom-2 right-2 p-1 bg-white dark:bg-black"
          >
            All achievements
          </Link>
        </div>
      </div>
    </section>
  );
}
