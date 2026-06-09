import { v4 as uuid } from "uuid";

const groupConsecutiveTickItems = (blocks = []) => {
  const transformedBlocks = [];
  let tickItemGroup = [];

  const flushTickItemGroup = () => {
    if (tickItemGroup.length === 1) {
      transformedBlocks.push(tickItemGroup[0]);
    }

    if (tickItemGroup.length > 1) {
  transformedBlocks.push({
    name: "next/tick-item-list",
    attributes: {},
    innerBlocks: tickItemGroup.map((tickItem) => ({
      ...tickItem,
      as: "li",
    })),
  });
}

    tickItemGroup = [];
  };

  blocks.forEach((block) => {
    if (block.name === "acf/tick-item") {
      tickItemGroup.push(block);
      return;
    }

    flushTickItemGroup();

    if (block.innerBlocks?.length) {
      block.innerBlocks = groupConsecutiveTickItems(block.innerBlocks);
    }

    transformedBlocks.push(block);
  });

  flushTickItemGroup();

  return transformedBlocks;
};

export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));

  const groupedBlocks = groupConsecutiveTickItems(blocks);

  const assignIds = (b) => {
    b.forEach((block) => {
      block.id = uuid();

      if (block.innerBlocks?.length) {
        assignIds(block.innerBlocks);
      }
    });
  };

  assignIds(groupedBlocks);

  return groupedBlocks;
};