"use client";
import { useTransitionRouter } from "next-view-transitions";

export default function RequestLink({ slug }: { slug: string }) {
  const router = useTransitionRouter();
  return (
    <a
      className="bg-black text-white font-apercu text-[18px] px-[82px] py-2 xl:mr-auto xl:ml-3 mt-6 max-md:w-[90vw] max-xl:md:mr-auto max-xl:md:ml-3  2xl:text-[38px] 2xl:leading-[48px] 2xl:-tracking-[0.76px]"
      href={`/knowledge/${slug}/request`}
      onClick={(e) => {
        e.preventDefault();

        router.push(`/knowledge/${slug}/request`, {
          onTransitionReady: slideUp,
        });
      }}
    >
      Get access
    </a>
  );
}

function slideUp() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0)",
        zIndex: -10,
        mixBlendMode: "normal",
      },
      {
        opacity: 1,
        transform: "translateY(0%)",
        zIndex: -10,
        mixBlendMode: "normal",
      },
    ],
    {
      duration: 1000,
      easing: "ease-in-out",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateY(125%)",
        zIndex: 100,
        mixBlendMode: "normal",
      },
      {
        opacity: 1,
        transform: "translateX(0)",
        zIndex: 100,
        mixBlendMode: "normal",
      },
    ],
    {
      duration: 1000,
      easing: "ease-in-out",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}
