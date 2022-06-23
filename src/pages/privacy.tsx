import { Heading } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";

export default function Privacy() {
  return (
    <Container py={10}>
      <ContainerInside>
        <Heading>Privacy Policy</Heading>
        <p className="text-xl">
          Your privacy is important to us. It is QuickTok's policy to respect
          your privacy and comply with any applicable law and regulation
          regarding any personal information we may collect about you, including
          across our website, "https://quicktok.win" and QuickTok Discord bot.
        </p>
        <p className="text-xl">
          This policy is effective as of 9 March 2022 and was last updated on
          5/5/2022.
        </p>
        <h3 className="text-2xl font-bold py-5">Information We Collect</h3>
        <p className="text-xl">
          Information we collect includes both information you knowingly and
          actively provide us when using or participating in any of our services
          and promotions, and any information automatically sent by your devices
          in the course of accessing our products and services.
        </p>
        <h4 className="text-2xl font-bold py-5">Log Data</h4>
        <p className="text-xl">
          When you use our QuickTok services, if opted in to usage data
          collection services, we may collect:
        </p>
        <ul className="list-disc pl-7">
          <li>The guild (server) ID</li>
          <li>Your user ID</li>
          <li>The TikTok video ID you converted</li>
          <li>The message ID</li>
          <li>The time you sent the message</li>
        </ul>
        <p className="text-xl">
          Please be aware that while this information may not be personally
          identifying by itself, it may be possible to combine it with other
          data to personally identify individual persons.
        </p>
        <h4 className="text-2xl font-bold py-5">Use of Information</h4>
        <p className="text-xl">
          We use the information we collect to provide, maintain, and improve
          our services. Common uses where this data may be used includes getting
          general information like the number of TikToks converted, the number
          of TikToks converted per day, and the amount of bot usage.
        </p>
        <h4 className="text-2xl font-bold py-5">
          Security of Your Personal Information
        </h4>
        <p className="text-xl">
          Although we will do our best to protect the personal information you
          provide to us, we advise that no method of electronic transmission or
          storage is 100% secure, and no one can guarantee absolute data
          security. We will comply with laws applicable to us in respect of any
          data breach.
        </p>
        <h4 className="text-2xl font-bold py-5">
          How Long We Keep Your Personal Information
        </h4>
        <p className="text-xl">
          We keep your personal information only for as long as we need to. This
          time period may depend on what we are using your information for, in
          accordance with this privacy policy. If your personal information is
          no longer required, we will delete it or make it anonymous by removing
          all details that identify you.
        </p>
        <h3 className="text-2xl font-bold py-5">
          Your Rights and Controlling Your Personal Information
        </h3>
        <p className="text-xl">
          You may request access to your personal information, and change what
          you are ok with us collecting from you. You may also request that we
          delete your personal identifying information. This all can chaged with
          the QuickTok Discord bot. <code>/privacy usage data</code>
        </p>
        <h3 className="text-2xl font-bold py-5">Limits of Our Policy</h3>
        <p className="text-xl">
          Our website may link to external sites that are not operated by us
          (ie. tiktok.com). Please be aware that we have no control over the
          content and policies of those sites, and cannot accept responsibility
          or liability for their respective privacy practices.
        </p>
        <h3 className="text-2xl font-bold py-5">Changes to This Policy</h3>
        <p className="text-xl mb-9">
          At our discretion, we may change our privacy policy to reflect updates
          to our business processes, current acceptable practices, or
          legislative or regulatory changes. If we decide to change this privacy
          policy, we will post the changes here at the same link by which you
          are accessing this privacy policy.
        </p>
      </ContainerInside>
    </Container>
  );
}
