"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface DescriptionAccordionProps {
  description: string;
}

export default function DescriptionAccordion({
  description,
}: DescriptionAccordionProps) {
  const items: AccordionItem[] = [
    { title: "Product Description", content: description },
    {
      title: "Materials & Care",
      content:
        "Upper: Premium mesh and synthetic overlays. Midsole: Responsive foam compound for all-day cushioning. Outsole: Durable rubber with multi-directional traction pattern. Care: Wipe clean with a damp cloth. Do not machine wash.",
    },
    {
      title: "Shipping & Returns",
      content:
        "Free standard shipping on orders over $100. Express shipping available at checkout. Items can be returned within 30 days of delivery in original, unworn condition with tags attached. Start a return from your account dashboard.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="border-t border-gray-100 divide-y divide-gray-100">
      {items.map(({ title, content }, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={title}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-4 text-left group"
            >
              <span className="text-sm font-semibold text-soft-black group-hover:text-accent transition-colors duration-150">
                {title}
              </span>
              <ChevronDown
                size={18}
                className={[
                  "text-gray-400 flex-shrink-0 transition-transform duration-300",
                  isOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>
            <div
              className={[
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-64 pb-4" : "max-h-0",
              ].join(" ")}
            >
              <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
