export function FeatureList({ features = [] as string[] }) {
  return <ul className="features">{features.map((f,i)=> <li key={i}>{f}</li>)}</ul>;
}
