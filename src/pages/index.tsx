import About from "@components/home/About";
import Hero from "@components/home/Hero";
import Statistics from "@components/home/Statistics";
import { MongoClient } from "mongodb";

export default function Home({ users, converted, guilds }) {
  return (
    <>
      <Hero />
      <Statistics users={users} converted={converted} guilds={guilds} />
      <About />
    </>
  );
}

export async function getStaticProps() {
  const client = new MongoClient(process.env.MONGO);
  await client.connect();

  const usersPromise = client.db("main").collection("User").find({}).toArray();

  const convertedPromise = client
    .db("main")
    .collection("Conversion")
    .find({})
    .toArray();

  const guildsPromise = client
    .db("main")
    .collection("Guild")
    .find({})
    .toArray();

  const [users, converted, guilds] = await Promise.all([
    usersPromise,
    convertedPromise,
    guildsPromise,
  ]).then(async ([usersResponse, convertedResponse, guildsResponse]) => {
    return [
      usersResponse.length,
      convertedResponse.length,
      guildsResponse.length,
    ];
  });
  

  return {
    props: {
      users,
      converted,
      guilds,
    },
    revalidate: 60,
  };
}
