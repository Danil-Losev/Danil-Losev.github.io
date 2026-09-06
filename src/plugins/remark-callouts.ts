import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

const CALLOUT_TYPES = new Set([
  'note',
  'tip',
  'warning',
  'danger',
]);

export default function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, 'containerDirective', (node) => {
      const directive = node as unknown as {
        name: string;
        data?: Record<string, unknown>;
      };

      if (!CALLOUT_TYPES.has(directive.name)) {
        return;
      }

      const data = (directive.data ??= {});

      data.hName = 'aside';

      data.hProperties = {
        className: [
          'callout',
          `callout-${directive.name}`,
        ],
      };
    });
  };
}