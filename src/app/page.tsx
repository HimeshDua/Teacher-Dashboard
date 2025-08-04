import {ChartAreaInteractive} from '@/components/chart-area-interactive';
import {StudentDataTable} from '@/components/data-table';
import {SectionCards} from '@/components/section-cards';

export default function Page() {
  return (
    <>
      <SectionCards />
      <div className="grid space-y-8 px-4 lg:px-6">
        <ChartAreaInteractive />
        <StudentDataTable />
      </div>
    </>
  );
}
