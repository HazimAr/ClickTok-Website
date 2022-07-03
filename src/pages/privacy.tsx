import { Heading } from "@chakra-ui/react";
import Container from "@components/Container";
import ContainerInside from "@components/ContainerInside";

export default function Privacy() {
  return (
    <Container py={10}>
      <ContainerInside>
        <iframe src="https://docs.google.com/document/d/e/2PACX-1vTnnCWRqnVdGYSZRCWFZeuR8WTiPLM_NYnDNpslAMf_iatv1LhW1ZP14iR8hIdJC3sM1e_HTRMLEyYy/pub?embedded=true" width="100%" height="600" style="border:1px solid #ddd;"></iframe>
      
      </ContainerInside>
    </Container>
  );
}
