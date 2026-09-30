"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl sm:text-5xl md:text-[5.5rem] font-bold mt-2 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <img
          src="/dashboard-light.png"
          alt="hero dashboard"
          height={720}
          width={1400}
          className="mx-auto rounded-xl sm:rounded-2xl object-cover h-full object-left-top dark:hidden block"
          draggable={false}
        />
        <img
          src="/dashboard-dark.png"
          alt="hero dashboard dark"
          height={720}
          width={1400}
          className="mx-auto rounded-xl sm:rounded-2xl object-cover h-full object-left-top hidden dark:block"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
