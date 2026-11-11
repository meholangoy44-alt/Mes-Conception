export const CAMPAIGN_IMAGES = {
  hero: '/src/assets/images/hero_kinshasa_traffic_1794402839872.jpg',
  moto: '/src/assets/images/moto_wewa_helmet_1794402840165.jpg',
  camion: '/src/assets/images/poids_lourd_blindspot_1794402841150.jpg',
  studio: '/src/assets/images/safety_production_studio_1794402841512.jpg',
  testimony_moto: '/src/assets/images/testimony_moto_rider_1794403013400.jpg',
  testimony_truck: '/src/assets/images/testimony_truck_driver_1794403015277.jpg',
  expert_safety: '/src/assets/images/expert_safety_inspector_1794403013913.jpg',
} as const;

export type ImageKey = keyof typeof CAMPAIGN_IMAGES;

export function getImagePath(key: string): string {
  if (key in CAMPAIGN_IMAGES) {
    return CAMPAIGN_IMAGES[key as ImageKey];
  }
  return CAMPAIGN_IMAGES.hero;
}
