import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        notes: null,

        searchKey: null
    },
    getters: {
        getNotes: (state) => state.notes,
        getSearchKey: (state) => state.searchKey
    },
    mutations: {
        setNotes (state, payload) {
            state.notes = payload
        },

        setSearchKey(state, payload) {
            state.searchKey = payload
        }
    },
    actions: {
        fetchNotes({ commit }) {
            const notes = JSON.parse(localStorage.getItem('personalNotes')) || []
            commit('setNotes', notes)
        },

        saveNotes({ commit }, payload) {
            commit('setNotes', payload)
            localStorage.setItem('personalNotes', JSON.stringify(payload))
        },

        saveNote({ commit, getters }, payload) {
            var notes = getters.getNotes

            // If the id has not been set, now that the user is saving the note,
            // generate a unique id for the note (generally this would be done by the database for us)
            if (payload.id == 0) {
                payload.id = new Date().getTime()
                notes.push(payload)
            }

            commit('setNotes', notes)
            localStorage.setItem('personalNotes', JSON.stringify(notes))
        },

        deleteNote({ getters, dispatch }, payload) {
            const index = getters.getNotes.findIndex(note => note.id == payload.id)

            getters.getNotes.splice(index, 1)

            dispatch('saveNotes', getters.getNotes)
        }
    }
})
