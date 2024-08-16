import { hatch } from "ldrs";

export default function Loading() {
  hatch.register();
  return (
    <div className="m-20">
      <l-hatch
        className="text-green-200"
        size="40"
        speed="4"
        color="darkgreen"
      ></l-hatch>
    </div>
  );
}
