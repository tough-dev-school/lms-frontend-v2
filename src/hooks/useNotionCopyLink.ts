import { onMounted, onUnmounted, createVNode, render } from 'vue';
import { LinkIcon, CheckIcon } from 'vue-tabler-icons';

type Listener = {
  element: Element;
  iconContainer: HTMLElement;
  originalIcon: ReturnType<typeof createVNode>;
  checkIcon: ReturnType<typeof createVNode>;
};

export const useNotionCopyLink = (selector: string) => {
  const listeners: Listener[] = [];

  const toggleIcon = (
    iconContainer: HTMLElement,
    icon: ReturnType<typeof createVNode>,
  ) => {
    render(null, iconContainer);
    render(icon, iconContainer);
  };

  const showCheckIcon = (listener: Listener) => {
    toggleIcon(listener.iconContainer, listener.checkIcon);
    setTimeout(
      () => toggleIcon(listener.iconContainer, listener.originalIcon),
      1000,
    );
  };

  const copyToClipboard = async (text: string, listener: Listener) => {
    try {
      await navigator.clipboard.writeText(text);
      showCheckIcon(listener);
      window.location.hash = text.split('#')[1];
    } catch (err) {
      console.error('Ошибка при копировании текста: ', err);
    }
  };

  const setupIcon = (element: Element) => {
    const iconContainer = document.createElement('span');
    iconContainer.className = 'notion-copy-link-container opacity-0';
    element.appendChild(iconContainer);

    const originalIcon = createVNode(LinkIcon, {
      class: 'copy-icon',
      onClick: async (e: MouseEvent) => {
        e.stopPropagation();
        const elementId = element.getAttribute('id');
        if (elementId) {
          const fullUrl = `${window.location.href.split('#')[0]}#${elementId}`;
          await copyToClipboard(fullUrl, {
            element,
            iconContainer,
            originalIcon,
            checkIcon,
          });
        }
      },
    });

    const checkIcon = createVNode(CheckIcon, { class: 'copy-icon' });

    render(originalIcon, iconContainer);

    element.addEventListener('mouseenter', () =>
      iconContainer.classList.remove('opacity-0'),
    );
    element.addEventListener('mouseleave', () =>
      iconContainer.classList.add('opacity-0'),
    );

    return { iconContainer, originalIcon, checkIcon };
  };

  const addClickListener = () => {
    document.querySelectorAll(selector).forEach((element) => {
      const { iconContainer, originalIcon, checkIcon } = setupIcon(element);
      listeners.push({ element, iconContainer, originalIcon, checkIcon });
    });
  };

  const removeClickListeners = () => {
    listeners.forEach(({ element, iconContainer }) => {
      render(null, iconContainer);
      element.removeChild(iconContainer);
    });
  };

  onMounted(addClickListener);
  onUnmounted(removeClickListeners);
};
