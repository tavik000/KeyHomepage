import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExperienceSection from "@/components/home/ExperienceSection";
import SkillsSection from "@/components/home/SkillsSection";
import AwardsSection from "@/components/home/AwardsSection";
import JamGallery from "@/components/home/JamGallery";
import OtherProjects from "@/components/home/OtherProjects";
import ContactSection from "@/components/home/ContactSection";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <Hero />
      <FeaturedProjects />
      <ExperienceSection />
      <SkillsSection />
      <AwardsSection />
      <JamGallery />
      <OtherProjects />
      <ContactSection />
    </main>
  );
}
