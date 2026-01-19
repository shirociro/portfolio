import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    page: 1,
    limit: 8,
    search: "",
    position: "all" as string | number,
    sortedBy: "createdAt",

    // UI effects
    glowingEffectIDs: [] as Array<number | string>,
    fadingEffectIDs: [] as Array<number | string>,
  }),
  persist: {
    paths: ["page", "limit", "search", "position", "sortedBy"],
  },
  actions: {
    setPage(page: number) {
      this.page = page;
    },

    setSearch(search: string) {
      this.search = search;
    },

    setPosition(position: number | string) {
      this.position = position;
    },

    setLimit(limit: number) {
      this.limit = limit;
    },

    setSortedBy(sortedBy: string) {
      this.sortedBy = sortedBy;
    },

    // UI effects
    glowEffect(userId: number | string) {
      if (this.glowingEffectIDs.includes(userId)) return;

      this.glowingEffectIDs.push(userId);

      setTimeout(() => {
        this.glowingEffectIDs = this.glowingEffectIDs.filter(
          (id) => id !== userId,
        );
      }, 2500);
    },

    fadeEffect(userId: number) {
      if (this.fadingEffectIDs.includes(userId)) return;

      this.fadingEffectIDs.push(userId);

      setTimeout(() => {
        this.fadingEffectIDs = this.fadingEffectIDs.filter(
          (id) => id !== userId,
        );
      }, 2500);
    },
  },
});
