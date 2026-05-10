import { unstable_noStore as noStore } from "next/cache"
import { SavedProviderRepository } from "@/features/saved-provider/saved-provider-repository"
import { ServiceProviderCardWithBookmark } from "@/components/custom/ServiceProviderCardWithBookmark"
import { SavedProvidersEmptyState } from "./SavedProvidersEmptyState"


export default async function SavedProvidersList({ userId }: { userId: string }) {
  noStore()

  const savedProviders = await SavedProviderRepository.getSavedProviders(userId)

  if (savedProviders.length === 0) {
    return <SavedProvidersEmptyState />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {savedProviders.map((provider) => (
        <ServiceProviderCardWithBookmark
          key={provider.id}
          userId={userId}
          {...provider}
        />
      ))}
    </div>
  )
}