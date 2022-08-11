import { newE2EPage } from '@stencil/core/testing';

describe('publish-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<publish-notification></publish-notification>');

    const element = await page.find('publish-notification');
    expect(element).toHaveClass('hydrated');
  });
});
