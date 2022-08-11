import { newSpecPage } from '@stencil/core/testing';
import { SubscribeNotification } from '../subscribe-notification';

describe('subscribe-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SubscribeNotification],
      html: `<subscribe-notification></subscribe-notification>`,
    });
    expect(page.root).toEqualHtml(`
      <subscribe-notification>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </subscribe-notification>
    `);
  });
});
