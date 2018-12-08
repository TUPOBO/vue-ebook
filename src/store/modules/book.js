const book = {
  state: {
    test: 10
  },
  mutations: {
    SET_TEST: (state, newTest) => {
      state.test = newTest
    }
  },
  actions: {
    setTest: ({ commit, state }, newTest) => {
      return commit('SET_TEST', newTest)
    }
  }
}

export default book
