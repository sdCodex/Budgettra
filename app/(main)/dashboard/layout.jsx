import DashboradPage from "./page";
import { Suspense } from "react";
import {BarLoader} from "react-spinners";


export default function DashboardLayout() {
  return (
    <div className="px-5">
      <h1 className="text-6xl font-bold tracking-tight leading-tight bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text mb-5">
        Dashboard
      </h1>

      <Suspense fallback={<BarLoader className="mt-4" width={"100%"} color="#933ea"/>}>
        <DashboradPage />
      </Suspense>
    </div>
  );
}
