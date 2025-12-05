import React, { useState } from 'react';


const Blog = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Fall 2025 Fashion",
      excerpt: "Discover the must-have jackets, boots, and color palettes for this autumn season.",
      date: "Oct 05, 2025",
      readTime: "5 min read",
      imageUrl: "https://picsum.photos/seed/fallfashion/600/400",
      fullContent:
        "This fall is all about rich textures and bold silhouettes. We're seeing a return of classic trench coats, chunky-soled leather boots, and earthy tones like rust, olive, and deep burgundy. In this guide, we break down how to mix and match these key pieces to create stunning looks for any occasion, from a casual weekend outing to a formal evening event.",
    },
    {
      id: 2,
      title: "5 Ways to Style Your New Denim Jacket",
      excerpt: "From casual weekends to chic evenings, unlock the versatility of this timeless wardrobe staple.",
      date: "Sep 28, 2025",
      readTime: "4 min read",
      imageUrl: "https://picsum.photos/seed/denimstyle/600/400",
      fullContent:
        "The denim jacket is more than just a piece of clothing; it's a canvas for your personal style. Pair it with a floral dress for a soft, feminine look, or go for an edgy vibe with black jeans and combat boots. We'll show you five curated outfits that prove a simple denim jacket can be the most versatile item in your closet.",
    },
    {
      id: 3,
      title: "Sneaker Spotlight: The Top Kicks of the Season",
      excerpt: "Check out the latest sneaker drops that combine comfort, style, and cutting-edge design.",
      date: "Sep 22, 2025",
      readTime: "3 min read",
      imageUrl: "https://picsum.photos/seed/sneakers/600/400",
      fullContent:
        "Comfort is king, but style is everything. This season's top sneakers deliver both. From retro-inspired designs making a huge comeback to futuristic, minimalist silhouettes, there's a pair for every taste. We'll give you a closer look at the materials, technology, and style notes for the sneakers everyone is talking about right now.",
    },
    {
      id: 4,
      title: "How to Choose Eco-Friendly and Sustainable Brands",
      excerpt: "Make your wardrobe greener with our tips for conscious and responsible shopping.",
      date: "Sep 15, 2025",
      readTime: "6 min read",
      imageUrl: "https://picsum.photos/seed/ecofriendly/600/400",
      fullContent:
        "Sustainable fashion is the future. But what does it really mean to shop consciously? This article helps you understand materials to look for, certifications that matter, and questions to ask before you buy. Learn how to build a stylish, long-lasting wardrobe that's kinder to our planet.",
    },
    {
      id: 5,
      title: "Accessorize Like a Pro: The Finishing Touches",
      excerpt: "Learn how the right accessories can elevate any outfit from simple to spectacular.",
      date: "Sep 05, 2025",
      readTime: "4 min read",
      imageUrl: "https://picsum.photos/seed/accessories/600/400",
      fullContent:
        "Accessories are the secret weapon of the stylish. A statement necklace, a silk scarf, or a classic leather belt can completely transform your look. We explore the art of layering jewelry, choosing the right handbag, and how to use accessories to express your unique personality.",
    },
    {
      id: 6,
      title: "Get Ready: Our Annual Winter Sale is Coming!",
      excerpt: "A sneak peek at the incredible deals and collections that will be featured in our biggest sale of the year.",
      date: "Aug 29, 2025",
      readTime: "2 min read",
      imageUrl: "https://picsum.photos/seed/sale/600/400",
      fullContent:
        "Mark your calendars! Our annual winter sale is just around the corner, and it's bigger than ever. Expect massive discounts on last season's favorites, exclusive bundles, and special offers on new arrivals. Get your wishlist ready and prepare to snag the best deals on coats, sweaters, and more!",
    },
  ];

  const handleReadMoreClick = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Page Heading */}
        <header className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-stone-900 tracking-tight drop-shadow-sm">
            The Style Hub
          </h1>
          <p className="text-lg text-stone-600 mt-4 max-w-xl mx-auto">
            Your daily dose of fashion tips, trends & inspiration.
          </p>
        </header>

        {/* Blog Grid */}
        <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-stone-200 overflow-hidden 
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6 flex flex-col flex-grow">

                {/* Date + Read time */}
                <div className="flex justify-between items-center text-sm text-stone-500 mb-4">
                  <span>{post.date}</span>
                  <span className="bg-stone-100 px-3 py-1 rounded-full">
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-stone-900 mb-3 group-hover:text-teal-600">
                  {post.title}
                </h2>

                <p className="text-stone-600 leading-relaxed">{post.excerpt}</p>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    expandedPostId === post.id
                      ? "max-h-[500px] opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-stone-700 border-t border-stone-200 pt-4 leading-relaxed">
                    {post.fullContent}
                  </p>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleReadMoreClick(post.id)}
                  className="mt-6 text-teal-600 font-semibold hover:text-teal-700 transition-all duration-300 flex items-center gap-2"
                >
                  {expandedPostId === post.id ? "Read Less" : "Read More"}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      expandedPostId === post.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      
    </div>
  );
};

export default Blog;
