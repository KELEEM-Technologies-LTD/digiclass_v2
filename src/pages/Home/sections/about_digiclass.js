import React from "react";
import Bubble from "../../../component/Bubble";
import FeatureItem from "../../../component/FeatureItem";
const data = [
    {
        text: "Student can take extra courses to understand concepts better.",
        icon: "./img/hat.svg",
    },
    {
        text: "Career executive can take courses to enhance his career.",
        icon: "./img/suite-case.svg",
    },
    {
        text: "Organisations can curate courses for their staff",
        icon: "./img/ic_outline-maps-home-work.svg",
    },
];
function About() {
    return (
        <div className="flex flex-col justify-center py-16  ">
            <div className="grid md:grid-cols-2 gap-8 px-6 py-8 md:px-16  ">
                <div className="flex flex-col justify-center ">
                    <p className="font-bold md:text-4xl  text-dark">About Digiclass</p>
                    <div className=" mt- md:w-10/12 ">
                        <p className=" text-2xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ratio
                            enim nostra consentit, pugnat oratio. Duo Reges: constructio
                            interrete. Illud quaero, quid ei, qui in voluptate summum bonum
                            ponat, consentaneum sit dicere. Ut optime,
                        </p>
                    </div>
                </div>

                <div className="md:mb-24 md:ml-0 ml-10 md:mt-0 mt-6 flex flex-col justify-center items-center">
                    <div className="relative">
                        <Bubble
                            height="220px"
                            width="220px"
                            classnames="bg-secondary-800 "
                            left="35px"
                            top="0px"
                            desc="Courses & Specilizations"
                            headerText="5000+"
                            zIndex="10"
                        />

                        <Bubble
                            height="146px"
                            width="146px"
                            classnames="bg-secondary-700 absolute "
                            left="-80px"
                            top="105px"
                            headerText="30+"
                            desc="Certificates"
                            zIndex="0"
                        />

                        <Bubble
                            height="146px"
                            width="146px"
                            classnames="bg-accent-hover absolute "
                            left="5px"
                            top="155px"
                            headerText="250+"
                            desc="Certified instructors"
                            zIndex="0"
                        />

                        <img
                            src="./img/grillbg.svg"
                            alt="grill"
                            className="hidden md:block"
                            style={{ position: "absolute", right: -180, top: 90 }}
                        />
                    </div>
                </div>
            </div>

            <div className=" md:mt-0 mt-40 px-6 py-4 md:px-16 grid md:grid-cols-3 grid-cols-1 gap-2 ">
                {data.map((item, index) => (
                    <FeatureItem index={index} item={item} key={index} />
                ))}
            </div>
        </div>
    );
}

export default About;
