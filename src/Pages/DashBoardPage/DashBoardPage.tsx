import { SalesChart } from "@/Components/Charts/SalesChart";

export default function DashBoardPage() {
  return (
    <>
      <div className="px-8 py-4">
        <div className="text-2xl font-semibold mb-2">
          DashBoard
        </div>
        <hr className="border-1 border-indigo-300 shadow-lg shadow-black"/>
        {/* Chart */}
        <div className="w-full max-w-2xl h-96 mt-8">
          <SalesChart />
        </div>
      </div>
    </>
  );
}
