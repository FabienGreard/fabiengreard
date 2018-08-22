const seo = require('../../utils/seo');

describe('SEO', () => {
  test('Should create a robots.txt', async () => {
    expect(await seo.genRobots('protected', 'robots.txt')).toEqual(
      'robots.txt has been saved'
    );
  });
  test('Should create a sitemap.xml', async () => {
    expect(await seo.genSitemap('routes', 'sitemap.xml')).toEqual(
      'sitemap.xml has been saved'
    );
  });
  test('Should return an error', async () => {
    try {
      await seo.genSitemap('routes', './nomatch/nomatch.txt');
    } catch (e) {
      expect(e.code).toEqual('ENOENT');
    }
  });
});
