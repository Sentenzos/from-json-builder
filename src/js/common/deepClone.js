const deepClone = (aObject) => {
  if (!aObject) {
    return aObject;
  }
  let value;
  let bObject = Array.isArray(aObject) ? [] : {};

  for (const key in aObject) {
    value = aObject[key];
    bObject[key] = (typeof value === "object") ? deepClone(value) : value;
  }

  return bObject;
};

export default deepClone;