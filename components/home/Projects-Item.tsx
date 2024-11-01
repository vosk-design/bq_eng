"use client";

import { useTransitionRouter } from "next-view-transitions";

import { cn } from "@/lib/utils";

import Image from "next/image";
import { useScreenSize } from "@/lib/hooks/useScreenSize";

import { Project } from "@/components/home/types";
import { urlFor } from "@/sanity/lib/image";

function calculateWidth(
  displayMode: "gallery" | "list",
  cols: number,
  screenSize: string
) {
  if (displayMode === "list") {
    if (screenSize === "sm") return "25vw";
    return `${2 * 8.33}vw`;
  }
  if (screenSize === "sm") return "87.5vw";
  return `${8.33 * cols}vw`;
}

export default function ProjectItem({
  project,
  displayMode,
}: {
  project: Project;
  displayMode: "gallery" | "list";
}) {
  const screenSize = useScreenSize();
  const calculatedWidth = calculateWidth(displayMode, project.cols, screenSize);

  const router = useTransitionRouter();

  return (
    <a
      href={`/project/${project.slug.current}`}
      onClick={(e) => {
        e.preventDefault();
        console.log(`/project/${project.slug.current}`);
        router.push(`/project/${project.slug.current}`, {
          onTransitionReady: opacity,
        });
      }}
    >
      {project.image?.alignment === "left" ? (
        <div className="flex flex-col gap-2 md:gap-3">
          <div
            className={cn(
              "relative cursor-pointer",
              displayMode === "gallery"
                ? "custom-shadow-right"
                : "group max-xl:flex max-xl:flex-row-reverse w-full max-xl:p-2 md:py-0 max-xl:gap-[12.5vw] h-[110px] md:h-[200px] xl:h-[unset] xl:aspect-[254/320]"
            )}
            style={{
              width:
                screenSize === "xl" || screenSize === "2xl"
                  ? calculatedWidth
                  : displayMode === "list"
                    ? "100%"
                    : screenSize === "lg" || screenSize === "md"
                      ? calculatedWidth
                      : "87.5vw",
            }}
          >
            <div className="relative max-xl:custom-shadow-left h-full">
              <div className="w-full h-full overflow-hidden">
                <Image
                  src={urlFor(project.image).url()}
                  alt="project-1"
                  width={0}
                  height={0}
                  style={{ width: calculatedWidth, height: "auto" }}
                  className={cn(displayMode !== "gallery" && "object-cover")}
                  unoptimized
                />
              </div>
            </div>
            {displayMode === "list" && (
              <div className="xl:absolute xl:left-0 xl:top-0 w-full h-full xl:bg-white xl:opacity-0 transition-opacity xl:custom-shadow-right-no-margin xl:group-hover:opacity-100 flex md:flex-row-reverse xl:flex-col flex-col-reverse max-xl:justify-end">
                <p className="font-apercu font-normal text-[14px] md:text-[28px] xl:text-[16px]  leading-[20px] md:leading-[32px] xl:leading-[20px]  -tracking-[0.28px] md:-tracking-[0.56px] xl:-tracking-[0.02em] xl:pt-3  md:pl-[calc(2*8.33vw)] xl:pl-0 2xl:leading-[48px] 2xl:-tracking-[0.76px] 2xl:text-[38px]">
                  {project.title} <br className="xl:hidden" />
                  {project.categories.map((category, index) => (
                    <span key={index} className="opacity-30">
                      {category.name}
                      {index < project.categories.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="font-apercu font-normal text-[14px] md:text-[28px]  leading-[20px] md:leading-[32px]   -tracking-[0.28px] md:-tracking-[0.56px] xl:-tracking-[0.02em] xl:mt-auto xl:pb-1  whitespace-nowrap md:max-xl:min-w-[calc(2*8.33vw)] 2xl:leading-[48px] 2xl:-tracking-[0.76px] 2xl:text-[38px]">
                  {project.projectCodeName}
                </p>
              </div>
            )}
          </div>
          {displayMode === "gallery" && (
            <p className="font-apercu font-normal text-[14px] xl:text-[16px]  leading-[20px]  -tracking-[0.02em] xl:-tracking-[0.02em]  pl-2 md:pl-3 2xl:leading-[48px] 2xl:-tracking-[0.76px] 2xl:text-[38px]">
              {project.projectCodeName}
            </p>
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col md:flex-row max-md:items-end md:justify-end align-top gap-20 md:gap-3"
          )}
        >
          {displayMode === "gallery" && project.secondImage?.asset && (
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="relative">
                <Image
                  src={urlFor(project.secondImage?.asset).url()}
                  alt="project-1"
                  width={0}
                  height={0}
                  style={{
                    width: screenSize !== "sm" ? `${8 * 4}vw` : "62.5vw",
                    height: displayMode === "gallery" ? "auto" : `320px`,
                  }}
                  unoptimized
                />
              </div>
              <p className="font-apercu font-normal text-[14px] xl:text-[16px]  leading-[20px]  -tracking-[0.02em] xl:-tracking-[0.02em]  pl-2 md:pl-3 2xl:leading-[48px] 2xl:-tracking-[0.76px] 2xl:text-[38px]">
                {project.secondCodeName}
              </p>
            </div>
          )}
          <div
            className={cn(
              "flex flex-col gap-2 md:gap-3",
              displayMode === "list" && "max-xl:w-full"
            )}
          >
            <div
              className={cn(
                "relative cursor-pointer",
                displayMode === "gallery"
                  ? "custom-shadow-left"
                  : "group max-xl:h-[110px] max-xl:flex max-xl:flex-row-reverse max-xl:p-2 md:py-0 max-xl:gap-[12.5vw] max-xl:justify-between h-[110px] md:h-[200px] xl:h-[unset] xl:aspect-[254/320]"
              )}
              style={{
                width:
                  screenSize === "xl" || screenSize === "2xl"
                    ? calculatedWidth
                    : "100%",
              }}
            >
              <div className="relative max-xl:custom-shadow-left h-full">
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={urlFor(project.image.asset).url()}
                    alt="project-1"
                    width={0}
                    height={0}
                    style={{ width: calculatedWidth, height: "auto" }}
                    className={cn(displayMode !== "gallery" && "object-cover")}
                    unoptimized
                  />
                </div>
              </div>
              {displayMode === "list" && (
                <div className="xl:absolute xl:left-0 xl:top-0 w-full h-full xl:bg-white xl:opacity-0 transition-opacity xl:custom-shadow-right-no-margin xl:group-hover:opacity-100 flex md:flex-row-reverse xl:flex-col flex-col-reverse max-xl:justify-end xl:pr-4">
                  <p className="font-apercu font-normal text-[14px] md:text-[28px] xl:text-[16px]  leading-[20px] md:leading-[32px] xl:leading-[20px]  -tracking-[0.28px] md:-tracking-[0.56px] xl:-tracking-[0.02em] xl:pt-3  md:pl-[calc(2*8.33vw)] xl:pl-0 2xl:leading-[48px] 2xl:-tracking-[0.76px] 2xl:text-[38px]">
                    {project.title} <br className="xl:hidden" />
                    <span className="opacity-30">
                      {project.categories.map((category, index) => (
                        <span key={index}>
                          {category.name}
                          {index < project.categories.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </p>
                  <p className="font-apercu font-normal text-[14px] md:text-[28px]  leading-[20px] md:leading-[32px]  -tracking-[0.28px] md:-tracking-[0.56px] xl:-tracking-[0.02em] xl:mt-auto xl:pb-1 md:max-xl:min-w-[calc(2*8.33vw)] 2xl:leading-[48px] 2xl:-tracking-[0.76px] 2xl:text-[38px]">
                    {project.projectCodeName}
                  </p>
                </div>
              )}
            </div>
            {displayMode === "gallery" && (
              <p className="font-apercu font-normal text-[14px] xl:text-[16px]  leading-[20px]  -tracking-[0.02em] xl:-tracking-[0.02em] 2xl:leading-[48px] 2xl:-tracking-[0.76px] 2xl:text-[38px]">
                {project.projectCodeName}
              </p>
            )}
          </div>
        </div>
      )}
    </a>
  );
}

function opacity() {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  document.documentElement.animate(
    [
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      {
        opacity: 0,
        filter: "blur(5px)",
      },
    ],
    {
      duration: 2000,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        opacity: 1,
        filter: "blur(0px)",
      },
      {
        opacity: 0,
        filter: "blur(5px)",
      },
    ],
    {
      duration: 2000,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-old(projectsTitle)",
    }
  );

  document.documentElement.animate(
    [
      isSafari
        ? {
            display: "none",
            opacity: 0,
            filter: "blur(5px)",
          }
        : {
            opacity: 0,
            filter: "blur(5px)",
          },
      {
        opacity: 1,
        filter: "blur(0px)",
      },
    ],
    {
      delay: 2000,
      duration: 1000,
      easing: "ease",
      fill: "backwards",
      pseudoElement: "::view-transition-new(projectsTitle)",
    }
  );

  document.documentElement.animate(
    [
      isSafari
        ? {
            display: "none",
            opacity: 0,
            filter: "blur(5px)",
          }
        : {
            opacity: 0,
            filter: "blur(5px)",
          },
      {
        opacity: 1,
        filter: "blur(0px)",
      },
    ],
    {
      delay: 2000,
      duration: 1000,
      easing: "ease",
      fill: "backwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}
