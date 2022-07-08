import DashboardLayout from "@components/Layout";
import { useRouter } from "next/router";

export default function GuildHome() {
  const router = useRouter();
  return <DashboardLayout>{router.query.guildId}</DashboardLayout>;
}
