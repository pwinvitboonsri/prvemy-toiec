import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/Components/ui/button/Button";

interface ResultStickyFooterProps {
    isPremium: boolean;
    onUpgrade: () => void;
}

export function ResultStickyFooter({ isPremium, onUpgrade }: ResultStickyFooterProps) {
    return (
        <AnimatePresence>
            {!isPremium && (
                <motion.footer
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    className="fixed bottom-0 inset-x-0 bg-[#ffe800] border-t-4 border-[#111111] z-[100] p-6 flex justify-center text-[#111111]"
                >
                    <div className="max-w-6xl w-full flex items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="bg-[#111111] p-3 shadow-[4px_4px_0_#1d3b88] hidden md:block">
                                <Zap size={24} fill="#ffe800" />
                            </div>
                            <p className="text-lg font-black uppercase tracking-tight">
                                Unlock Benchmarks {"&"} Explanations
                            </p>
                        </div>
                        <Button
                            onClick={onUpgrade}
                            className="bg-[#111111] text-[#ffe800] px-10 py-4 h-auto font-black uppercase text-sm riso-border riso-shadow-red transition-all hover:-translate-y-1 cursor-pointer"
                        >
                            GO_PREMIUM
                        </Button>
                    </div>
                </motion.footer>
            )}
        </AnimatePresence>
    );
}
