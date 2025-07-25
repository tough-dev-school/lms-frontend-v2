export type Dictionary<T> = Record<string, T>;

export default function filterDictionary<T>(
  inputDictionary: Dictionary<T>,
  filterFunction: (value: T, key: string) => boolean,
): Dictionary<T> {
  const outDict: Dictionary<T> = {};
  for (const k of Object.keys(inputDictionary)) {
    const thisValue = inputDictionary[k];
    if (filterFunction(thisValue, k)) {outDict[k] = thisValue;}
  }
  return outDict;
}
