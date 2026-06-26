import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { HiArrowRight, HiOutlineSearch, HiOutlineX, HiOutlineFilter } from 'react-icons/hi';
import RiceProductCard from '../components/product/RiceProductCard';

const varieties = [
  {
    name: 'Premium Basmati Rice',
    slug: 'premium-basmati-rice',
    origin: 'Punjab',
    aroma: 'Sweet, nutty fragrance',
    cookingTime: '15-20 min',
    rating: 4.8,
    numReviews: 124,
    description: 'The king of rice, known for its long grains and enchanting aroma. Sourced from the finest farms in Punjab.',
    image: 'https://images.pexels.com/photos/8287250/pexels-photo-8287250.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Long-grained aromatic rice with a sweet nutty fragrance. Perfect for special occasions.',
      grainType: 'Long Grain',
      price: 189,
      uses: ['Biryanis', 'Pulao', 'Special Occasions', 'Festive Meals', 'Gift Hampers'],
      benefits: [
        'Rich in essential nutrients and vitamins',
        'Low glycemic index for better health',
        'Naturally gluten-free',
        'Aromatic fragrance enhances any dish',
        'Long grains remain separate after cooking',
      ],
      storageInstructions: 'Store in an airtight container in a cool, dry place away from direct sunlight. Shelf life: 12 months.',
      packagingSizes: ['500g - ₹99', '1kg - ₹189', '2kg - ₹359', '5kg - ₹849', '10kg - ₹1,599'],
      nutritionalInfo: {
        calories: '345 kcal',
        protein: '7.5g',
        carbs: '78g',
        fat: '0.6g',
        fiber: '1.2g',
      },
    },
  },
  {
    name: 'Sona Masoori',
    slug: 'sona-masoori-rice',
    origin: 'Andhra Pradesh',
    aroma: 'Mild, pleasant',
    cookingTime: '12-15 min',
    rating: 4.6,
    numReviews: 98,
    description: 'Lightweight and aromatic premium rice, ideal for daily consumption. A staple in South Indian kitchens.',
    image: 'https://images.pexels.com/photos/8287249/pexels-photo-8287249.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Lightweight, aromatic premium rice perfect for everyday meals and South Indian dishes.',
      grainType: 'Medium Grain',
      price: 145,
      uses: ['Daily Cooking', 'South Indian Dishes', 'Idli', 'Dosa', 'Rice Bowls'],
      benefits: [
        'Light and easy to digest',
        'Perfect for daily consumption',
        'Mild aroma complements any dish',
        'Cooks quickly and evenly',
        'Good source of energy',
      ],
      storageInstructions: 'Keep in a sealed container in a dry, cool place. Avoid moisture. Shelf life: 12 months.',
      packagingSizes: ['1kg - ₹145', '2kg - ₹275', '5kg - ₹650', '10kg - ₹1,250', '25kg - ₹2,999'],
      nutritionalInfo: {
        calories: '340 kcal',
        protein: '6.8g',
        carbs: '76g',
        fat: '0.5g',
        fiber: '1.0g',
      },
    },
  },
  {
    name: 'Organic Brown Rice',
    slug: 'organic-brown-rice',
    origin: 'Certified Organic Farms',
    aroma: 'Nutty, earthy',
    cookingTime: '20-25 min',
    rating: 4.7,
    numReviews: 76,
    description: 'Nutrient-rich unpolished rice with the bran layer intact for maximum health benefits.',
    image: 'https://images.pexels.com/photos/3737691/pexels-photo-3737691.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Unpolished, nutrient-rich rice with bran layer intact. Packed with fiber and essential minerals.',
      grainType: 'Long Grain (Unpolished)',
      price: 220,
      uses: ['Health-Conscious Meals', 'Salads', 'Buddha Bowls', 'Weight Management', 'Diabetic Diet'],
      benefits: [
        'High fiber content aids digestion',
        'Rich in magnesium and selenium',
        'Helps maintain healthy cholesterol',
        'Supports weight management',
        'Certified organic - no pesticides',
      ],
      storageInstructions: 'Store in a cool, dry place in an airtight container. Refrigerate for longer shelf life. Shelf life: 6 months.',
      packagingSizes: ['500g - ₹120', '1kg - ₹220', '2kg - ₹420', '5kg - ₹999'],
      nutritionalInfo: {
        calories: '355 kcal',
        protein: '7.9g',
        carbs: '73g',
        fat: '2.5g',
        fiber: '3.5g',
      },
    },
  },
  {
    name: 'Ponni Rice',
    slug: 'ponni-rice',
    origin: 'Tamil Nadu',
    aroma: 'Mild, natural',
    cookingTime: '12-15 min',
    rating: 4.5,
    numReviews: 63,
    description: "Premium parboiled rice that's a staple in South Indian kitchens. Known for its fluffy texture.",
    image: 'https://images.pexels.com/photos/3737697/pexels-photo-3737697.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Premium parboiled rice known for its fluffy texture and natural mild aroma.',
      grainType: 'Short Grain (Parboiled)',
      price: 135,
      uses: ['Idli', 'Dosa', 'Daily Meals', 'South Indian Breakfast', 'Rice Cakes'],
      benefits: [
        'Parboiled for extra nutrition',
        'Fluffy texture when cooked',
        'Easy to digest',
        'Rich in B vitamins',
        'Long-lasting energy release',
      ],
      storageInstructions: 'Store in a dry, airtight container away from moisture. Shelf life: 12 months.',
      packagingSizes: ['1kg - ₹135', '2kg - ₹255', '5kg - ₹610', '10kg - ₹1,180'],
      nutritionalInfo: {
        calories: '342 kcal',
        protein: '7.0g',
        carbs: '77g',
        fat: '0.4g',
        fiber: '1.1g',
      },
    },
  },
  {
    name: 'Kolam Rice',
    slug: 'kolam-rice',
    origin: 'Maharashtra',
    aroma: 'Light, floral',
    cookingTime: '12-15 min',
    rating: 4.5,
    numReviews: 52,
    description: 'Short-grain rice known for its soft texture and easy digestibility. A family favorite.',
    image: 'https://images.pexels.com/photos/3737694/pexels-photo-3737694.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Soft-textured short-grain rice with a light floral aroma. Easy to digest and cook.',
      grainType: 'Short Grain',
      price: 160,
      uses: ['Daily Cooking', 'Light Meals', 'Rice Porridge', 'Curd Rice', 'Comfort Food'],
      benefits: [
        'Extremely soft and fluffy texture',
        'Very easy to digest',
        'Ideal for children and elderly',
        'Quick cooking time',
        'Light floral aroma',
      ],
      storageInstructions: 'Keep in a sealed container in a dry, ventilated area. Shelf life: 12 months.',
      packagingSizes: ['1kg - ₹160', '2kg - ₹305', '5kg - ₹730', '10kg - ₹1,399'],
      nutritionalInfo: {
        calories: '338 kcal',
        protein: '6.5g',
        carbs: '75g',
        fat: '0.4g',
        fiber: '0.9g',
      },
    },
  },
  {
    name: 'Jeera Rice',
    slug: 'jeera-rice',
    origin: 'Punjab',
    aroma: 'Cumin-like fragrance',
    cookingTime: '15-18 min',
    rating: 4.4,
    numReviews: 41,
    description: 'Small-grained aromatic rice with a distinctive cumin-like flavor. A specialty variety.',
    image: 'https://images.pexels.com/photos/3737695/pexels-photo-3737695.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Small-grained aromatic rice with a distinctive cumin-like flavor. Perfect for special dishes.',
      grainType: 'Short Grain (Aromatic)',
      price: 175,
      uses: ['Jeera Rice', 'Special Dishes', 'Festive Meals', 'North Indian Cuisine', 'Restaurant Style'],
      benefits: [
        'Unique cumin-like aroma',
        'Grains remain separate after cooking',
        'Enhances the flavor of dishes',
        'Premium quality grains',
        'Perfect for entertaining',
      ],
      storageInstructions: 'Store in an airtight container in a cool, dark place. Shelf life: 12 months.',
      packagingSizes: ['500g - ₹95', '1kg - ₹175', '2kg - ₹335', '5kg - ₹799'],
      nutritionalInfo: {
        calories: '340 kcal',
        protein: '6.9g',
        carbs: '76g',
        fat: '0.5g',
        fiber: '1.0g',
      },
    },
  },
  {
    name: 'Dubar Rice',
    slug: 'dubar-rice',
    origin: 'Andhra Pradesh',
    aroma: 'Mild, natural',
    cookingTime: '15-20 min',
    rating: 4.3,
    numReviews: 31,
    description: 'Premium quality daily-use rice popular in Andhra and Telangana regions.',
    image: 'https://images.pexels.com/photos/8287243/pexels-photo-8287243.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Popular daily-use rice from Andhra Pradesh with a natural mild flavor and fluffy texture.',
      grainType: 'Medium Grain',
      price: 150,
      uses: ['Daily Meals', 'South Indian Cuisine', 'Rice Bowls', 'Biryani', 'Pulao'],
      benefits: [
        'Excellent for daily cooking',
        'Fluffy texture when cooked',
        'Good value for money',
        'Versatile for various dishes',
        'Consistent quality',
      ],
      storageInstructions: 'Store in a cool, dry place in a sealed container. Shelf life: 12 months.',
      packagingSizes: ['1kg - ₹150', '2kg - ₹285', '5kg - ₹680', '10kg - ₹1,299'],
      nutritionalInfo: {
        calories: '340 kcal',
        protein: '6.8g',
        carbs: '76g',
        fat: '0.5g',
        fiber: '1.0g',
      },
    },
  },
  {
    name: 'Idly Rice',
    slug: 'idly-rice',
    origin: 'Tamil Nadu',
    aroma: 'Mild, natural',
    cookingTime: 'Soak overnight',
    rating: 4.4,
    numReviews: 45,
    description: 'Special rice variety specifically milled for making soft and fluffy idlis and dosas.',
    image: 'https://images.pexels.com/photos/3737698/pexels-photo-3737698.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Specially milled rice for making soft, fluffy idlis and crispy dosas. A breakfast essential.',
      grainType: 'Short Grain (Parboiled)',
      price: 140,
      uses: ['Idli', 'Dosa', 'South Indian Breakfast', 'Batter Preparation', 'Fermented Recipes'],
      benefits: [
        'Specially milled for idli/dosa',
        'Produces soft and fluffy idlis',
        'Crispy dosas every time',
        'Ferments well for batter',
        'Traditional South Indian variety',
      ],
      storageInstructions: 'Store in a cool, dry place in an airtight container. Shelf life: 12 months.',
      packagingSizes: ['1kg - ₹140', '2kg - ₹270', '5kg - ₹640', '10kg - ₹1,230'],
      nutritionalInfo: {
        calories: '342 kcal',
        protein: '7.0g',
        carbs: '77g',
        fat: '0.4g',
        fiber: '1.1g',
      },
    },
  },
  {
    name: 'Raw Rice',
    slug: 'raw-rice',
    origin: 'Telangana',
    aroma: 'Mild, natural',
    cookingTime: '15-20 min',
    rating: 4.2,
    numReviews: 35,
    description: 'Unpolished raw rice that retains natural nutrients. Ideal for those who prefer non-parboiled rice.',
    image: 'https://images.pexels.com/photos/8287247/pexels-photo-8287247.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Unpolished raw rice retaining natural nutrients. Ideal for non-parboiled rice lovers.',
      grainType: 'Medium Grain (Raw)',
      price: 125,
      uses: ['Daily Cooking', 'Plain Rice', 'Rice Bowls', 'South Indian Meals', 'Curries'],
      benefits: [
        'Unpolished - retains nutrients',
        'Natural flavor and texture',
        'Affordable daily option',
        'Versatile cooking uses',
        'Lighter on the stomach',
      ],
      storageInstructions: 'Store in a sealed container in a dry, cool place. Shelf life: 12 months.',
      packagingSizes: ['1kg - ₹125', '2kg - ₹235', '5kg - ₹560', '10kg - ₹1,080'],
      nutritionalInfo: {
        calories: '338 kcal',
        protein: '6.5g',
        carbs: '75g',
        fat: '0.4g',
        fiber: '0.9g',
      },
    },
  },
  {
    name: 'Steam Rice',
    slug: 'steam-rice',
    origin: 'Karnataka',
    aroma: 'Mild, natural',
    cookingTime: '15-20 min',
    rating: 4.1,
    numReviews: 28,
    description: 'Steam-cooked rice variety that offers a perfect balance of texture and nutrition.',
    image: 'https://images.pexels.com/photos/3708747/pexels-photo-3708747.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Steam-processed rice offering a perfect balance of texture, nutrition, and everyday versatility.',
      grainType: 'Medium Grain (Steamed)',
      price: 130,
      uses: ['Daily Cooking', 'Steamed Rice', 'Simple Meals', 'Side Dishes', 'Lunch Box'],
      benefits: [
        'Steam-processed for nutrition',
        'Balanced texture',
        'Quick and easy to cook',
        'Versatile for any meal',
        'Budget-friendly option',
      ],
      storageInstructions: 'Store in an airtight container in a cool, dry place. Shelf life: 12 months.',
      packagingSizes: ['1kg - ₹130', '2kg - ₹245', '5kg - ₹585', '10kg - ₹1,130'],
      nutritionalInfo: {
        calories: '340 kcal',
        protein: '6.8g',
        carbs: '76g',
        fat: '0.5g',
        fiber: '1.0g',
      },
    },
  },
  {
    name: 'Broken Rice',
    slug: 'broken-rice',
    origin: 'India',
    aroma: 'Mild',
    cookingTime: '10-12 min',
    rating: 4.0,
    numReviews: 19,
    description: 'Economical broken rice grains that cook faster and are perfect for everyday meals and animal feed.',
    image: 'https://images.pexels.com/photos/4198000/pexels-photo-4198000.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Economical broken rice grains that cook faster. Great for everyday meals and porridge.',
      grainType: 'Broken Grain',
      price: 95,
      uses: ['Porridge', 'Kheer', 'Animal Feed', 'Budget Meals', 'Rice Flour'],
      benefits: [
        'Most economical option',
        'Cooks faster than whole grains',
        'Perfect for porridge and kheer',
        'Great for rice flour making',
        'Reduces food waste',
      ],
      storageInstructions: 'Store in a sealed bag or container in a dry place. Shelf life: 12 months.',
      packagingSizes: ['1kg - ₹95', '2kg - ₹180', '5kg - ₹430', '10kg - ₹830'],
      nutritionalInfo: {
        calories: '338 kcal',
        protein: '6.5g',
        carbs: '75g',
        fat: '0.3g',
        fiber: '0.8g',
      },
    },
  },
  {
    name: 'Ghee Rice Rice',
    slug: 'ghee-rice',
    origin: 'India',
    aroma: 'Buttery, rich',
    cookingTime: '20-25 min',
    rating: 4.6,
    numReviews: 57,
    description: 'Premium aromatic rice variety specially suited for making rich and flavorful ghee rice.',
    image: 'https://images.pexels.com/photos/11196880/pexels-photo-11196880.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    details: {
      shortDescription: 'Premium aromatic rice specially suited for rich, flavorful ghee rice and festive dishes.',
      grainType: 'Long Grain (Aromatic)',
      price: 195,
      uses: ['Ghee Rice', 'Festive Dishes', 'Special Meals', 'Party Rice', 'Restaurant Style'],
      benefits: [
        'Rich buttery aroma',
        'Absorbs ghee and spices well',
        'Fluffy separate grains',
        'Perfect for festive cooking',
        'Restaurant-quality results',
      ],
      storageInstructions: 'Store in an airtight container in a cool, dark place. Shelf life: 12 months.',
      packagingSizes: ['500g - ₹105', '1kg - ₹195', '2kg - ₹375', '5kg - ₹899'],
      nutritionalInfo: {
        calories: '342 kcal',
        protein: '7.0g',
        carbs: '77g',
        fat: '0.6g',
        fiber: '1.1g',
      },
    },
  },
];

const filterCategories = [
  { id: 'all', label: 'All', icon: '🌾' },
  { id: 'long-grain', label: 'Long Grain', icon: '📏' },
  { id: 'medium-grain', label: 'Medium Grain', icon: '📐' },
  { id: 'short-grain', label: 'Short Grain', icon: '🔘' },
  { id: 'broken-grain', label: 'Broken', icon: '💎' },
  { id: 'aromatic', label: 'Aromatic', icon: '🌸' },
  { id: 'organic', label: 'Organic', icon: '🌿' },
  { id: 'parboiled', label: 'Parboiled', icon: '♨️' },
  { id: 'daily-use', label: 'Daily Use', icon: '🍚' },
  { id: 'premium', label: 'Premium', icon: '👑' },
];

function getCategoryIds(variety) {
  const ids = [];
  const gt = (variety.details?.grainType || '').toLowerCase();
  const name = variety.name.toLowerCase();
  const uses = variety.details?.uses || [];
  const usesJoined = uses.join(' ').toLowerCase();
  const desc = (variety.description || '').toLowerCase();

  if (gt.includes('long')) ids.push('long-grain');
  if (gt.includes('medium')) ids.push('medium-grain');
  if (gt.includes('short')) ids.push('short-grain');
  if (gt.includes('broken')) ids.push('broken-grain');
  if (gt.includes('parboiled')) ids.push('parboiled');
  if (name.includes('basmati') || name.includes('jeera') || name.includes('ghee') || gt.includes('aromatic')) ids.push('aromatic');
  if (name.includes('brown') || name.includes('organic') || name.includes('unpolished')) ids.push('organic');
  if (usesJoined.includes('daily') || usesJoined.includes('meal') || name.includes('sona') || name.includes('ponni') || name.includes('kolam') || name.includes('raw') || name.includes('steam') || name.includes('dubar') || name.includes('idly')) ids.push('daily-use');
  if (name.includes('basmati') || name.includes('premium') || name.includes('ghee') || gt.includes('premium') || desc.includes('premium')) ids.push('premium');

  return ids;
}

function matchesSearch(variety, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    variety.name.toLowerCase().includes(q) ||
    (variety.description || '').toLowerCase().includes(q) ||
    (variety.details?.shortDescription || '').toLowerCase().includes(q) ||
    (variety.origin || '').toLowerCase().includes(q) ||
    (variety.details?.uses || []).some(u => u.toLowerCase().includes(q)) ||
    (variety.details?.benefits || []).some(b => b.toLowerCase().includes(q)) ||
    (variety.details?.grainType || '').toLowerCase().includes(q)
  );
}

export default function RiceVarieties() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...varieties];

    // Search filter
    if (searchQuery) {
      result = result.filter(v => matchesSearch(v, searchQuery));
    }

    // Category filter
    if (activeFilter !== 'all') {
      result = result.filter(v => getCategoryIds(v).includes(activeFilter));
    }

    return result;
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Rice Varieties | Sri Kurmanandha - Premium Rice Collection</title>
        <meta name="description" content="Explore our premium collection of finest rice varieties - Basmati, Sona Masoori, Brown Rice, Kolam, Jeera, Ponni, and more. Shop the best rice online at Sri Kurmanandha Premium Stores." />
        <meta name="keywords" content="rice varieties, basmati rice, sona masoori, brown rice, ponni rice, kolam rice, jeera rice, indian rice" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🌾</div>
          <div className="absolute bottom-10 right-10 text-6xl">🌾</div>
          <div className="absolute top-1/2 left-1/4 text-4xl">🌾</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              🌾 Discover Our Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white" data-aos="fade-up">
              Rice Varieties
            </h1>
            <p className="text-white/80 text-lg md:text-xl mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Explore our premium collection of finest rice varieties from across India — each grain handpicked for quality
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8" data-aos="fade-up" data-aos-delay="200">
              <Link to="/products" className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg flex items-center gap-2">
                <span>All Products</span>
                <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '12+', label: 'Rice Varieties' },
              { number: '100%', label: 'Authentic Quality' },
              { number: '50+', label: 'Cities Served' },
              { number: '5000+', label: 'Happy Customers' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-primary-500">{stat.number}</p>
                <p className="text-sm text-dark-300 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-300" />
              <input
                type="text"
                placeholder="Search rice varieties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-2.5 border border-gray-200 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                         transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <HiOutlineX className="w-4 h-4 text-dark-300" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="md:hidden btn-outline flex items-center gap-2 px-4 py-2.5 text-sm"
              >
                <HiOutlineFilter className="w-4 h-4" />
                Filters
              </button>
              <p className="text-xs text-dark-300 whitespace-nowrap">
                {filtered.length} of {varieties.length} varieties
              </p>
            </div>
          </div>

          {/* Category Filter Tabs - Desktop */}
          <div className="hidden md:flex items-center gap-1.5 mt-4 overflow-x-auto pb-1">
            {filterCategories.map((cat) => {
              const count = activeFilter === 'all'
                ? varieties.length
                : varieties.filter(v => getCategoryIds(v).includes(cat.id)).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium
                             whitespace-nowrap transition-all duration-300 ${
                    activeFilter === cat.id
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-gray-100 text-dark-400 hover:bg-gray-200 hover:text-dark-500'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-xs ml-0.5 ${
                    activeFilter === cat.id ? 'text-white/70' : 'text-dark-300'
                  }`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Filter Panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-3 pb-1">
                  {filterCategories.map((cat) => {
                    const count = activeFilter === 'all'
                      ? varieties.length
                      : varieties.filter(v => getCategoryIds(v).includes(cat.id)).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium
                                   transition-all duration-200 ${
                          activeFilter === cat.id
                            ? 'bg-primary-500 text-white shadow'
                            : 'bg-gray-100 text-dark-400 hover:bg-gray-200'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                        <span className={`text-[10px] ${
                          activeFilter === cat.id ? 'text-white/60' : 'text-dark-300'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Rice Varieties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <span className="text-6xl">🔍</span>
              <h3 className="text-2xl font-display font-bold mt-4 text-dark-500">No varieties found</h3>
              <p className="text-dark-300 mt-2 max-w-md mx-auto">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term or clear the filter.`
                  : 'No varieties match the selected filter. Try a different category.'}
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="btn-outline flex items-center gap-2 px-5 py-2.5 text-sm"
                  >
                    <HiOutlineX className="w-4 h-4" /> Clear Search
                  </button>
                )}
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="btn-outline flex items-center gap-2 px-5 py-2.5 text-sm"
                  >
                    Show All Varieties
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-dark-300 text-sm mb-6"
              >
                Showing {filtered.length} {filtered.length === 1 ? 'variety' : 'varieties'}
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="ml-2 text-primary-500 hover:text-primary-600 underline font-medium"
                  >
                    Clear filter
                  </button>
                )}
              </motion.p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter + searchQuery}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filtered.map((variety, i) => (
                    <RiceProductCard key={variety.slug} variety={variety} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
              We source rice varieties from across India. Contact us for bulk orders or special requirements.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold
                         hover:bg-primary-50 hover:shadow-xl transition-all duration-300 text-lg"
            >
              <span>Contact Us for Bulk Orders</span>
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
