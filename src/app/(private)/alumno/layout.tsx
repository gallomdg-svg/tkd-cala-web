import AlumnoMenu from "@/components/layout/AlumnoMenu";

export default function AlumnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AlumnoMenu />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
