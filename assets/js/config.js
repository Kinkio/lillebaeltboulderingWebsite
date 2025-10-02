---
# Jekyll will process this file and replace environment variables
---
// Configuration for waiver form
// Debug: JEKYLL_ENV = {{ jekyll.environment }}
// Debug: WAIVER_SCRIPT_URL = {{ site.env.WAIVER_SCRIPT_URL }}
window.LillebaeltConfig = {
    WAIVER_SCRIPT_URL: '{% if jekyll.environment == "production" %}{{ site.env.WAIVER_SCRIPT_URL | default: "" }}{% else %}{% endif %}',
    DEBUG_INFO: {
        environment: '{{ jekyll.environment }}',
        hasSecret: '{% if site.env.WAIVER_SCRIPT_URL %}true{% else %}false{% endif %}'
    }
};
