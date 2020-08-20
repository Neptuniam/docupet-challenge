<template>
<div v-if="notes !== null" class="">
    <h1 class="uk-h1">
        Personal Notes ({{ notes.length }}<span v-if="notes.length !== getNotes.length"> / {{getNotes.length}}</span>)
    </h1>

    <div class="spacer"></div>

    <div class="row bottom-xs fullWidth">
        <div class="col-xs-12 col-md-4">
            <custom-input :value.sync="searchKey" placeholder="Search Tags" clearable />
        </div>

        <div class="col-xs-12 col-md-8 first-xs last-md end-xs">
            <custom-button colour="text" label="New Note +" :click="() => openNote(0)" />
        </div>
    </div>

    <div v-if="notes.length" class="row fullWidth">
        <div v-for="note in notes" :key="note.id" class="col-xs-12 col-sm-6 col-md-4 noteContainer">
            <div class="uk-card uk-card-default uk-card-body uk-box-shadow-hover-large roundEdge clickable" @click="openNote(note.id)">
                <h3 class="uk-card-title">
                    {{ note.title }}
                </h3>

                <p>
                    {{ note.body }}
                </p>

                <div class="tags">
                    <span style="font-weight: 600">Tags</span>: {{note.tags}}
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="notes !== null" class="emptyList center-xs">
        <div class="spacer" />
        No Notes Found
    </div>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
    computed: {
        notes() {
            if (this.searchKey)
                // Filter by all notes that include the searchKey in a tag even as a substring
                return this.getNotes.filter(note => !!note.tags.split(/,/g).find(tag => tag.includes(this.searchKey)))
            return this.getNotes
        },

        searchKey: {
            get() {
                return this.getSearchKey
            },
            set(val) {
                this.setSearchKey(val)
            }
        },

        ...mapGetters([ 'getNotes', 'getSearchKey' ])
    },

    methods: {
        addNote() {
            this.$router.push({
                name: 'note',
                params: {
                    id: 0
                }
            })
        },

        openNote(noteId) {
            this.$router.push({
                name: 'note',
                params: {
                    id: noteId
                }
            })
        },

        ...mapMutations(['setNotes', 'setSearchKey'])
    },
}
</script>

<style scoped>
    .col-xs-4 {
        /* min-width: 300px; */
        /* max-width: 300px; */
    }

    .noteContainer {
        padding: 10px;
    }

    .uk-card {
        height: 100%;
        padding: 10px 20px !important;
    }

    .uk-card .uk-card-title {
        font-size: 28px;
    }
    .uk-card p {
        font-size: 18px;
        height: 81px;

        overflow: hidden;
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical !important;
    }
    .uk-card .tags {
        font-size: 14px;
    }

    .emptyList {
        font-size: 25px;
        font-weight: 600;
    }
</style>
