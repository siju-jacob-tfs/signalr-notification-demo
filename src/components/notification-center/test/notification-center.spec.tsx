import { newSpecPage } from '@stencil/core/testing';
import { NotificationCenter } from '../notification-center';

describe('notification-center', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NotificationCenter],
      html: `<notification-center></notification-center>`,
    });
    expect(page.root).toEqualHtml(`
      <notification-center>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </notification-center>
    `);
  });
});
