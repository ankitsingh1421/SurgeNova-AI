import Header from '../sections/Header.jsx';
import Hero from '../sections/Hero.jsx';
import Features from '../sections/Features.jsx';
// import Pricing from '../sections/Pricing.jsx';
import Faq from '../sections/Faq.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import Footer from '../sections/Footer.jsx';

interface LandingPageProps {
  onGetStarted?: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <>
      <Header />
      <Hero onTryNow={onGetStarted} />
      <Features />
      {/* <Pricing /> */}
      <Faq />
      <Testimonials />
      {/* <Download /> */}
      <Footer />
    </>
  );
}
