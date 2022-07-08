
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Dashboard() {
  return <div>Dashboard</div>;
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log(session);
  if (!session?.user) {
    res.writeHead(307, {
      location: "/login",
    });
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
}
