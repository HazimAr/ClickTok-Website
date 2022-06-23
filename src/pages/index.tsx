import About from "@components/home/About";
import Hero from "@components/home/Hero";
import Statistics from "@components/home/Statistics";

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
  const usersPromise = fetch(
    "https://abstract.land/api/proxy/graphs.folf.party/api/datasources/proxy/1/query?db=quicktok&epoch=ms&q=SELECT%20count%28distinct%28%22user_id%22%29%29%20FROM%20%22videoConversion%22%20WHERE%20time%20%3E%3D%201647440878000ms%20and%20time%20%3C%3D%20now%28%29"
  );

  const convertedPromise = fetch(
    "https://abstract.land/api/proxy/graphs.folf.party/api/datasources/proxy/1/query?db=quicktok&epoch=ms&q=SELECT%20count(%22message_id%22)%20FROM%20%22videoConversion%22%20WHERE%20time%20%3E%3D%201647440878000ms%20and%20time%20%3C%3D%20now()"
  );

  const guildsPromise = fetch(
    "https://abstract.land/api/proxy/graphs.folf.party/api/datasources/proxy/1/query?db=quicktok&epoch=ms&q=SELECT%20last(%22guild_count%22)%20FROM%20%22botStats%22%20WHERE%20time%20%3E%200"
  );

  const [users, converted, guilds] = await Promise.all([
    usersPromise,
    convertedPromise,
    guildsPromise,
  ]).then(async ([usersResponse, convertedResponse, guildsResponse]) => {
    return [
      await usersResponse.json(),
      await convertedResponse.json(),
      await guildsResponse.json(),
    ];
  });

  return {
    props: {
      users: users.results[0].series[0].values[0][1],
      converted: converted.results[0].series[0].values[0][1],
      guilds: guilds.results[0].series[0].values[0][1],
    },
    revalidate: 60,
  };
}
