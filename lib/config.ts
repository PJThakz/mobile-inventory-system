// Central place for shop details and display settings.
// Change things here instead of hunting through components.

export const SHOP = {
  name: "UNIVERSAL XPORTS LTD.",
  // While this still contains "XXX" the address line is hidden from the site.
  address: "Shop No. XXX, 1st Floor, Chung King Mansions, Tsim Sha Tsui, Hong Kong",
  callNumber: "+85262714580",
  callDisplay: "+852 6271 4580",
  whatsappNumber: "85298022538",
  priceNote: "Prices change daily. Please confirm on WhatsApp before ordering.",
};

// false = customers only see In Stock / Low Stock / Out of Stock.
// true  = the exact unit count is also sent to the browser and shown.
export const SHOW_STOCK_COUNT = false;

// Stock at or below this number (but above 0) is labelled "Low Stock".
export const LOW_STOCK_THRESHOLD = 5;

// Keep in sync with images.remotePatterns in next.config.ts.
// Images from any other host still work, they just skip Next's image optimiser.
export const OPTIMIZED_IMAGE_HOSTS = [
  "store.storeimages.cdn-apple.com",
  "www.apple.com",
  "images.samsung.com",
  "fdn2.gsmarena.com",
  "m.media-amazon.com",
];

export function whatsappLink(message: string) {
  return `https://wa.me/${SHOP.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
