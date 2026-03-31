import { signOut } from "@/auth";
import { LogOut } from "lucide-react";

export function SignOutButtonDesktop() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="mt-1 border-t border-gray-100 pt-2"
    >
      <button
        type="submit"
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-light-gray hover:text-red-500 transition-all duration-150"
      >
        <LogOut size={16} strokeWidth={2} />
        Sign Out
      </button>
    </form>
  );
}

export function SignOutButtonMobile() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="flex-1"
    >
      <button
        type="submit"
        className="w-full flex flex-col items-center gap-1 py-3 text-[10px] font-semibold text-gray-400 hover:text-red-500 transition-colors border-b-2 border-transparent"
      >
        <LogOut size={18} strokeWidth={2} />
        Sign Out
      </button>
    </form>
  );
}
