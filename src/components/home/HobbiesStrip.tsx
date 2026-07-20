import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";

/** One-line personality note near the bottom — deliberately minimal. */
export default function HobbiesStrip() {
  const t = useTranslations("hobbies");

  return (
    <section className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm leading-relaxed text-faint">
            <span className="meta-label mr-4">{t("title")}</span>
            {t("text")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
