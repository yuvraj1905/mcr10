import { inventoryData } from "../data";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "dataSetter": {
      return { ...state, data: [...inventoryData] };
    }

    case "setFilter": {
      return { ...state, filter: payload };
    }

    case "includeLowStockItemSetter": {
      return { ...state, includeLowStockItem: payload };
    }

    case "newObjAdder": {
      return { ...state, data: [...state.data, { ...payload }] };
    }

    case "sortBySetter": {
      return { ...state, sortBy: payload };
    }

    default:
      return { ...state };
  }
};
