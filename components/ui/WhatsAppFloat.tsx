"use client";

import { usePathname } from "next/navigation";

// ── Replace with your WhatsApp number in international format (no + or spaces) ──
const WHATSAPP_NUMBER = "254700000000";

function getPrefilledMessage(pathname: string): string {
  if (pathname.startsWith("/shop/")) {
    return "Hi! I found a product on Solévista and I'd like to know more about it. Can you help?";
  }
  if (pathname === "/cart") {
    return "Hi! I have items in my Solévista cart and need some assistance.";
  }
  if (pathname.startsWith("/checkout")) {
    return "Hi! I need help completing my order on Solévista.";
  }
  return "Hi! I'm browsing Solévista and I'd like some help.";
}

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const message = getPrefilledMessage(pathname);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed bottom-[4.5rem] right-4
        md:bottom-6 md:right-6
        z-50
        flex items-center gap-2
        bg-[#25D366] text-white
        pl-3 pr-4 py-3 md:pl-3.5 md:pr-5
        rounded-full
        shadow-lg shadow-[#25D366]/30
        hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/40
        hover:scale-105
        active:scale-95
        transition-all duration-200
        group
      "
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-5 h-5 flex-shrink-0 fill-white"
        aria-hidden="true"
      >
        <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.627 4.64 1.813 6.64L2.667 29.333l6.88-1.787A13.29 13.29 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16c0-7.36-5.973-13.333-13.329-13.333zm0 24a11.6 11.6 0 0 1-5.92-1.627l-.427-.253-4.08 1.053 1.08-3.947-.28-.44A11.56 11.56 0 0 1 4.667 16c0-6.253 5.08-11.333 11.333-11.333S27.333 9.747 27.333 16 22.253 26.667 16.004 26.667zm6.213-8.48c-.347-.173-2.04-1-2.36-1.12-.32-.12-.547-.173-.773.173-.227.347-.88 1.12-1.08 1.347-.2.227-.4.253-.747.08-.347-.173-1.453-.533-2.773-1.707-1.027-.907-1.72-2.027-1.92-2.373-.2-.347-.02-.533.147-.707.16-.16.347-.413.52-.627.173-.213.227-.347.347-.573.12-.227.053-.44-.027-.613-.08-.173-.773-1.88-1.067-2.573-.28-.667-.56-.573-.773-.587-.2-.013-.427-.013-.653-.013a1.26 1.26 0 0 0-.907.427c-.307.333-1.187 1.16-1.187 2.827 0 1.667 1.213 3.28 1.387 3.507.173.227 2.387 3.64 5.787 5.107.813.347 1.44.56 1.933.72.813.253 1.547.213 2.133.133.653-.093 2.04-.84 2.32-1.64.28-.813.28-1.507.2-1.653-.08-.133-.307-.213-.653-.387z" />
      </svg>

      <span className="text-sm font-semibold leading-none whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}
