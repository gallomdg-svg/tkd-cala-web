import ProfesorMenu from "@/components/layout/ProfesorMenu";

export default function ProfesorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <ProfesorMenu />

      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
