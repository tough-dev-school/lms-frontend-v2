// @vitest-environment node
import { describe, expect, test } from 'vitest';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import VMaterialView from './VMaterialView.vue';
import { createAppI18n } from '@/i18n';
import { mockNotionMaterial } from '@/mocks/mockNotionMaterial';
import { BREADCRUMBS, MATERIAL } from '@/mocks/courses';
import { setPage } from '@/mocks/inertia';
import { STAFF } from '@/mocks/users';

// The server renders materials for real, any browser API reached during setup breaks the page
const renderOnServer = (props: InstanceType<typeof VMaterialView>['$props']) =>
  renderToString(
    createSSRApp({ render: () => h(VMaterialView, props) }).use(
      createAppI18n('ru'),
    ),
  );

describe('VMaterialView on the server', () => {
  test('renders the Notion content', async () => {
    const html = await renderOnServer({
      materialId: MATERIAL.id,
      material: { breadcrumbs: BREADCRUMBS, content: mockNotionMaterial() },
      materialStatus: null,
    });

    expect(html).toContain('notion');
    expect(html).toContain(BREADCRUMBS.module?.name);
  });

  test('renders the update panel for staff', async () => {
    setPage({ props: { user: STAFF } });

    const html = await renderOnServer({
      materialId: MATERIAL.id,
      material: { breadcrumbs: BREADCRUMBS, content: mockNotionMaterial() },
      materialStatus: {
        fetch_started: '2025-11-12T08:30:12Z',
        fetch_complete: '2025-11-12T08:30:19Z',
      },
    });

    // Local time in the mock's Moscow timezone
    expect(html).toContain('12.11.2025 11:30:19');
  });
});
