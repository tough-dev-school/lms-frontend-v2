const idToUuid = (id: string) => {
  return id
    .replace(/-/g, '')
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
};

export default idToUuid;
