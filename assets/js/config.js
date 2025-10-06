---
# Jekyll will process this file and replace environment variables
---
// Configuration for waiver form
window.LillebaeltConfig = {
    WAIVER_SCRIPT_URL: '{{ site.env.WAIVER_SCRIPT_URL | default: "https://script.google.com/macros/s/AKfycbwVdaCC95Fwru8FJ0ywMczEE9a1WhMawicNFfv6qZLoHWy1tI8roOS7gNEPU1Dj7kZq/exec" }}',
    DEBUG_INFO: {
        environment: '{{ jekyll.environment }}',
        hasSecret: '{% if site.env.WAIVER_SCRIPT_URL and site.env.WAIVER_SCRIPT_URL != "" %}true{% else %}false{% endif %}',
        secretValue: '{{ site.env.WAIVER_SCRIPT_URL | slice: 0, 20 }}...'
    }
};
