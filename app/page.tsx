import Table from "@/app/components/table";
import Search from "@/app/components/search";
import { records } from "@/app/utils/records";

// define a structure for the data

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Search records={records} />
      <div className="divider divider-text"></div>
      <Table />
    </main>
  );
}
