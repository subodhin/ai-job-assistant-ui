"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("./Dashboard"),
  {
    ssr: false,
    loading: () => (
      <main style={{ padding: 24 }}>
        Loading AI Job Assistant...
      </main>
    ),
  }
);

export default function DashboardClient() {
  return <Dashboard />;
}
