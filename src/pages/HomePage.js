import React from "react";

import {
  Container
} from "@mui/material";
import HeroSection from "../sections/home/herosection";
import AboutUs from "../sections/home/about";
import CampaignFeed from "../sections/home/campaignfeed";
import ContactUs from "../sections/home/contact";

export default function HomePage() {

  return (
    <Container>
      {/* Hero section */}
      <HeroSection />

      {/* About us */}
      <AboutUs />

      {/* Campaign feed */}
      <CampaignFeed />

      {/* Contact */}
      <ContactUs />

    </Container>
  );
}