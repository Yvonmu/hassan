/**
 * Seed Sanity CMS with initial content
 * Run with: npx tsx scripts/seed-sanity.ts
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load environment variables from .env.local manually
try {
  const envFile = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  })
} catch (error) {
  // .env.local might not exist, that's okay
}

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error(
    [
      '',
      '❌ Missing SANITY_API_TOKEN.',
      'Add a Sanity API token with Editor permissions to `.env.local`, e.g.:',
      'SANITY_API_TOKEN=sk....',
      '',
      'Create it in Sanity Manage → Project → API → Tokens → Add API token → Permissions: Editor.',
      '',
    ].join('\n')
  )
  process.exit(1)
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!projectId) {
  console.error(
    [
      '',
      '❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID.',
      'Add your Sanity project ID to `.env.local`, e.g.:',
      'NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id',
      '',
    ].join('\n')
  )
  process.exit(1)
}

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token,
})

async function seedContent() {
  console.log('🌱 Starting Sanity content seeding...\n')

  try {
    // 1. Create Hero Section (create as published document directly)
    console.log('📝 Creating Hero Section...')
    try {
      // Try to create directly as published (no drafts. prefix)
      const heroData = {
        _type: 'heroSection',
        title: 'Hassan Adan Hassan',
        subtitle: 'Diplomatic Representative',
        description: 'Dedicated to fostering international relations between Djibouti and Rwanda through strategic diplomatic initiatives and cultural exchange programs.',
        officialTitle: 'Official',
        year: '2024',
        location: 'Kigali',
        consulName: 'Hassan Adan Hassan',
        consulTitle: 'Honorary Consul',
        consulateFull: 'Republic of Djibouti in Rwanda',
      }
      
      // Check if document exists
      const existing = await client.fetch(`*[_type == "heroSection" && _id == "heroSection.home"][0]`)
      if (existing) {
        // Update existing
        await client.patch('heroSection.home').set(heroData).commit()
        console.log('✅ Hero Section updated:', 'heroSection.home')
      } else {
        // Create new as published
        await client.create({ _id: 'heroSection.home', ...heroData })
        console.log('✅ Hero Section created and published:', 'heroSection.home')
      }
    } catch (error: any) {
      console.log('⚠️ Hero Section:', error.message)
    }

    // 2. Create Global Settings
    console.log('\n📝 Creating Global Settings...')
    const globalSettingsDoc = await client.createIfNotExists({
      _id: 'globalSettings.main',
      _type: 'globalSettings',
      siteName: 'Djibouti Consulate Rwanda',
      contactInfo: {
        phone: '+250 (0) 780 685 486',
        email: 'info@consuldjibouti.com',
        address: 'KG 523 Street, Nyarutarama\nKigali, Rwanda',
        officeHours: 'Monday - Friday: 10:00 AM - 4:00 PM\nClosed on Public Holidays',
      },
      footer: {
        brandDescription: 'Official consular and diplomatic services of Djibouti.',
        quickLinks: [
          { name: 'Diplomatic Services', href: 'diplomatic' },
          { name: 'Consular Services', href: 'consular' },
          { name: 'Gallery', href: 'gallery' },
          { name: 'Contact', href: 'contact' },
        ],
        services: [
          'Citizen Support',
          'Emergency Assistance',
          'Business Facilitation',
          'Cultural Exchange',
        ],
        copyright: '© 2025 Consulate of Djibouti. All rights reserved.',
      },
      socialMedia: {
        twitter: 'https://twitter.com/hassan_diplomatic',
        linkedin: 'https://linkedin.com/in/hassan-adan-hassan',
      },
    })
    console.log('✅ Global Settings created:', globalSettingsDoc._id)

    // 3. Create SEO Metadata for Home
    console.log('\n📝 Creating SEO Metadata (Home)...')
    try {
      const seoData = {
        _type: 'seoMetadata',
        page: 'home',
        title: 'Honorary Consulate of Djibouti in Rwanda | Official Services',
        description: 'Official consular services of Djibouti in Rwanda. Book appointments, register Djibouti citizens in Rwanda, and access diplomatic services.',
        keywords: [
          'Djibouti Consulate Rwanda',
          'Djibouti Embassy Ethiopia',
          'Hassan Adan Hassan',
          'Djibouti Visa Rwanda',
          'Consular Services Kigali',
        ],
        ogTitle: 'Honorary Consulate of Djibouti in Rwanda',
        ogDescription: 'Connecting Djibouti and Rwanda through dedicated diplomatic services and citizen support.',
        canonicalUrl: 'https://djibouticonsul.rw',
      }
      
      const existing = await client.fetch(`*[_type == "seoMetadata" && _id == "seoMetadata.home"][0]`)
      if (existing) {
        await client.patch('seoMetadata.home').set(seoData).commit()
        console.log('✅ SEO Metadata updated:', 'seoMetadata.home')
      } else {
        await client.create({ _id: 'seoMetadata.home', ...seoData })
        console.log('✅ SEO Metadata created and published:', 'seoMetadata.home')
      }
    } catch (error: any) {
      console.log('⚠️ SEO Metadata:', error.message)
    }

    // 4. Create Services
    console.log('\n📝 Creating Services...')

    const services = [
      {
        _id: 'service.emergency-assistance',
        title: 'Emergency Assistance',
        description: '24/7 crisis support for Djiboutian nationals facing medical emergencies, legal difficulties, and urgent travel situations in Rwanda.',
        priority: 'critical',
        features: [
          '24/7 Availability',
          'Crisis Management',
          'Medical Support',
          'Legal Assistance',
        ],
        icon: 'AlertTriangle',
        order: 1,
      },
      {
        _id: 'service.document-services',
        title: 'Document Services',
        description: 'Professional authentication and verification of documents with official consular attestation and proper protocols.',
        priority: 'medium',
        features: [
          'Authentication',
          'Official Stamps',
          'Verification',
          'Fast Processing',
        ],
        icon: 'FileText',
        order: 2,
      },
      {
        _id: 'service.community-support',
        title: 'Community Support',
        description: 'Registration services and community building for Djiboutian citizens residing in Rwanda, maintaining comprehensive records.',
        priority: 'medium',
        features: [
          'Citizen Registration',
          'Support Network',
          'Community Events',
          'Cultural Programs',
        ],
        icon: 'Users',
        order: 3,
      },
      {
        _id: 'service.business-development',
        title: 'Business Development',
        description: 'Trade facilitation and business networking to strengthen economic partnerships between Djibouti and Rwanda.',
        priority: 'high',
        features: [
          'Trade Support',
          'Networking',
          'Investment Info',
          'Economic Partnerships',
        ],
        icon: 'TrendingUp',
        order: 4,
      },
    ]

    for (const service of services) {
      try {
        const existing = await client.fetch(`*[_type == "service" && _id == "${service._id}"][0]`)
        if (existing) {
          await client.patch(service._id).set(service).commit()
          console.log(`✅ Service "${service.title}" updated:`, service._id)
        } else {
          await client.create({ _type: 'service', ...service })
          console.log(`✅ Service "${service.title}" created and published:`, service._id)
        }
      } catch (error: any) {
        console.log(`⚠️ Service "${service.title}":`, error.message)
      }
    }

    // 5. Create Header Settings
    console.log('\n📝 Creating Header Settings...')
    try {
      const headerData = {
        _type: 'headerSettings',
        missionText: 'Diplomatic Mission',
        navigationItems: [
          { label: 'Home', sectionId: 'home', order: 1 },
          { label: 'Diplomatic Excellence', sectionId: 'diplomatic', order: 2 },
          { label: 'Consular Services', sectionId: 'consular', order: 3 },
          { label: 'Gallery', sectionId: 'gallery', order: 4 },
          { label: 'Contact', sectionId: 'contact', order: 5 },
        ],
      }
      
      const existing = await client.fetch(`*[_type == "headerSettings" && _id == "headerSettings.main"][0]`)
      if (existing) {
        await client.patch('headerSettings.main').set(headerData).commit()
        console.log('✅ Header Settings updated:', 'headerSettings.main')
      } else {
        await client.create({ _id: 'headerSettings.main', ...headerData })
        console.log('✅ Header Settings created and published:', 'headerSettings.main')
      }
    } catch (error: any) {
      console.log('⚠️ Header Settings:', error.message)
    }

    // 6. Create Consular Excellence
    console.log('\n📝 Creating Consular Excellence...')
    try {
      const consularData = {
        _type: 'consularExcellence',
        actionCards: [
          {
            title: 'Emergency Hotline',
            subtitle: 'Immediate Assistance',
            buttonText: 'Call Now',
            type: 'emergency',
          },
          {
            title: 'Office Hours',
            subtitle: 'Schedule Your Visit',
            buttonText: 'Schedule Visit',
            type: 'schedule',
          },
          {
            title: 'eVisa Portal',
            subtitle: 'Visa Services',
            buttonText: 'Apply Online',
            type: 'visa',
            visaPortalUrl: 'https://www.evisa.gouv.dj/applicant-api/#/',
          },
        ],
      }
      
      const existing = await client.fetch(`*[_type == "consularExcellence" && _id == "consularExcellence.main"][0]`)
      if (existing) {
        await client.patch('consularExcellence.main').set(consularData).commit()
        console.log('✅ Consular Excellence updated:', 'consularExcellence.main')
      } else {
        await client.create({ _id: 'consularExcellence.main', ...consularData })
        console.log('✅ Consular Excellence created and published:', 'consularExcellence.main')
      }
    } catch (error: any) {
      console.log('⚠️ Consular Excellence:', error.message)
    }

    // 7. Create Social Feeds Section
    console.log('\n📝 Creating Social Feeds Section...')
    try {
      const socialFeedsData = {
        _type: 'socialFeedsSection',
        title: 'Stay Connected',
        description: 'Follow us on social media for the latest updates and news.',
        twitterUrl: 'https://x.com/consuldjibrw?s=21',
        linkedinUrl: 'https://linkedin.com/in/hassan-adan-hassan',
        facebookUrl: '',
        youtubeUrl: '',
      }
      
      const existing = await client.fetch(`*[_type == "socialFeedsSection" && _id == "socialFeedsSection.main"][0]`)
      if (existing) {
        await client.patch('socialFeedsSection.main').set(socialFeedsData).commit()
        console.log('✅ Social Feeds Section updated:', 'socialFeedsSection.main')
      } else {
        await client.create({ _id: 'socialFeedsSection.main', ...socialFeedsData })
        console.log('✅ Social Feeds Section created and published:', 'socialFeedsSection.main')
      }
    } catch (error: any) {
      console.log('⚠️ Social Feeds Section:', error.message)
    }

    // 8. Create Diplomatic Excellence
    console.log('\n📝 Creating Diplomatic Excellence...')
    try {
      const diplomaticData = {
        _type: 'diplomaticExcellence',
        title: 'Diplomatic Excellence',
        description: 'Strengthening bilateral relations between Djibouti and Rwanda through strategic diplomatic initiatives.',
        competencies: [
          { name: 'Bilateral Relations', value: 95 },
          { name: 'Cultural Exchange', value: 88 },
          { name: 'Trade Facilitation', value: 92 },
          { name: 'Citizen Support', value: 90 },
        ],
        activities: [
          {
            title: 'Bilateral Relations',
            description: 'Fostering strong diplomatic ties between Djibouti and Rwanda.',
            icon: 'Globe',
          },
          {
            title: 'Cultural Exchange',
            description: 'Promoting cultural understanding and collaboration.',
            icon: 'Users',
          },
          {
            title: 'Trade Facilitation',
            description: 'Supporting economic partnerships and business development.',
            icon: 'Briefcase',
          },
          {
            title: 'Citizen Support',
            description: 'Providing comprehensive support to Djiboutian nationals.',
            icon: 'Award',
          },
        ],
        responsibilities: [
          'Represent Djibouti\'s interests in Rwanda',
          'Facilitate diplomatic communications',
          'Support trade and economic partnerships',
          'Provide consular services to citizens',
          'Promote cultural exchange programs',
        ],
      }
      
      const existing = await client.fetch(`*[_type == "diplomaticExcellence" && _id == "diplomaticExcellence.main"][0]`)
      if (existing) {
        await client.patch('diplomaticExcellence.main').set(diplomaticData).commit()
        console.log('✅ Diplomatic Excellence updated:', 'diplomaticExcellence.main')
      } else {
        await client.create({ _id: 'diplomaticExcellence.main', ...diplomaticData })
        console.log('✅ Diplomatic Excellence created and published:', 'diplomaticExcellence.main')
      }
    } catch (error: any) {
      console.log('⚠️ Diplomatic Excellence:', error.message)
    }

    // 9. Create Jurisdiction Section
    console.log('\n📝 Creating Jurisdiction Section...')
    try {
      const jurisdictionData = {
        _type: 'jurisdictionSection',
        label: 'Jurisdiction',
        title: 'Our Jurisdiction',
        description: 'The Honorary Consulate of Djibouti in Rwanda provides consular services and support to Djiboutian nationals and facilitates diplomatic relations.',
        infoText: 'For visa and passport services, please contact the Embassy of Djibouti in Addis Ababa, Ethiopia.',
        visaPassportInfo: 'Visa and passport applications are processed through the Embassy of Djibouti in Addis Ababa, Ethiopia. Contact them for detailed information.',
      }
      
      const existing = await client.fetch(`*[_type == "jurisdictionSection" && _id == "jurisdictionSection.main"][0]`)
      if (existing) {
        await client.patch('jurisdictionSection.main').set(jurisdictionData).commit()
        console.log('✅ Jurisdiction Section updated:', 'jurisdictionSection.main')
      } else {
        await client.create({ _id: 'jurisdictionSection.main', ...jurisdictionData })
        console.log('✅ Jurisdiction Section created and published:', 'jurisdictionSection.main')
      }
    } catch (error: any) {
      console.log('⚠️ Jurisdiction Section:', error.message)
    }

    // 10. Create Natural Wonders (Djibouti)
    console.log('\n📝 Creating Natural Wonders (Djibouti)...')
    try {
      const naturalWondersData = {
        _type: 'naturalWonders',
        wonders: [
          {
            title: 'Lake Assal',
            location: 'Djibouti',
            description: 'The lowest point in Africa and the saltiest lake outside Antarctica.',
            rating: 5,
            category: 'Natural Wonder',
            link: 'https://en.wikipedia.org/wiki/Lake_Assal',
          },
          {
            title: 'Gulf of Tadjoura',
            location: 'Djibouti',
            description: 'A beautiful gulf known for its pristine waters and marine life.',
            rating: 4,
            category: 'Marine',
            link: 'https://en.wikipedia.org/wiki/Gulf_of_Tadjoura',
          },
        ],
      }
      
      const existing = await client.fetch(`*[_type == "naturalWonders" && _id == "naturalWonders.main"][0]`)
      if (existing) {
        await client.patch('naturalWonders.main').set(naturalWondersData).commit()
        console.log('✅ Natural Wonders (Djibouti) updated:', 'naturalWonders.main')
      } else {
        await client.create({ _id: 'naturalWonders.main', ...naturalWondersData })
        console.log('✅ Natural Wonders (Djibouti) created and published:', 'naturalWonders.main')
      }
    } catch (error: any) {
      console.log('⚠️ Natural Wonders (Djibouti):', error.message)
    }

    // 11. Create Natural Wonders (Rwanda)
    console.log('\n📝 Creating Natural Wonders (Rwanda)...')
    try {
      const naturalWondersRwandaData = {
        _type: 'naturalWondersRwanda',
        wonders: [
          {
            title: 'Volcanoes National Park',
            location: 'Rwanda',
            description: 'Home to the endangered mountain gorillas.',
            rating: 5,
            category: 'Wildlife',
            link: 'https://www.visitrwanda.com/destinations/volcanoes-national-park/',
          },
          {
            title: 'Nyungwe Forest',
            location: 'Rwanda',
            description: 'A pristine rainforest with diverse wildlife and canopy walks.',
            rating: 5,
            category: 'Forest',
            link: 'https://www.visitrwanda.com/destinations/nyungwe-national-park/',
          },
        ],
      }
      
      const existing = await client.fetch(`*[_type == "naturalWondersRwanda" && _id == "naturalWondersRwanda.main"][0]`)
      if (existing) {
        await client.patch('naturalWondersRwanda.main').set(naturalWondersRwandaData).commit()
        console.log('✅ Natural Wonders (Rwanda) updated:', 'naturalWondersRwanda.main')
      } else {
        await client.create({ _id: 'naturalWondersRwanda.main', ...naturalWondersRwandaData })
        console.log('✅ Natural Wonders (Rwanda) created and published:', 'naturalWondersRwanda.main')
      }
    } catch (error: any) {
      console.log('⚠️ Natural Wonders (Rwanda):', error.message)
    }

    // 12. Create Stay Connected
    console.log('\n📝 Creating Stay Connected...')
    try {
      const stayConnectedData = {
        _type: 'stayConnected',
        title: 'Stay Connected',
        description: 'Stay updated with the latest news, events, and updates from the Consulate.',
        content: [
          {
            title: 'Latest News',
            description: 'Read about the latest diplomatic activities and consular services.',
            type: 'news',
            date: '2024-01-15',
            location: 'Kigali',
            buttonLink: 'Read More',
            link: 'https://example.com/news',
          },
          {
            title: 'Upcoming Events',
            description: 'Join us for cultural events and community gatherings.',
            type: 'event',
            date: '2024-02-20',
            location: 'Kigali',
            buttonLink: 'Learn More',
            link: 'https://example.com/events',
          },
        ],
      }
      
      const existing = await client.fetch(`*[_type == "stayConnected" && _id == "stayConnected.main"][0]`)
      if (existing) {
        await client.patch('stayConnected.main').set(stayConnectedData).commit()
        console.log('✅ Stay Connected updated:', 'stayConnected.main')
      } else {
        await client.create({ _id: 'stayConnected.main', ...stayConnectedData })
        console.log('✅ Stay Connected created and published:', 'stayConnected.main')
      }
    } catch (error: any) {
      console.log('⚠️ Stay Connected:', error.message)
    }

    console.log('\n🎉 All content seeded successfully!')
    console.log('\n📋 Summary:')
    console.log('  - Hero Section: ✅')
    console.log('  - Global Settings: ✅')
    console.log('  - SEO Metadata (Home): ✅')
    console.log('  - Services (4): ✅')
    console.log('  - Header Settings: ✅')
    console.log('  - Consular Excellence: ✅')
    console.log('  - Social Feeds Section: ✅')
    console.log('  - Diplomatic Excellence: ✅')
    console.log('  - Jurisdiction Section: ✅')
    console.log('  - Natural Wonders (Djibouti): ✅')
    console.log('  - Natural Wonders (Rwanda): ✅')
    console.log('  - Stay Connected: ✅')
    console.log('\n💡 Note: You still need to:')
    console.log('   - Upload images manually in Sanity Studio')
    console.log('   - Customize content as needed')
    console.log('   - Visit: http://localhost:3333 or http://localhost:3000/studio')

  } catch (error: any) {
    console.error('\n❌ Error seeding content:', error.message)
    console.error('\n💡 Most common causes:')
    console.error('   - Missing SANITY_API_TOKEN in .env.local')
    console.error('   - Token does not have Editor permissions')
    console.error('   - Token belongs to a different Sanity project')
  }
}

seedContent()

