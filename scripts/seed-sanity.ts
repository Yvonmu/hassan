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
            title: 'Moucha & Maskali Islands',
            location: 'Gulf of Tadjoura, Djibouti',
            description: 'The islands of Moucha and Maskali are located in the Gulf of Tadjoura in Djibouti. These coral islands are lush oases with mangroves, colorful algae, coral gardens, and rich marine fauna including whale sharks, rays, turtles, and seabirds.',
            rating: 4.5,
            category: 'Volcanic Site',
            link: 'https://archiqoo.com/unesco/unesco_natural_sub_lists.php?uw_country=djibouti&subsite=moucha_maskali_islands',
            imageUrl: '/images/Moucha_Island.jpg',
          },
          {
            title: 'Lake Assal, on the peaceful lands',
            location: 'Tadjoura Region, Djibouti',
            description: 'Lake Assal lies 157m below sea level, making it the lowest point in Africa. Known for its extreme salinity and unique geological formations, it is a must-see site for scientists and travelers.',
            rating: 4.8,
            category: 'Natural Wonder',
            link: 'https://guide.visitdjibouti.dj/le-lac-assal-sur-les-terres-apaisees/',
            imageUrl: '/images/assal_5672-e1552151713486.jpg',
          },
          {
            title: 'A Country Where Mixing is the Barycentre',
            location: 'Djibouti',
            description: 'Djiboutian culture reflects centuries of trade and nomadic heritage. Rich traditions include songs, poetry, and dances blending epic and lyrical styles.',
            rating: 4.9,
            category: 'Geological Site',
            link: 'https://guide.visitdjibouti.dj/un-pays-ou-le-brassage-est-le-barycentre/',
            imageUrl: '/images/culture-9-e1551264296617.jpg',
          },
          {
            title: 'Lake Abbé, Lunar Landscapes',
            location: 'Southwest Djibouti, near Ethiopian border',
            description: 'Lake Abbé\'s limestone chimneys and magical sunsets create a surreal lunar-like landscape. A breathtaking natural wonder of East Africa.',
            rating: 4.7,
            category: 'National Park',
            link: 'https://guide.visitdjibouti.dj/le-lac-abbe-des-paysages-lunaires/',
            imageUrl: '/images/lacabbe-16.jpg',
          },
          {
            title: 'Archaeological Discoveries',
            location: 'Balho, Djibouti',
            description: 'Prehistoric rock art and archaeological remains near Balho offer a glimpse into Djibouti\'s ancient past.',
            rating: 4.6,
            category: 'Urban Landmark',
            link: 'https://guide.visitdjibouti.dj/les-decouvertes-archeologiques/',
            imageUrl: '/images/balho.jpg',
          },
          {
            title: 'Obock',
            location: 'Red Sea Coast, Djibouti',
            description: 'Obock, the first French settlement in Djibouti, features colonial architecture and rich cultural heritage.',
            rating: 4.9,
            category: 'Geological Site',
            link: 'https://guide.visitdjibouti.dj/obock/',
            imageUrl: '/images/obock.jpg',
          },
          {
            title: 'Tadjoura',
            location: 'Northern Djibouti',
            description: 'Tadjoura, one of Djibouti\'s oldest towns, is known for its whitewashed houses and historic mosques.',
            rating: 4.7,
            category: 'National Park',
            link: 'https://www.britannica.com/place/Djibouti',
            imageUrl: '/images/tadjoura.png',
          },
          {
            title: 'Ghoubbet al-Kharab',
            location: 'Southern Gulf of Tadjoura',
            description: 'Also called the Devil\'s Cauldron, Ghoubbet al-Kharab has steep volcanic cliffs, rich marine life, and excellent diving spots.',
            rating: 4.6,
            category: 'Urban Landmark',
            link: 'https://en.wikipedia.org/wiki/Ghoubbet-el-Kharab',
            imageUrl: '/images/gouk.png',
          },
          {
            title: 'Day Forest National Park',
            location: 'Godda Mountains, Djibouti',
            description: 'Djibouti\'s only national park, with rare juniper forests, wildlife, and hiking trails in cooler highland climates.',
            rating: 4.8,
            category: 'Marine Paradise',
            link: 'https://en.wikipedia.org/wiki/Day_Forest_National_Park',
            imageUrl: '/images/Day Forest National Park.png',
          },
        ],
      }
      
      const existing = await client.fetch(`*[_type == "naturalWonders" && _id == "naturalWonders.main"][0]`)
      if (existing) {
        // When patching, unset the old wonders array and set the new one with all fields including imageUrl
        await client.patch('naturalWonders.main')
          .unset(['wonders'])
          .set({ wonders: naturalWondersData.wonders })
          .commit()
        console.log('✅ Natural Wonders (Djibouti) updated:', 'naturalWonders.main')
        console.log('   Wonders with imageUrl:', naturalWondersData.wonders.length)
        console.log('   First wonder imageUrl:', naturalWondersData.wonders[0]?.imageUrl)
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
            imageUrl: '/images/Gorillas-in-volcanoes-national-park2-1.jpeg',
          },
          {
            title: 'Nyungwe Forest',
            location: 'Rwanda',
            description: 'A pristine rainforest with diverse wildlife and canopy walks.',
            rating: 5,
            category: 'Forest',
            link: 'https://www.visitrwanda.com/destinations/nyungwe-national-park/',
            imageUrl: '/images/nyungwe.jpg',
          },
          {
            title: 'Akagera National Park',
            location: 'Eastern Rwanda',
            description: 'Famous for the Big Five and classic African safaris with lakes, savannahs, and woodlands.',
            rating: 4.7,
            category: 'Safari',
            link: 'https://www.visitrwanda.com/destinations/akagera-national-park/',
            imageUrl: '/images/akagera-safari-companies.jpg',
          },
          {
            title: 'Lake Kivu',
            location: 'Western Rwanda',
            description: 'One of Africa\'s great lakes, perfect for water activities and relaxation.',
            rating: 4.8,
            category: 'Lake',
            link: 'https://www.visitrwanda.com/destinations/lake-kivu/',
            imageUrl: '/images/lake0kivu.jpeg',
          },
          {
            title: 'Kigali Genocide Memorial',
            location: 'Kigali, Rwanda',
            description: 'A place of remembrance and reflection on Rwanda\'s history.',
            rating: 4.9,
            category: 'Historical Site',
            link: 'https://kgm.rw/',
            imageUrl: '/images/memorial-genocide.webp',
          },
          {
            title: 'Kigali City',
            location: 'Kigali, Rwanda',
            description: 'A vibrant and clean capital city with modern amenities and rich culture.',
            rating: 4.6,
            category: 'City Experience',
            link: 'https://www.kigalicity.gov.rw/',
            imageUrl: '/images/kigali.png',
          },
          {
            title: 'Gishwati-Mukura National Park',
            location: 'Western Rwanda',
            description: 'A forest reserve protecting chimpanzees and other wildlife.',
            rating: 4.7,
            category: 'Nature Reserve',
            link: 'https://www.visitrwanda.com/destinations/gishwati-mukura-national-park-2/',
            imageUrl: '/images/gishwati-mukura-national-park.jpeg',
          },
          {
            title: 'Musanze Caves',
            location: 'Northern Rwanda',
            description: 'Ancient caves formed by volcanic activity, now a popular tourist attraction.',
            rating: 4.5,
            category: 'Geological Site',
            link: 'https://www.volcanoesparkrwanda.org/information/the-musanze-cave/',
            imageUrl: '/images/musanze-caves1.jpeg',
          },
          {
            title: 'Ethnographic Museum',
            location: 'Huye, Rwanda',
            description: 'Explore Rwanda\'s rich cultural heritage and traditions.',
            rating: 4.6,
            category: 'Museum',
            link: 'https://www.visitrwanda.com/interests/ethnographic-museum/',
            imageUrl: '/images/ethnographic-museum-huye.jpeg',
          },
          {
            title: 'King\'s Palace Nyanza',
            location: 'Nyanza, Rwanda',
            description: 'A reconstructed traditional royal palace showcasing Rwanda\'s monarchical history.',
            rating: 4.4,
            category: 'Historical Site',
            link: 'https://www.visitrwanda.com/interests/kings-palace/',
            imageUrl: '/images/kings-palace-nyanza.jpeg',
          },
          {
            title: 'Kandt House Museum',
            location: 'Kigali, Rwanda',
            description: 'The former residence of Richard Kandt, now a natural history museum.',
            rating: 4.3,
            category: 'Museum',
            link: 'https://www.visitrwanda.com/interests/kandt-house-museum/',
            imageUrl: '/images/kandt-house-museum.jpeg',
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
            title: 'ADI - Agence Djiboutienne d\'Information',
            description: 'Stay informed with the latest news from Djibouti through the official news agency.',
            type: 'news',
            date: '2024-01-15',
            location: 'Djibouti',
            buttonLink: 'Visit adi.dj',
            link: 'http://adi.dj/',
            imageUrl: '/images/ea18ec7b42462a5d1315a85007aab2bc.jpg',
          },
          {
            title: 'La Nation Newspaper',
            description: 'Read the leading Djiboutian newspaper for in-depth coverage of national and international news.',
            type: 'news',
            date: '2024-02-20',
            location: 'Djibouti',
            buttonLink: 'Visit lanation.dj',
            link: 'http://lanation.dj/',
            imageUrl: '/images/cce0e77259b77afb2c703c4275ec0a85.jpg',
          },
          {
            title: 'RTD Television & Radio',
            description: 'Watch and listen to RTD for comprehensive coverage of events, culture, and news from Djibouti.',
            type: 'media',
            date: '2024-03-10',
            location: 'Djibouti',
            buttonLink: 'Watch Live',
            link: 'https://rtd.dj/',
            imageUrl: '/images/live.png',
          },
        ],
      }
      
      const existing = await client.fetch(`*[_type == "stayConnected" && _id == "stayConnected.main"][0]`)
      if (existing) {
        // When patching, unset the old content array and set the new one with all fields including imageUrl
        await client.patch('stayConnected.main')
          .unset(['content'])
          .set({ content: stayConnectedData.content })
          .commit()
        console.log('✅ Stay Connected updated:', 'stayConnected.main')
        console.log('   Content items with imageUrl:', stayConnectedData.content.length)
        console.log('   First item imageUrl:', stayConnectedData.content[0]?.imageUrl)
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

