import {setRequestLocale} from 'next-intl/server';
import {HeroSection} from '@/components/sections/HeroSection';
import {SectionDivider} from '@/components/sections/SectionDivider';
import {AboutSection} from '@/components/sections/AboutSection';
import {StackSection} from '@/components/sections/StackSection';
import {ProjectsSection} from '@/components/sections/ProjectsSection';
import {ContactSection} from '@/components/sections/ContactSection';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <StackSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <ContactSection />
    </>
  );
}
