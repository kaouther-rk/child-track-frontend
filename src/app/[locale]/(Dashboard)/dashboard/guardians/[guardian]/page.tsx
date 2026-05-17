import { DashContent, DashContenTitle } from "@/components/DashCrudContent";
import UpdateGuardian from "@/components/local/guardian/update";

// Correctly typing the params object for dynamic routes
export interface PageProps {
  params: Promise<{
    guardian: string;
  }>;

}

export default async function EditGuardianPage({ params }: PageProps) {
  return (
    <DashContent>
      <DashContenTitle>Edit Guardian</DashContenTitle>
      <div className="mb-5"></div>
      <UpdateGuardian guardian={Number((await params).guardian)} />
    </DashContent>
  );
}