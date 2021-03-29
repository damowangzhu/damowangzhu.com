import { createStore as _createStore } from 'vuex';

// import { getBookmarks } from '@/api/index';

export default function createStore() {
  return _createStore({
    state: {
      message: 'Hello vite vue',
      searchResults: []
    },
    mutations: {},
    actions: {
      fetchMessage: ({ state }) => {
        console.log('fetch message ...');
        return new Promise((resolve) => {
          setTimeout(() => {
            state.message = 'vite + store + typescript';
            resolve(0);
          }, 200);
        });
      }
    },
    modules: {}
  });
}
