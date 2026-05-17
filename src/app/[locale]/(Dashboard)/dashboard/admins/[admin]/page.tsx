import { DashContent, DashContenTitle } from "@/components/DashCrudContent";
import UpdateAdmin from "@/components/local/admin/update";
import { getAdmin } from "@/lib/server/actions/doctors/getAdmin";
import { Admin } from "@/lib/server/type/admin/admin";

// Correctly typing the params object for dynamic routes
export interface PageProps {
  params: Promise<{
    admin: string;
  }>;

}

export default async function EditAdminPage({ params }: PageProps) {
  return (
    <DashContent>
      <DashContenTitle>Edit Admin</DashContenTitle>
      <div className="mb-5"></div>
      <UpdateAdmin admin={Number((await params).admin)} />
    </DashContent>
  );
}