import { newE2EPage } from '@stencil/core/testing';

describe('subscribe-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<subscribe-notification></subscribe-notification>');

    const element = await page.find('subscribe-notification');
    expect(element).toHaveClass('hydrated');
  });
});
