import { DashContent } from "@/components/DashCrudContent";
import MapPage from "./_components";

export default function GuardianPage() {
    return (
        <DashContent>

            <div
                className="w-full h-1/2 border-2 p-2 border-primary dark:border-dark-primary rounded-lg overflow-hidden"
            >
                <MapPage/>
            </div>
        </DashContent>
    )
}