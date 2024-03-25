import { MdOutlineSearch } from "react-icons/md";
import Table from "@/app/components/table";

// define a structure for the data

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <label className="input input-bordered flex items-center w-6/12">
        <MdOutlineSearch />
        <input type="text" className="grow" placeholder="Search" />
      </label>
      <div className="divider divider-text"></div>
      <Table />
    </main>
  );
}
