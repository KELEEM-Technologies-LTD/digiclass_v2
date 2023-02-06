import { useContext } from "react";
import Community from "../../component/Community";
import GeneralContext from "../../context/general_context";
import About from "./sections/about_digiclass";
import AddSection from "./sections/add_section";
import CourseSection from "./sections/courses_section";
import HomeBanner from "./sections/home_banner";
import Partners from "./sections/partners";
import StartLearningRow from "./sections/start_learning";

const Home = () => {
  const { isLogged } = useContext(GeneralContext);

  return (
    <>
      <HomeBanner />
      {isLogged ? (
        <StartLearningRow />
      ) : (
        <>
          {" "}
          <Partners /> <About />
        </>
      )}

      <AddSection />

      <CourseSection />

      <Community />
    </>
  );
};

export default Home;
