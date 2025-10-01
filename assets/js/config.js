---
# Jekyll will process this file and replace environment variables
---
// Configuration for form handlers
window.LillebaeltConfig = {
    GOOGLE_SCRIPT_URL: '{% if jekyll.environment == "production" %}{{ site.env.GOOGLE_SCRIPT_URL | default: "" }}{% else %}YOUR_GOOGLE_APPS_SCRIPT_URL{% endif %}',
};
