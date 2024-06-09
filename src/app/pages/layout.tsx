import Navigation from "@/components/navigation";
import SideBar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className=" flex flex-col ">
        <div className="">
          <Navigation />
        </div>
        <div className="flex flex-row ">
          <div className="overflow-y-auto bg-base-200 h-screen">
            <SideBar />
          </div>

          <div className="justify-center items-center mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
