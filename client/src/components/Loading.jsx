import { hatch } from "ldrs";

export default function Loading({ size }) {
  hatch.register();
  return (
    <div>
      <l-hatch
        className="text-green-200"
        size={size}
        speed="4"
        color="darkgreen"
      ></l-hatch>
    </div>
  );
}
