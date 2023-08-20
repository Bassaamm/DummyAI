"use client";

import { create } from "zustand";
import PricingModal from "@/components/PricingModal";
import { useEffect, useState } from "react";

interface ModalPros {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const ModalContext = create<ModalPros>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export function ModalProvider() {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => setIsRendered(true), []);

  if (!isRendered) return null;

  return (
    <>
      <PricingModal />
    </>
  );
}
