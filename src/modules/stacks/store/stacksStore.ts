import { defineStore } from "pinia";

export const useStacksStore = defineStore("stacks", {
  state: () => ({
    page: 1,
    limit: 8,
    search: "",
    types: "all" as string | number,
    sortedBy: "createdAt",

    // UI effects
    glowingEffectIDs: [] as Array<number | string>,
    fadingEffectIDs: [] as Array<number | string>,
  }),
  persist: {
    paths: ["page", "limit", "search", "types", "sortedBy"],
  },
  actions: {
    setPage(page: number) {
      this.page = page;
    },

    setSearch(search: string) {
      this.search = search;
    },

    setTypes(types: number | string) {
      this.types = types;
    },

    setLimit(limit: number) {
      this.limit = limit;
    },

    setSortedBy(sortedBy: string) {
      this.sortedBy = sortedBy;
    },

    // UI effects
    glowEffect(stackId: number | string) {
      if (this.glowingEffectIDs.includes(stackId)) return;

      this.glowingEffectIDs.push(stackId);

      setTimeout(() => {
        this.glowingEffectIDs = this.glowingEffectIDs.filter(
          (id) => id !== stackId,
        );
      }, 2500);
    },

    fadeEffect(stackId: number) {
      if (this.fadingEffectIDs.includes(stackId)) return;

      this.fadingEffectIDs.push(stackId);

      setTimeout(() => {
        this.fadingEffectIDs = this.fadingEffectIDs.filter(
          (id) => id !== stackId,
        );
      }, 2500);
    },
  },
});
