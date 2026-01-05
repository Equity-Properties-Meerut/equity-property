import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import Property from '../models/Property.js';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

// Demo properties data
const demoProperties = [
  {
    propertyType: 'Apartment',
    title: 'Luxury 3BHK Apartment in Civil Lines',
    price: 8500000,
    transactionType: 'Sale',
    area: 1850,
    description: 'Spacious 3BHK apartment with modern amenities, located in the heart of Civil Lines. Features include modular kitchen, 3 balconies, premium flooring, and 24/7 security. Perfect for families looking for a premium lifestyle.',
    yearBuilt: 2020,
    keyFeatures: ['Parking', 'Security', 'Lift', 'Power Backup', 'Modular Kitchen', 'Balcony'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      publicId: 'demo-property-1-display'
    },
    additionalImages: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        publicId: 'demo-property-1-additional-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        publicId: 'demo-property-1-additional-2'
      }
    ],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Civil Lines',
      fullAddress: '123, Green Park Society, Civil Lines, Near DAV College',
      pinCode: '250001'
    },
    status: 'active'
  },
  {
    propertyType: 'Villa',
    title: 'Premium 4BHK Villa with Private Garden',
    price: 15000000,
    transactionType: 'Sale',
    area: 3200,
    description: 'Stunning 4BHK independent villa with a beautiful private garden, modern architecture, and premium finishes. Features include a spacious living area, home office, and a rooftop terrace with city views.',
    yearBuilt: 2019,
    keyFeatures: ['Parking', 'Security', 'Garden', 'Power Backup', 'Modular Kitchen', 'Balcony', 'Furnished'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      publicId: 'demo-property-2-display'
    },
    additionalImages: [
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
        publicId: 'demo-property-2-additional-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        publicId: 'demo-property-2-additional-2'
      }
    ],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Raj Nagar',
      fullAddress: '45, Elite Villas, Raj Nagar, Near Shopping Complex',
      pinCode: '250002'
    },
    status: 'active'
  },
  {
    propertyType: 'House',
    title: 'Spacious 3BHK Independent House',
    price: 6500000,
    transactionType: 'Sale',
    area: 2400,
    description: 'Well-maintained 3BHK independent house in a peaceful neighborhood. Features include a large living room, separate dining area, and a beautiful backyard. Ideal for families seeking comfort and privacy.',
    yearBuilt: 2015,
    keyFeatures: ['Parking', 'Security', 'Garden', 'Power Backup'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop',
      publicId: 'demo-property-3-display'
    },
    additionalImages: [
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
        publicId: 'demo-property-3-additional-1'
      }
    ],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Shastri Nagar',
      fullAddress: '78, Krishna Colony, Shastri Nagar, Near School',
      pinCode: '250003'
    },
    status: 'active'
  },
  {
    propertyType: 'Apartment',
    title: 'Modern 2BHK Apartment for Rent',
    price: 25000,
    transactionType: 'Rent',
    area: 1200,
    description: 'Fully furnished 2BHK apartment available for rent. Located in a prime area with excellent connectivity. Includes all modern amenities and is ready to move in. Perfect for working professionals or small families.',
    yearBuilt: 2021,
    keyFeatures: ['Parking', 'Security', 'Lift', 'Power Backup', 'Furnished', 'Modular Kitchen'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1600607688969-a5fcd326165d?w=800&h=600&fit=crop',
      publicId: 'demo-property-4-display'
    },
    additionalImages: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        publicId: 'demo-property-4-additional-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        publicId: 'demo-property-4-additional-2'
      }
    ],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Vijay Nagar',
      fullAddress: '12A, Sunrise Apartments, Vijay Nagar, Main Road',
      pinCode: '250004'
    },
    status: 'active'
  },
  {
    propertyType: 'Commercial',
    title: 'Prime Commercial Space for Lease',
    price: 75000,
    transactionType: 'Lease',
    area: 2500,
    description: 'Premium commercial space available for lease in a high-traffic area. Ideal for retail stores, showrooms, or offices. Features include ample parking, modern infrastructure, and excellent visibility.',
    yearBuilt: 2018,
    keyFeatures: ['Parking', 'Security', 'Power Backup'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      publicId: 'demo-property-5-display'
    },
    additionalImages: [
      {
        url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
        publicId: 'demo-property-5-additional-1'
      }
    ],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Delhi Road',
      fullAddress: 'Shop No. 15-20, City Mall, Delhi Road, Near Bus Stand',
      pinCode: '250001'
    },
    status: 'active'
  },
  {
    propertyType: 'Office Space',
    title: 'Fully Furnished Office Space',
    price: 50000,
    transactionType: 'Rent',
    area: 1800,
    description: 'Modern office space with all amenities. Perfect for startups or established businesses. Includes conference room, reception area, and individual cabins. Located in a business district with excellent connectivity.',
    yearBuilt: 2020,
    keyFeatures: ['Parking', 'Security', 'Lift', 'Power Backup', 'Furnished'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
      publicId: 'demo-property-6-display'
    },
    additionalImages: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        publicId: 'demo-property-6-additional-1'
      }
    ],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Baghpat Road',
      fullAddress: '3rd Floor, Business Tower, Baghpat Road, Near Railway Station',
      pinCode: '250002'
    },
    status: 'active'
  },
  {
    propertyType: 'Shop',
    title: 'Retail Shop in Prime Location',
    price: 45000,
    transactionType: 'Rent',
    area: 600,
    description: 'Well-located retail shop with high footfall. Ideal for fashion, electronics, or general merchandise. Features include good storage space, display area, and easy access for customers.',
    yearBuilt: 2017,
    keyFeatures: ['Parking', 'Security'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      publicId: 'demo-property-7-display'
    },
    additionalImages: [],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Sadar Bazar',
      fullAddress: 'Shop No. 42, Market Complex, Sadar Bazar, Main Market',
      pinCode: '250001'
    },
    status: 'active'
  },
  {
    propertyType: 'Plot',
    title: 'Residential Plot in Developing Area',
    price: 3500000,
    transactionType: 'Sale',
    area: 1800,
    description: 'Prime residential plot in a rapidly developing area. Perfect for building your dream home. All legal clearances done, ready for construction. Located near schools, hospitals, and shopping centers.',
    keyFeatures: [],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
      publicId: 'demo-property-8-display'
    },
    additionalImages: [],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Modipuram',
      fullAddress: 'Plot No. 25, Sector 5, Modipuram, Near Highway',
      pinCode: '250110'
    },
    status: 'active'
  },
  {
    propertyType: 'Farmhouse',
    title: 'Luxury Farmhouse with Pool',
    price: 25000000,
    transactionType: 'Sale',
    area: 5000,
    description: 'Exclusive farmhouse with swimming pool, landscaped gardens, and modern amenities. Perfect for weekend getaways or as a primary residence. Features include multiple bedrooms, entertainment area, and private pool.',
    yearBuilt: 2016,
    keyFeatures: ['Parking', 'Security', 'Garden', 'Swimming Pool', 'Power Backup', 'Furnished'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      publicId: 'demo-property-9-display'
    },
    additionalImages: [
      {
        url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
        publicId: 'demo-property-9-additional-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        publicId: 'demo-property-9-additional-2'
      }
    ],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Sardhana',
      fullAddress: 'Farmhouse No. 7, Green Valley Estate, Sardhana Road',
      pinCode: '250342'
    },
    status: 'active'
  },
  {
    propertyType: 'Apartment',
    title: 'Premium 4BHK Penthouse',
    price: 12000000,
    transactionType: 'Sale',
    area: 2800,
    description: 'Luxury penthouse with panoramic city views. Features include premium finishes, private terrace, home automation, and concierge services. Located in the most prestigious building in the city.',
    yearBuilt: 2022,
    keyFeatures: ['Parking', 'Security', 'Lift', 'Power Backup', 'Gym', 'Swimming Pool', 'Modular Kitchen', 'Furnished', 'Balcony'],
    displayImage: {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      publicId: 'demo-property-10-display'
    },
    additionalImages: [
      {
        url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        publicId: 'demo-property-10-additional-1'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607688969-a5fcd326165d?w=800&h=600&fit=crop',
        publicId: 'demo-property-10-additional-2'
      }
    ],
    address: {
      state: 'Uttar Pradesh',
      city: 'Meerut',
      area: 'Civil Lines',
      fullAddress: 'Penthouse 12A, Elite Towers, Civil Lines, Top Floor',
      pinCode: '250001'
    },
    status: 'active'
  }
];

const seedProperties = async () => {
  try {
    // Connect to database
    await connectDB();

    // Find an admin user
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.error('❌ No admin user found. Please register an admin user first.');
      process.exit(1);
    }

    console.log(`✅ Found admin user: ${adminUser.name} (${adminUser.email})`);

    // Clear existing properties (optional - comment out if you want to keep existing)
    // await Property.deleteMany({});
    // console.log('🗑️  Cleared existing properties');

    // Add createdBy to each property
    const propertiesToInsert = demoProperties.map(property => ({
      ...property,
      createdBy: adminUser._id
    }));

    // Insert properties
    const insertedProperties = await Property.insertMany(propertiesToInsert);

    console.log(`\n✅ Successfully seeded ${insertedProperties.length} demo properties!`);
    console.log('\n📊 Summary:');
    console.log(`   - Total Properties: ${insertedProperties.length}`);
    console.log(`   - Active Properties: ${insertedProperties.filter(p => p.status === 'active').length}`);
    console.log(`   - For Sale: ${insertedProperties.filter(p => p.transactionType === 'Sale').length}`);
    console.log(`   - For Rent: ${insertedProperties.filter(p => p.transactionType === 'Rent').length}`);
    console.log(`   - For Lease: ${insertedProperties.filter(p => p.transactionType === 'Lease').length}`);
    
    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding properties:', error);
    process.exit(1);
  }
};

// Run the seeder
seedProperties();

