import { DotLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <DotLoader color="#4A90E2" size={60} />
    </div>
  );
}
