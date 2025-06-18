export type CartItems = {
  [itemId: string]: {
    [size: string]: number;
  };
};