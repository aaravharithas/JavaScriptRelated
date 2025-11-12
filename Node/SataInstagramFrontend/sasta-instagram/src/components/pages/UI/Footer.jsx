import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterInfo>
          <FooterText>© 2025 Sasta Instagram</FooterText>
          <FooterText>All rights reserved by <Link to={"https://myportfoliohub.pythonanywhere.com/"} target="_blank" style={{textDecoration:"none",color:"white"}}>Aarav Harithas</Link></FooterText>
        </FooterInfo>
      </FooterContent>
    </FooterWrapper>
  );
}

/* ===== Styled Components ===== */

const FooterWrapper = styled.div`
  width: 100%;
  background-color: #262626;  /* Dark background */
  color: white;
  position: relative; /* Will allow footer to stay at the bottom if content is short */
  padding: 20px 0;  /* Add padding for spacing */
  font-size: 12px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterInfo = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const FooterText = styled.p`
  font-size: 12px;
  margin: 5px 0;
`;

export default Footer;
