import { newSpecPage } from '@stencil/core/testing';
import { PublishNotification } from '../publish-notification';

describe('publish-notification', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PublishNotification],
      html: `<publish-notification></publish-notification>`,
    });
    expect(page.root).toEqualHtml(`
      <publish-notification>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </publish-notification>
    `);
  });
});
