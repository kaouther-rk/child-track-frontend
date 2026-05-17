import { ChildrenMap } from "./Map";
import { ChildrenProvider } from "./providers/ChildrenProvider";

export default function MapPage() {
    return (
        <ChildrenProvider>
            <div className="h-1/2 w-screen">
                <ChildrenMap
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
                />
            </div>
        </ChildrenProvider>
    );
}
