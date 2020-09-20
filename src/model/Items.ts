import rawSearchData from "../assets/mini-item-search-data.json";

type ItemNameMap = Map<string, number>;
type ItemIdMap = Map<number, string>;

class Items {
  private itemNameMap: ItemNameMap = new Map([]);
  private itemIdMap: ItemIdMap = new Map([]);

  constructor(rawData: Record<number, string>) {
    Object.entries(rawData).forEach(([id, name]) => {
      const itemId = parseInt(id, 10);

      if (!this.itemNameMap.get(name)) {
        this.itemNameMap.set(name, itemId);
      }
      this.itemIdMap.set(itemId, name);
    });
  }

  getName = (search: number): string => this.itemIdMap.get(search) || `Item not found: ${search}`;

  getId = (search: string): number => {
    const found = this.itemNameMap.get(search);
    if (found) return found;
    console.error(`${search} not found, check your spelling or that the item exists`);
    return 0;
  };

  get = (search: number | string) => (typeof search === "string" ? this.getId(search) : search);
}

export const itemSearchData = new Items(rawSearchData);
