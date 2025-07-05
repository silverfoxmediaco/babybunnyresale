// File: frontend/src/components/MockData.jsx

// Mock Categories
export const mockCategories = [
    { _id: '1', name: 'Clothing', icon: '👕', slug: 'clothing', itemCount: 234 },
    { _id: '2', name: 'Toys', icon: '🧸', slug: 'toys', itemCount: 156 },
    { _id: '3', name: 'Strollers', icon: '🏃', slug: 'strollers', itemCount: 78 },
    { _id: '4', name: 'Nursery', icon: '🏠', slug: 'nursery', itemCount: 123 },
    { _id: '5', name: 'Feeding', icon: '🍼', slug: 'feeding', itemCount: 89 },
    { _id: '6', name: 'Safety', icon: '🛡️', slug: 'safety', itemCount: 45 },
    { _id: '7', name: 'Books', icon: '📚', slug: 'books', itemCount: 167 },
    { _id: '8', name: 'Outdoor', icon: '🌳', slug: 'outdoor', itemCount: 92 },
  ];
  
  // Mock Sellers
  export const mockSellers = [
    { _id: 's1', name: 'Sarah Mitchell', rating: 4.8, totalRatings: 124, isVerified: true, avatar: null },
    { _id: 's2', name: 'Mike Thompson', rating: 4.9, totalRatings: 89, isVerified: true, avatar: null },
    { _id: 's3', name: 'Lisa Kim', rating: 4.7, totalRatings: 56, isVerified: false, avatar: null },
    { _id: 's4', name: 'John Davis', rating: 4.6, totalRatings: 203, isVerified: true, avatar: null },
    { _id: 's5', name: 'Amy Roberts', rating: 5.0, totalRatings: 34, isVerified: true, avatar: null },
    { _id: 's6', name: 'David Lee', rating: 4.8, totalRatings: 178, isVerified: true, avatar: null },
    { _id: 's7', name: 'Emma Wilson', rating: 4.7, totalRatings: 92, isVerified: false, avatar: null },
    { _id: 's8', name: 'Chris Brown', rating: 4.9, totalRatings: 145, isVerified: true, avatar: null },
  ];
  
  // Mock Auctions
  export const mockAuctions = [
    {
      _id: '1',
      title: 'Graco Travel System - Like New Condition',
      description: 'Barely used Graco travel system including car seat and stroller. Used only for 3 months before baby outgrew it. All safety features intact, clean, smoke-free home.',
      currentBid: 145,
      startingBid: 100,
      buyNowPrice: 250,
      bidCount: 12,
      bidIncrement: 5,
      images: [{ url: null, publicId: 'placeholder1' }],
      condition: 'Like New',
      category: mockCategories[2],
      seller: mockSellers[0],
      shipping: { freeShipping: true, cost: 0, method: 'standard' },
      location: { city: 'Dallas', state: 'TX', zipCode: '75201' },
      timeLeft: '2h 15m',
      endTime: new Date(Date.now() + 2.25 * 60 * 60 * 1000),
      views: 234,
      watchers: ['u1', 'u2', 'u3'],
      isHot: true,
      isFeatured: true,
      status: 'active',
      brand: 'Graco',
      ageRange: '0-3 months',
    },
    {
      _id: '2',
      title: 'Baby Bundle 0-6 Months - 25 Items Including Clothes & Toys',
      description: 'Complete baby bundle perfect for newborns. Includes onesies, sleepers, bibs, blankets, and developmental toys. All items gently used and freshly laundered.',
      currentBid: 89,
      startingBid: 50,
      buyNowPrice: 150,
      bidCount: 24,
      bidIncrement: 3,
      images: [{ url: null, publicId: 'placeholder2' }],
      condition: 'Excellent',
      category: mockCategories[0],
      seller: mockSellers[1],
      shipping: { freeShipping: false, cost: 12, method: 'standard' },
      location: { city: 'Houston', state: 'TX', zipCode: '77001' },
      timeLeft: '4h 30m',
      endTime: new Date(Date.now() + 4.5 * 60 * 60 * 1000),
      views: 456,
      watchers: ['u1', 'u4', 'u5', 'u6'],
      isHot: true,
      isFeatured: false,
      status: 'active',
      brand: 'Various',
      ageRange: '0-3 months',
    },
    {
      _id: '3',
      title: 'Wooden Activity Cube Educational Toy',
      description: 'Multi-sided activity cube featuring bead maze, shape sorter, spinning gears, and more. Great for fine motor skills development.',
      currentBid: 25,
      startingBid: 20,
      buyNowPrice: 60,
      bidCount: 3,
      bidIncrement: 2,
      images: [{ url: null, publicId: 'placeholder3' }],
      condition: 'Very Good',
      category: mockCategories[1],
      seller: mockSellers[2],
      shipping: { freeShipping: false, cost: 8, method: 'standard' },
      location: { city: 'Austin', state: 'TX', zipCode: '78701' },
      timeLeft: '6h 45m',
      endTime: new Date(Date.now() + 6.75 * 60 * 60 * 1000),
      views: 123,
      watchers: ['u2'],
      isHot: false,
      isFeatured: false,
      status: 'active',
      brand: 'Melissa & Doug',
      ageRange: '1-2 years',
    },
    {
      _id: '4',
      title: 'Ergobaby Original Baby Carrier - Navy',
      description: 'Ergonomic baby carrier suitable from 7-45 lbs. Multiple carrying positions, lumbar support, and sleeping hood included.',
      currentBid: 65,
      startingBid: 40,
      buyNowPrice: 120,
      bidCount: 8,
      bidIncrement: 5,
      images: [{ url: null, publicId: 'placeholder4' }],
      condition: 'Good',
      category: mockCategories[5],
      seller: mockSellers[3],
      shipping: { freeShipping: true, cost: 0, method: 'standard' },
      location: { city: 'San Antonio', state: 'TX', zipCode: '78201' },
      timeLeft: '1d 2h',
      endTime: new Date(Date.now() + 26 * 60 * 60 * 1000),
      views: 189,
      watchers: ['u3', 'u4'],
      isHot: false,
      isFeatured: true,
      status: 'active',
      brand: 'Ergobaby',
      ageRange: '0-3 months',
    },
    {
      _id: '5',
      title: 'Baby Einstein Play Gym with Music & Lights',
      description: 'Interactive play gym featuring removable toys, music player with classical melodies, and tummy time pillow.',
      currentBid: 35,
      startingBid: 25,
      buyNowPrice: 70,
      bidCount: 5,
      bidIncrement: 2,
      images: [{ url: null, publicId: 'placeholder5' }],
      condition: 'Like New',
      category: mockCategories[1],
      seller: mockSellers[4],
      shipping: { freeShipping: false, cost: 10, method: 'standard' },
      location: { city: 'Fort Worth', state: 'TX', zipCode: '76101' },
      timeLeft: '12h 30m',
      endTime: new Date(Date.now() + 12.5 * 60 * 60 * 1000),
      views: 267,
      watchers: ['u1', 'u5', 'u6'],
      isHot: false,
      isFeatured: false,
      status: 'active',
      brand: 'Baby Einstein',
      ageRange: '0-3 months',
    },
    {
      _id: '6',
      title: 'Pottery Barn Kids Crib Bedding Set - Elephant Theme',
      description: 'Complete 8-piece crib bedding set including quilt, bumper, sheet, skirt, and decorative pillows. Neutral gray and white elephant theme.',
      currentBid: 175,
      startingBid: 100,
      buyNowPrice: 350,
      bidCount: 15,
      bidIncrement: 10,
      images: [{ url: null, publicId: 'placeholder6' }],
      condition: 'Excellent',
      category: mockCategories[3],
      seller: mockSellers[5],
      shipping: { freeShipping: false, cost: 25, method: 'express' },
      location: { city: 'Plano', state: 'TX', zipCode: '75023' },
      timeLeft: '3d 5h',
      endTime: new Date(Date.now() + 77 * 60 * 60 * 1000),
      views: 543,
      watchers: ['u2', 'u3', 'u4', 'u5', 'u6', 'u7'],
      isHot: true,
      isFeatured: true,
      status: 'active',
      brand: 'Pottery Barn Kids',
      ageRange: '0-3 months',
    },
    {
      _id: '7',
      title: 'Chicco KeyFit 30 Infant Car Seat with Base',
      description: 'Top-rated infant car seat with stay-in-car base. EPS energy-absorbing foam, removable newborn insert. Expires 2028.',
      currentBid: 95,
      startingBid: 75,
      buyNowPrice: 180,
      bidCount: 7,
      bidIncrement: 5,
      images: [{ url: null, publicId: 'placeholder7' }],
      condition: 'Very Good',
      category: mockCategories[2],
      seller: mockSellers[6],
      shipping: { freeShipping: false, cost: 15, method: 'standard' },
      location: { city: 'Arlington', state: 'TX', zipCode: '76001' },
      timeLeft: '18h',
      endTime: new Date(Date.now() + 18 * 60 * 60 * 1000),
      views: 312,
      watchers: ['u1', 'u3', 'u5'],
      isHot: false,
      isFeatured: false,
      status: 'active',
      brand: 'Chicco',
      ageRange: '0-3 months',
    },
    {
      _id: '8',
      title: 'Complete Cloth Diaper Set - 24 Diapers + Accessories',
      description: 'Eco-friendly cloth diaper collection with adjustable sizes, waterproof covers, and bamboo inserts. Includes wet bags and diaper sprayer.',
      currentBid: 125,
      startingBid: 80,
      buyNowPrice: 220,
      bidCount: 10,
      bidIncrement: 5,
      images: [{ url: null, publicId: 'placeholder8' }],
      condition: 'Good',
      category: mockCategories[0],
      seller: mockSellers[7],
      shipping: { freeShipping: true, cost: 0, method: 'standard' },
      location: { city: 'Irving', state: 'TX', zipCode: '75038' },
      timeLeft: '2d 14h',
      endTime: new Date(Date.now() + 62 * 60 * 60 * 1000),
      views: 234,
      watchers: ['u2', 'u4', 'u6', 'u7'],
      isHot: false,
      isFeatured: false,
      status: 'active',
      brand: 'BumGenius',
      ageRange: '0-3 months',
    },
    {
      _id: '9',
      title: 'Fisher-Price Rainforest Jumperoo Activity Center',
      description: 'Baby activity jumper with music, lights, and toys. Adjustable height, machine washable seat pad. Maximum weight 25 lbs.',
      currentBid: 55,
      startingBid: 35,
      buyNowPrice: 90,
      bidCount: 9,
      bidIncrement: 3,
      images: [{ url: null, publicId: 'placeholder9' }],
      condition: 'Very Good',
      category: mockCategories[1],
      seller: mockSellers[0],
      shipping: { freeShipping: false, cost: 18, method: 'standard' },
      location: { city: 'Frisco', state: 'TX', zipCode: '75034' },
      timeLeft: '8h 20m',
      endTime: new Date(Date.now() + 8.33 * 60 * 60 * 1000),
      views: 178,
      watchers: ['u1', 'u5'],
      isHot: false,
      isFeatured: false,
      status: 'active',
      brand: 'Fisher-Price',
      ageRange: '3-6 months',
    },
    {
      _id: '10',
      title: 'Uppababy Vista Stroller System 2022 Model',
      description: 'Premium full-size stroller with bassinet, toddler seat, and rain/bug shields. Can expand for multiple children.',
      currentBid: 425,
      startingBid: 300,
      buyNowPrice: 750,
      bidCount: 18,
      bidIncrement: 25,
      images: [{ url: null, publicId: 'placeholder10' }],
      condition: 'Like New',
      category: mockCategories[2],
      seller: mockSellers[1],
      shipping: { freeShipping: false, cost: 45, method: 'express' },
      location: { city: 'McKinney', state: 'TX', zipCode: '75070' },
      timeLeft: '5d 12h',
      endTime: new Date(Date.now() + 132 * 60 * 60 * 1000),
      views: 892,
      watchers: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8'],
      isHot: true,
      isFeatured: true,
      status: 'active',
      brand: 'Uppababy',
      ageRange: '0-3 months',
    },
  ];
  
  // Mock Bids
  export const mockBids = [
    { _id: 'b1', auction: '1', bidder: mockSellers[1], amount: 145, createdAt: new Date(Date.now() - 5 * 60 * 1000) },
    { _id: 'b2', auction: '1', bidder: mockSellers[2], amount: 140, createdAt: new Date(Date.now() - 10 * 60 * 1000) },
    { _id: 'b3', auction: '1', bidder: mockSellers[3], amount: 135, createdAt: new Date(Date.now() - 15 * 60 * 1000) },
    { _id: 'b4', auction: '2', bidder: mockSellers[4], amount: 89, createdAt: new Date(Date.now() - 2 * 60 * 1000) },
    { _id: 'b5', auction: '2', bidder: mockSellers[5], amount: 86, createdAt: new Date(Date.now() - 8 * 60 * 1000) },
  ];
  
  // Mock User
  export const mockUser = {
    _id: 'u1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: null,
    isVerified: false,
    rating: 0,
    totalRatings: 0,
    role: 'user',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  };
  
  // Helper function to filter auctions
  export const filterMockAuctions = (filters) => {
    let filtered = [...mockAuctions];
  
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(auction => 
        auction.title.toLowerCase().includes(searchLower) ||
        auction.description.toLowerCase().includes(searchLower) ||
        auction.brand.toLowerCase().includes(searchLower)
      );
    }
  
    // Category filter
    if (filters.category) {
      filtered = filtered.filter(auction => auction.category._id === filters.category);
    }
  
    // Condition filter
    if (filters.condition) {
      filtered = filtered.filter(auction => auction.condition === filters.condition);
    }
  
    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(auction => auction.currentBid >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(auction => auction.currentBid <= parseFloat(filters.maxPrice));
    }
  
    // Sorting
    if (filters.sort) {
      switch (filters.sort) {
        case '-createdAt':
          filtered.sort((a, b) => b._id.localeCompare(a._id));
          break;
        case 'createdAt':
          filtered.sort((a, b) => a._id.localeCompare(b._id));
          break;
        case 'currentBid':
          filtered.sort((a, b) => a.currentBid - b.currentBid);
          break;
        case '-currentBid':
          filtered.sort((a, b) => b.currentBid - a.currentBid);
          break;
        case 'endTime':
          filtered.sort((a, b) => a.endTime - b.endTime);
          break;
        case '-views':
          filtered.sort((a, b) => b.views - a.views);
          break;
        default:
          break;
      }
    }
  
    return filtered;
  };
  
  // Helper to get featured auctions
  export const getFeaturedMockAuctions = () => {
    return mockAuctions.filter(auction => auction.isFeatured).slice(0, 4);
  };
  
  // Helper to get hot auctions
  export const getHotMockAuctions = () => {
    return mockAuctions.filter(auction => auction.isHot);
  };