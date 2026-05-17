import { DashContent, DashContenTitle } from "@/components/DashCrudContent";
import UpdateBraclet from "@/components/local/braclet/update";

// Correctly typing the params object for dynamic routes
export interface PageProps {
  params: Promise<{
    braclet: string;
  }>;

}

export default async function EditBracletPage({ params }: PageProps) {
  return (
    <DashContent>
      <DashContenTitle>Edit Braclet</DashContenTitle>
      <div className="mb-5"></div>
      <UpdateBraclet braclet={Number((await params).braclet)} />
    </DashContent>
  );
}