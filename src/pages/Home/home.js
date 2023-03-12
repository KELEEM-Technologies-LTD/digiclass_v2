import { useContext } from "react";
import Testimonials from "./sections/testimonials";
import Footer from "../../component/navigation/footer";
import NavigationBar from "../../component/navigation/public_navigation_bar";
import GeneralContext from "../../context/general_context";
import About from "./sections/about_digiclass";
import AddSection from "./sections/add_section";
import CourseSection from "./sections/courses_section";
import DigiClassBusiness from "./sections/digiclass_business";
import HomeBanner from "./sections/home_banner";
import Partners from "./sections/partners";
import StartLearningRow from "./sections/start_learning";
import JoinDigiClass from "./sections/join_digiclass";

const Home = () => {
  const { isLogged } = useContext(GeneralContext);

  return (
    <>
      <NavigationBar />
      <HomeBanner />
      <CourseSection />
      <Testimonials />
      {isLogged ? <StartLearningRow /> : null}
      <AddSection />
      <DigiClassBusiness />
      <JoinDigiClass />
      {isLogged ? (
        <></>
      ) : (
        <>
          <Partners />
          <About />
        </>
      )}

      <Footer />
    </>
  );
};

export default Home;
