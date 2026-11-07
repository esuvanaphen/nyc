// Favourites storage: the only place that knows where saved places live.
// Now: localStorage (per browser). Later: swap the two functions for the artifact's shared
// database so favourites sync between laptop and phone. Callers only use getFavs/setFavs.
(function () {
  const KEY = 'nyc-eats-favs';
  let memory = [];  // fallback when storage is blocked (private window, preview)

  function getFavs() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : memory.slice();
    } catch (e) {
      return memory.slice();
    }
  }

  function setFavs(ids) {
    memory = ids.slice();
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch (e) { /* keep in memory only */ }
  }

  window.Favs = { getFavs, setFavs };
})();
