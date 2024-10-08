"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Article } from "@/components/home/types";
import { cn } from "@/lib/utils";
import { getArticleBySlug } from "@/lib/sanity";

import { useTransitionRouter } from "next-view-transitions";

export default function ResearchRequest() {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    const fetchArticle = async () => {
      const slug = pathname.split("/")[2]; // Extract slug from pathname
      const fetchedArticle = await getArticleBySlug(slug);
      setArticle(fetchedArticle);
    };
    fetchArticle();
  }, [pathname]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormSubmitted) return;
    setIsLoading(true);

    const formData = {
      name,
      email,
      company,
      articleTitle: article?.title ?? "",
    };

    console.log(formData);

    fetch(
      "https://script.google.com/macros/s/AKfycbzO8Jh3zfQ4vig2Z9Cbu25u9FwZcEwEi1EQJ0Mtf2648lRbrm0e2z76FLVkU14DuRZf/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Response from server:", data);
        setIsFormSubmitted(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-white flex flex-col p-2 md:pl-3 md:py-0 gap-20 transition-all duration-1000 justify-start align-top h-screen"
      )}
    >
      <h1 className="font-spectral font-normal text-[20px] md:text-[24px] xl:text-[28px] leading-[24px] md:leading-[28px] xl:leading-[32px] -tracking-[0.6px] md:-tracking-[0.48px] xl:-tracking-[0.02em] xl:mt-[44px] max-xl:pt-[44px]">
        <span className="font-apercu opacity-30">
          {isFormSubmitted
            ? "Спасибо за оставленную заявку!"
            : "Добро пожаловать в BQ Studio!"}
        </span>{" "}
        {isFormSubmitted
          ? " Пожалуйста, проверьте вашу почту, чтобы скачать исследование. Если вы не получили письмо в течение нескольких минут, проверьте папку «Спам» или «Промоакции»."
          : `
          Вы оставляете заявку на доступ к исследованию "${article?.title ?? ""}"
          `}
      </h1>

      {!isFormSubmitted && (
        <input
          type="text"
          placeholder="Имя Фамилия"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="w-full border-b border-b-[#E7E9EF] text-black font-spectral text-[28px] font-normal leading-[32px] tracking-[-0.56px] outline-none"
        />
      )}
      {!isFormSubmitted && (
        <div className="flex flex-row gap-3">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full border-b border-b-[#E7E9EF] text-black font-spectral text-[28px] font-normal leading-[32px] tracking-[-0.56px] outline-none"
          />
          <input
            type="text"
            placeholder="Компания"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            className="w-full border-b border-b-[#E7E9EF] text-black font-spectral text-[28px] font-normal leading-[32px] tracking-[-0.56px] outline-none"
          />
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white font-apercu text-[18px] px-[82px] py-2 max-md:w-[90vw] w-fit"
        onClick={() => {
          if (isFormSubmitted) {
            router.push(`/${pathname.split("/").slice(1, 3).join("/")}`, {
              onTransitionReady: slideDown,
            });
          }
        }}
      >
        {isLoading ? "Отправка..." : isFormSubmitted ? "Спасибо!" : "Отправить"}
      </button>
    </form>
  );
}

function slideDown() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0)",
        zIndex: 1000,
      },
      {
        opacity: 1,
        transform: "translateY(100%)",
        zIndex: 1000,
      },
    ],
    {
      duration: 1000,
      easing: "ease",
      fill: "backwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0%)",
      },
      {
        opacity: 1,
        transform: "translateY(0)",
      },
    ],
    {
      duration: 1000,
      easing: "ease",
      fill: "backwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}
