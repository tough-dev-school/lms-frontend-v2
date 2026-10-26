const DASHES = /-/g;
const UUID_PARTS = /(.{8})(.{4})(.{4})(.{4})(.{12})/;

const idToUuid = (id: string) => {
  return id.replace(DASHES, '').replace(UUID_PARTS, '$1-$2-$3-$4-$5');
};

export default idToUuid;
