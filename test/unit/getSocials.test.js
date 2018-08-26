const getSocials = require('../../utils/getSocials');

describe('getSocials', () => {
  it('Should return an array of socials', () => {
    const _socials = {
      linkedin: 'no_url'
    };
    const socials = getSocials(_socials);
    expect(socials).toEqual([{ name: 'linkedin', url: 'no_url' }]);
  });
  it('Should filter socials', () => {
    const _socials = {
      linkedin: null,
      facebook: 0,
      codepen: '',
      twitter: false,
      github: 'no_url'
    };
    const socials = getSocials(_socials);
    expect(socials).toEqual([{ name: 'github', url: 'no_url' }]);
  });
  it('Should not find any socials', () => {
    const _socials = {};
    const socials = getSocials(_socials);
    expect(socials).toEqual([]);
  });
});
