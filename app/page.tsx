import { MdOutlineSearch } from "react-icons/md";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <label className="input input-bordered flex items-center w-6/12">
        <MdOutlineSearch className="" />
        <input type="text" className="grow" placeholder="Search" />
      </label>
    </main>
  );
}
