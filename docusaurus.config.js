/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Yohan',
  tagline: 'Welcome to my blog.',
  url: 'https://yohan-ko.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'yohanko1',
  projectName: 'yohanko1.github.io',
  themeConfig: {
    navbar: {
      title: 'About',
      logo: {
        alt: 'Yohan Ko',
        src: 'img/bear.png',
      },
      items: [
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
    },
    googleAnalytics: {
      trackingID: 'UA-198032639-1',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
