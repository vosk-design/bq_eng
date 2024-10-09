import { cn } from "@/lib/utils";

import { getHomeData } from "@/lib/sanity";

import { HomeData } from "@/components/home/types";

import PageTitle from "@/components/PageTitle";
import ProjectItem from "@/components/home/Projects-Item";

export default async function ListView() {
  const data: HomeData = await getHomeData();

  return (
    <div className="flex flex-col min-h-[calc(100vh-248px)]">
      <div
        style={{
          viewTransitionName: "projectsTitle",
        }}
      >
        <PageTitle title={data.title} categories={data.categories} />
      </div>
      <div
        className={cn(
          "xl:grid xl:grid-cols-4 xl:gap-x-[0.5*8.33vw] xl:px-[8.33vw] xl:gap-y-[160px] mt-20 xl:mt-40 transition-opacity duration-1000 flex flex-col gap-[16px] xl:gap-[8.33vw] xl:justify-items-center"
        )}
      >
        {data.featuredProjects.map((item, index) => (
          <ProjectItem key={index} project={item} displayMode="list" />
        ))}
      </div>
    </div>
  );
}