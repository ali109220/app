// Single source of truth for the deployed site's canonical origin.
// tayseer.me isn't cut over to this deployment yet (DNS/hosting not
// configured), so canonicals/sitemap/robots point at the live Cloudflare
// Pages domain for now. Swap this back to SITE_URL once the
// real domain is pointed at this deployment — nothing else needs to change.
export const SITE_URL = "https://tayseerdemo.xyz";
