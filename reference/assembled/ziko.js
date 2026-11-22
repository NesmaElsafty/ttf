document.addEventListener('DOMContentLoaded', function() {

    const RTL_REGEX = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    const WIDGET_SELECTOR = 'n8nchatui-popup';

    // Helper: Apply styles INSIDE the Shadow DOM
    function applyShadowStyles(shadowRoot, direction) {
        let styleTag = shadowRoot.getElementById('dynamic-rtl-styles');
        
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-rtl-styles';
            shadowRoot.appendChild(styleTag);
        }

        if (direction === 'rtl') {
            styleTag.innerHTML = `
                .chatbot-host-bubble {
                    direction: rtl !important;
                    text-align: right !important;
                }
                textarea {
                    direction: rtl !important;
                    text-align: right !important;
                }
            `;
        } else {
            styleTag.innerHTML = `
                .chatbot-host-bubble {
                    direction: ltr !important;
                    text-align: left !important;
                }
                textarea {
                    direction: ltr !important;
                    text-align: left !important;
                }
            `;
        }
    }

    // Main logic to find the widget and attach listeners
    function initWidgetObserver() {
        const widgetHost = document.querySelector(WIDGET_SELECTOR);

        // If widget isn't in DOM yet, retry shortly
        if (!widgetHost || !widgetHost.shadowRoot) {
            setTimeout(initWidgetObserver, 500);
            return;
        }

        const shadow = widgetHost.shadowRoot;

        // Observer: watches for the chat window to be opened/rendered inside the shadow root
        const shadowObserver = new MutationObserver((mutations) => {
            const textarea = shadow.querySelector('textarea');

            // If we found the textarea and haven't attached our listener yet
            if (textarea && !textarea.dataset.rtlListenerAttached) {
                
                textarea.dataset.rtlListenerAttached = "true"; // Prevent duplicate listeners

                textarea.addEventListener('input', (e) => {
                    const text = e.target.value;
                    if (!text) return;

                    const isRTL = RTL_REGEX.test(text);
                    const currentDir = textarea.dataset.dir;

                    if (isRTL && currentDir !== 'rtl') {
                        applyShadowStyles(shadow, 'rtl');
                        textarea.dataset.dir = 'rtl';
                    } else if (!isRTL && currentDir !== 'ltr') {
                        applyShadowStyles(shadow, 'ltr');
                        textarea.dataset.dir = 'ltr';
                    }
                });
            }
        });

        // Start observing the Shadow DOM
        shadowObserver.observe(shadow, { childList: true, subtree: true });
    }

    // Start the process
    initWidgetObserver();
});