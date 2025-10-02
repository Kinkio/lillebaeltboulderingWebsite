---
# Jekyll will process this file and replace environment variables
---
// Configuration for waiver form
window.LillebaeltConfig = {
    WAIVER_SCRIPT_URL: '{% if jekyll.environment == "production" %}{{ site.env.WAIVER_SCRIPT_URL | default: "" }}{% else %}{% endif %}'
};
