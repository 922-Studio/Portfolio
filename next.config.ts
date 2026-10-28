import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/de',
        // temporary on purpose: browsers cache permanent redirects for good
        permanent: false,
      },
    ];
  },
});
