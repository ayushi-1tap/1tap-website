import Hero from "../components/homeComponents/Hero";
import Welcome from "../components/homeComponents/Welcome";
import BusinessManagement from "../components/homeComponents/BusinessManagement";
import WhyChoose from "../components/homeComponents/WhyChoose";
import HowItWorks from "../components/homeComponents/HowItWorks";
import HomeFAQ from "../components/homeComponents/HomeFAQ";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <WhyChoose />

      <HowItWorks />
      <Welcome />
      <BusinessManagement />

      <HomeFAQ />
      <Footer />
    </>
  );
};

export default Home;
