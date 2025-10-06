// LowDataSite is deprecated. Low-data mode reuses the standard layout with lighter styling.
export default function LowDataSite() {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[LowDataSite] This component is deprecated and returns null.');
  }
  return null;
}
