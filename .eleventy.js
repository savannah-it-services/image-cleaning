const path = require('path');

module.exports = function (eleventyConfig) {
  // Passthrough static assets (images, fonts, etc.)
  eleventyConfig.addPassthroughCopy({
    'src/assets/images': 'assets/images',
    'src/assets/js': 'assets/js',
    'src/assets/css': 'assets/css', // for any non-tailwind or fallbacks
    'src/robots.txt': 'robots.txt',
  });

  // Add a collection for navigation (useful for sitemap too)
  eleventyConfig.addCollection('navPages', function (collectionApi) {
    return collectionApi
      .getFilteredByTag('page')
      .sort((a, b) => (a.data.navOrder || 99) - (b.data.navOrder || 99));
  });

  // Global data helpers
  eleventyConfig.addGlobalData('year', () => new Date().getFullYear());

  // Simple filter for formatting phone in templates if needed
  eleventyConfig.addFilter('phoneHref', (phone) => {
    if (!phone) return '#';
    return 'tel:' + phone.replace(/[^0-9]/g, '');
  });

  // Absolute URL helper for SEO (full https URLs for canonicals, OG, JSON-LD etc.)
  // For GitHub Pages subpath deployments, update site.url in src/_data/site.json
  eleventyConfig.addFilter('absoluteUrl', function (url, base) {
    const baseUrl = base || 'https://savannah-it-services.github.io/image-cleaning';
    if (!url) return baseUrl;
    if (url.startsWith('http')) return url;
    return baseUrl.replace(/\/$/, '') + (url.startsWith('/') ? '' : '/') + url;
  });

  // Eleventy config
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data',
    },
    templateFormats: ['njk', 'html', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    // Important for GitHub Pages project sites (e.g. /image-cleaning/)
    // This makes the built-in `url` filter prefix all root-absolute paths correctly.
    pathPrefix: '/image-cleaning/',
  };
};
