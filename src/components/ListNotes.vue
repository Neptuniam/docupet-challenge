<template>
<div class="">
    <h1 class="uk-h1">
        Notes
    </h1>

    <div class="row bottom-xs fullWidth">
        <div class="col-xs-12 col-md-4">
            <custom-input :value.sync="searchKey" placeholder="Search Tags" />
        </div>

        <div class="col-xs end-md">
            <button class="uk-button uk-button-text" @click="addNote">
                New Note +
            </button>
        </div>
    </div>

    <div class="row fullWidth">
        <div v-for="note in notes" :key="note.id" class="col-xs-12 col-md-6 col-lg-4 noteContainer">
            <div class="uk-card uk-card-default uk-card-body uk-box-shadow-hover-large clickable" @click="openNote(note)">
                <h3 class="uk-card-title">
                    {{ note.title }}
                </h3>

                <p>
                    {{ note.body }}
                </p>

                <div class="tags">
                    Tags: {{note.tags}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
    data() {
        return {
            searchKey: null
        }
    },

    computed: {
        notes() {
            if (this.searchKey)
                return this.getNotes.filter(note => note && note.tags.includes(this.searchKey))
            return this.getNotes
        },

        ...mapGetters([ 'getNotes' ])
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

        openNote(note) {
            this.$router.push({
                name: 'note',
                params: {
                    id: note.id
                }
            })
        },

        ...mapMutations(['setNotes'])
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
        font-size: 24px;
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
</style>
