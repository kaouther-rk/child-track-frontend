import Button from "@/components/Buttons/Button";
import { Children } from "@/lib/server/type/children/children";
import BracletCreate from "./BracletCreate";

export default function Braclet({ child }: { child: Children }) {
    return (
        <div
            className="flex flex-col gap-2"
        >
            {
                child.braclet ? (
                    <>
                        <div className="flex gap-1 items-center">
                            <span className="text-on-surface-variant dark:text-dark-on-surface-variant text-label-small">mac :</span>
                            <span className="text-on-surface dark:text-dark-on-surface text-body-large">{child.braclet?.mac}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className="text-on-surface-variant dark:text-dark-on-surface-variant text-label-small">status :</span>
                            <span className={`${true ? ("text-green-700 dark:text-green-400") : ("text-error dark:text-dark-error")} text-body-large`}>{child.braclet?.status}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <BracletCreate children_id={Number(child.id)} />
                    </>
                )
            }
        </div>
    );
}