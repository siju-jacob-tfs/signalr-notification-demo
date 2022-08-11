import { newE2EPage } from '@stencil/core/testing';

describe('notification-center', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<notification-center></notification-center>');

    const element = await page.find('notification-center');
    expect(element).toHaveClass('hydrated');
  });
});
