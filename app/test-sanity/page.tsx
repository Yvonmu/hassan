import { 
  getHeroSection, 
  getGlobalSettings,
  getDiplomaticExcellence,
  getJurisdictionSection,
  getConsularExcellence,
  getSocialFeedsSection,
} from '@/lib/sanity.server'

export default async function TestSanity() {
  const [
    hero,
    globalSettings,
    diplomaticExcellence,
    jurisdictionSection,
    consularExcellence,
    socialFeedsSection,
  ] = await Promise.all([
    getHeroSection(),
    getGlobalSettings(),
    getDiplomaticExcellence(),
    getJurisdictionSection(),
    getConsularExcellence(),
    getSocialFeedsSection(),
  ])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Sanity Data Test Page</h1>
      <p className="mb-4 text-muted-foreground">
        This page shows raw data from Sanity. Use it to verify data is being fetched correctly.
      </p>
      
      <div className="space-y-6">
        <section className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Hero Section</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(hero, null, 2)}
          </pre>
          <p className="mt-2 text-sm">
            Status: {hero ? '✅ Found' : '❌ Not found'}
          </p>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Global Settings</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(globalSettings, null, 2)}
          </pre>
          <p className="mt-2 text-sm">
            Status: {globalSettings ? '✅ Found' : '❌ Not found'}
          </p>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Diplomatic Excellence</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(diplomaticExcellence, null, 2)}
          </pre>
          <p className="mt-2 text-sm">
            Status: {diplomaticExcellence ? '✅ Found' : '❌ Not found'}
          </p>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Jurisdiction Section</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(jurisdictionSection, null, 2)}
          </pre>
          <p className="mt-2 text-sm">
            Status: {jurisdictionSection ? '✅ Found' : '❌ Not found'}
          </p>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Consular Excellence</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(consularExcellence, null, 2)}
          </pre>
          <p className="mt-2 text-sm">
            Status: {consularExcellence ? '✅ Found' : '❌ Not found'}
          </p>
        </section>

        <section className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Social Feeds Section</h2>
          <pre className="bg-muted p-4 rounded overflow-auto text-sm">
            {JSON.stringify(socialFeedsSection, null, 2)}
          </pre>
          <p className="mt-2 text-sm">
            Status: {socialFeedsSection ? '✅ Found' : '❌ Not found'}
          </p>
        </section>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
        <h3 className="font-bold mb-2">💡 How to Use This Page</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Visit: <code className="bg-white dark:bg-gray-800 px-1 rounded">http://localhost:3000/test-sanity</code></li>
          <li>Check if data shows as <code className="bg-white dark:bg-gray-800 px-1 rounded">✅ Found</code> or <code className="bg-white dark:bg-gray-800 px-1 rounded">❌ Not found</code></li>
          <li>If <code className="bg-white dark:bg-gray-800 px-1 rounded">❌ Not found</code>: Go to Sanity Studio and create/publish the document</li>
          <li>If <code className="bg-white dark:bg-gray-800 px-1 rounded">✅ Found</code> but UI not updating: Check component code</li>
        </ul>
      </div>
    </div>
  )
}
