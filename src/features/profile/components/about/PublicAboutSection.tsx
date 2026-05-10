import { SectionCard } from '../SectionCard'
import AboutSectionView from './AboutSectionView'

const PublicAboutSection = ({ about }: { about?: string }) => {
  return (
    <SectionCard title="About">
      <AboutSectionView about={about} />
    </SectionCard>
  )
}

export default PublicAboutSection