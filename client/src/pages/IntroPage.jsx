import CardCarousel from "../components/CardCarousel";
import MeetOurTeam from "../components/introPage/MeetOurTeam";
import TopReviews from "../components/introPage/TopReviews";
import { useTranslation } from "react-i18next";
import MovingText from "../components/framerMotionAnimations/MovingText";
import SimonaIntroSection from "../components/introPage/SimonaIntroSection";
import { RatingContext } from "../context/ratingContext";
import { useContext, useEffect } from "react";

export default function IntroPage() {
  const { bestRatedComments, getBestRatedComments } = useContext(RatingContext);
  const { t } = useTranslation();
  useEffect(() => {
    getBestRatedComments();
  }, []);

  return (
    <>
      <div>
        <SimonaIntroSection />
        <div className="m-2 mt-4 border border-1 border-black rounded-[30px] bg-white h-[710px] md:h-fit border-b-8 lg:mr-20 lg:ml-20">
          <div className="bg-cobaltBlue rounded-tl-[30px] rounded-tr-[30px] flex p-6 justify-between items-center pr-8 pl-8 md:pr-24 md:pl-24">
            <img
              src="/smiley.svg"
              alt="smiley"
              className="w-[70px] lg:w-[150px] lg:ml-[120px]"
            ></img>
            <h2 className="text-[26px] md:text-[38px] lg:text-[52px] lg:pr-[70px] text-center text-white">
              {t("OurGroovyArtists")}
            </h2>
          </div>
          <div className="md:flex">
            <div className="md:w-[540px] lg:w-[970px] order-1">
              <CardCarousel role="artist" />
            </div>
            <div className="md:w-[300px] lg:w-[600px] flex items-center justify-center pt-8 bg-[url('/mash.svg')] bg-cover bg-center rounded-bl-[30px] rounded-br-[30px] mt-2 md:mt-0 md:rounded-br-none">
              <img
                src="/circles_three.svg"
                alt="lines"
                className="w-[240px] lg:w-[380px] pb-9"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <MovingText text="What do we do What do we do What do we do What do we do What do we do What do we do " />

        <div className="m-2 lg:order-2 border border-1 border-black rounded-[30px] bg-whiteborder-b-8 md:text-[20px] p-20 lg:text-[28px] lg:mr-20 lg:ml-20">
          <p className="pb-4">
          {t("textOne")}
            
            <span className="uppercase text-[25px] lg:text-[32px] font-bold">
              right
            </span>{" "}
            person?
          </p>
          <p>
          {t("textTwo")}{" "}
            <span className="uppercase text-[25px] lg:text-[32px] font-bold">
              now
            </span>{" "}
            {t("textThree")}
          </p>
        </div>
        <div className="m-2 lg:order-1 bg-white border border-1 border-black rounded-[30px] mt-4 border-b-8 lg:mr-20 lg:ml-20">
          <div className="bg-retroRed rounded-tl-[30px] rounded-tr-[30px] flex p-6 justify-between items-center pr-6 pl-6 md:pr-24 md:pl-24">
            <h2 className="text-[24px] md:text-[38px] text-white text-center lg:text-[52px] lg:pl-[60px]">
              Our radical Entrepreneurs
            </h2>
            <img
              src="/circles_two.svg"
              alt="two_circles"
              className="w-[80px] lg:w-[200px] lg:mr-[140px]"
            ></img>
          </div>
          <div className="md:flex">
            <div className="md:w-[540px] lg:w-[970px]">
              <CardCarousel role="entrepreneur" />
            </div>
            <div className="md:w-[300px] flex items-center justify-center pt-8 bg-cover bg-center rounded-bl-[30px] rounded-br-[30px] mt-2 border-t border-black md:border-none lg:ml-[80px] relative">
              <img
                src="/flower_two.svg"
                alt="lines"
                className="w-[150px] md:w-[200px] lg:w-[400px] pb-9"
              ></img>
              <img
                src="/star_one.svg"
                alt="lines"
                className="w-[150px] md:w-[200px] lg:w-[400px] pb-9 absolute rotate-[deg]"
              ></img>
            </div>
          </div>
        </div>
      </div>


      <div className="m-2 bg-white border border-1 border-black rounded-[30px] border-b-8 p-10 md:p-20 md:text-[20px] lg:text-[28px] lg:mr-20 lg:ml-20">
        <div className="flex gap-2 pb-4 lg:gap-4 lg:pb-8">
          <img src="/heart_three.svg" alt="heart" className="w-[50px]"></img>
          <p>
          {t("textFour")}
          </p>
        </div>
        <div className="flex gap-2 pb-4 lg:gap-4 lg:pb-8">
          <img src="/flower_three.svg" alt="heart" className="w-[50px]"></img>
          <p>
          {t("textFive")}
          </p>
        </div>
        <div className="flex gap-2 pb-4 lg:gap-4 lg:pb-8">
          <img src="/cyberpunk_eye.svg" alt="heart" className="w-[50px]"></img>
          <p>
          {t("textSix")}
          </p>
        </div>
      </div>
      <div>
        <MovingText text="Top Reviews Top Reviews Top Reviews Top Reviews Top Reviews Top Reviews Top Reviews Top Reviews " />
        <TopReviews />
      </div>
      <div className="m-2 bg-white border border-1 border-black rounded-[30px] border-b-8 lg:mr-20 lg:ml-20">
        <div className="bg-retroRed rounded-tr-[30px] rounded-tl-[30px] p-6 relative border-t-[10px] border-black md:pb-10 lg:text-[28px] lg:pl-20">
          <h2 className="uppercase text-[50px] md:text-[90px] lg:text-[120px] text-[#1E1E1E] font-bold absolute top-[-11.5%] md:top-[-21%] lg:top-[-18%]">
          {t("textSeven")}
          </h2>
          <div className="flex gap-6 lg:h-[190px]">
            <h4 className="text-[21px] text-white pt-8 md:pt-16 md:text-[28px] lg:text-[32px] lg:pt-20">
            {t("textEight")}
            </h4>
            <img
              src="/heart_mash.svg"
              alt="mash_heart"
              className="w-32 md:absolute md:right-20 md:w-40 md:top-0 lg:w-[250px] lg:mr-20"
            ></img>
          </div>
        </div>
        <MeetOurTeam />
      </div>
    </>
  );
}
