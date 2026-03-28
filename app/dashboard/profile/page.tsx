import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const session = await auth();
  const userId = session!.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, password: true },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
        <h1 className="text-xl font-black text-soft-black">Edit Profile</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your account details</p>
      </div>

      <ProfileForm
        initialName={user?.name ?? ""}
        initialEmail={user?.email ?? ""}
        hasPassword={!!user?.password}
      />
    </div>
  );
}
