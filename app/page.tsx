import { Home } from "@/components/Home";
import { NEXT_AUTH_OPTIONS } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function App() {
  const session = await getServerSession(NEXT_AUTH_OPTIONS);

  if (!session) {
    redirect(`/signin`);
  }
  console.log(session, "session");

  return (
    <>
      <Home />
    </>
  );
}
