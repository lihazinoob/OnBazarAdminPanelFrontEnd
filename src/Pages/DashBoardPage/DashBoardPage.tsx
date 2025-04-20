import { AreaChartStacked } from "@/Components/Charts/AreaChartStacked";

export default function DashBoardPage() {
  return (
    <>
      <div className="p-4">
        <div className="w-full max-w-2xl h-96 mx-auto">
          <AreaChartStacked />
        </div>
      </div>
    </>
  );
}
