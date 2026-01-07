import { AlertTriangle } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import { CardComponent } from "@/Components/ui/CardComponent";

interface ExamFinishModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isSubmitting: boolean;
    answeredCount: number;
    totalCount: number;
}

export function ExamFinishModal({
    isOpen,
    onClose,
    onConfirm,
    isSubmitting,
    answeredCount,
    totalCount
}: ExamFinishModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <CardComponent
                className="w-full max-w-sm h-auto bg-white border-2 border-[#111111] shadow-[8px_8px_0px_#ff3333] animate-in zoom-in-95 duration-200"
                noPadding={true}
                enableHover={false}
            >
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#ff3333]">
                        <AlertTriangle className="w-8 h-8 text-[#ff3333]" />
                    </div>
                    <h3 className="text-xl font-black uppercase mb-2">Finish Test?</h3>
                    <p className="font-mono text-xs text-gray-500 mb-6 leading-relaxed">
                        You are about to submit your answers. This action cannot be undone.
                        <br />
                        <span className="text-[#111111] font-bold">
                            {answeredCount} / {totalCount} questions answered.
                        </span>
                    </p>

                    <div className="flex gap-3 justify-center">
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="border-2 flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            variant="destructive"
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Confirm Finish"}
                        </Button>
                    </div>
                </div>
            </CardComponent>
        </div>
    );
}
