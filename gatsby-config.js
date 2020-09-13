const path = require('path')
//path: `.env.${process.env.NODE_ENV}`
require('dotenv').config({
  path: `.env`
})

module.exports = {
  siteMetadata: {
    title: `Spin And Destroy`,
    description: `Raves, Warehouse parties, underground or out in the open, we do the hardwork for the EDM Bass culture. Hit us up for events, promotions, or for a good time. Stop by our online shop and get some merch.`,
    author: `@bass2neck`,
    siteUrl: 'https://www.spinanddestroy.com'
  },
  plugins: [
  {
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `flyers`,
    path: `${__dirname}/content/flyers`,
      },
    },
    {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
        host: 'https://www.spinanddestroy.com',
        sitemap: 'https://www.spinanddestroy.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `resources/icons/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop. This is required.
        // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
        // 'gatsby-source-shopify-test-shop.myshopify.com'.
        shopName: 'spinanddestroy',

        // An API access token to your Shopify shop. This is required.
        // You can generate an access token in the "Manage private apps" section
        // of your shop's Apps settings. In the Storefront API section, be sure
        // to select "Allow this app to access your storefront data using the
        // Storefront API".
        // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
        accessToken: 'a1e9eaa0c3e77fd120a45809313c8b2f',

        // Set verbose to true to display a verbose output on `npm run develop`
        // or `npm run build`. This prints which nodes are being fetched and how
        // much time was required to fetch and process the data.
        // Defaults to true.
        verbose: true,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src/'),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-134421805-1",
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '236182074133679',
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
