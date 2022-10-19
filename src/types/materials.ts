export type MaterialContentBlockId = string;
export type MaterialContentBlock = {
  value: {
    id: MaterialContentBlockId;
  };
};
export type MaterialContentBlocks = {
  [k: MaterialContentBlockId]: MaterialContentBlock;
};
