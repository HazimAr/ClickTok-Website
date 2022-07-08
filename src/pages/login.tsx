import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "loading") return;
    if (status == "authenticated") {
      router.push("/dashboard");
      return;
    }
    signIn("discord", { callbackUrl: "/dashboard" });
  }, [status, router]);
  return null;
}
