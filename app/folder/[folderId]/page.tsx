import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import LinkGrid from "../../components/LinkGrid";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <LinkGrid folderId={Number(folderId)} />
        </main>
      </div>
    </div>
  );
}
