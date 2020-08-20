import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        notes: []
    },
    getters: {
        getNotes: (state) => state.notes
    },
    mutations: {
        setNotes (state, payload) {
            state.notes = payload
        }
    },
    actions: {
        fetchNotes({ commit }) {
            commit('setNotes', JSON.parse(localStorage.getItem('personalNotes')) || [])
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
        }
    }
})
