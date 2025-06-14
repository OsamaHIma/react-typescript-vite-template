import { useProgress, Html } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white bg-black bg-opacity-50 p-4 rounded-lg">
        <div className="text-xl font-bold">Loading</div>
        <div className="mt-2">{progress.toFixed(0)}%</div>
      </div>
    </Html>
  );
};

export default Loader;
