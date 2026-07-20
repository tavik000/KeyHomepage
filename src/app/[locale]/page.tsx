import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import IndependentProjects from "@/components/home/IndependentProjects";
import JamGallery from "@/components/home/JamGallery";
import ExperienceSection from "@/components/home/ExperienceSection";
import SkillsSection from "@/components/home/SkillsSection";
import AwardsSection from "@/components/home/AwardsSection";
import GameJournalSection from "@/components/home/GameJournalSection";
import BlogTeaserSection from "@/components/home/BlogTeaserSection";
import HobbiesStrip from "@/components/home/HobbiesStrip";
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
      <IndependentProjects />
      <JamGallery />
      <ExperienceSection />
      <SkillsSection />
      <AwardsSection />
      <GameJournalSection />
      <BlogTeaserSection />
      <HobbiesStrip />
      <ContactSection />
    </main>
  );
}
