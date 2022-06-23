import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";

export default function Terms() {
  return (
    <Container minH="100vh">
      <ContainerInside >
        <h2 className="text-5xl font-bold py-5">Terms Of Use</h2>
        <p className="text-xl">
          Please just be reasonable do not try to mess with the bot in a
          malicious way. This includes but is not limited to:
        </p>
        <ul className="list-disc pl-7">
          <li>Spamming</li>
          <li>Flooding</li>
          <li>Hacking</li>
          <li>DOS Attacks</li>
        </ul>

        <h2 className="text-5xl font-bold py-5">Disclaimer</h2>
        <p className="text-xl mb-9">
          Public data is sourced from TikTok, but the presentation is not
          controlled by them. Use of the name TikTok is for context, not
          claiming any ownership. By using our service you agree to our Terms of
          Service and Privacy Policy as well as{" "}
          <a
            href="https://www.tiktok.com/legal/terms-of-service?lang=en"
            className="text-blue-400"
          >
            TikTok's Terms of Service
          </a>
        </p>
      </ContainerInside>
    </Container>
  );
}
