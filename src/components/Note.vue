<template>
<div v-if="note" class="">
    <div class="uk-card uk-card-default uk-card-body">
        <h1 class="uk-card-title">
            {{ note.id ? 'Edit' : 'New' }} Note
        </h1>

        <custom-input :value.sync="note.title" placeholder="Title *" />

        <div class="spacer"></div>

        <custom-input :value.sync="note.body" placeholder="Body" type="textarea" />

        <div class="spacer"></div>

        <custom-input :value.sync="note.tags" placeholder="Tags" />
        <div class="WhatIsThis" uk-tooltip="Include comma-deliminated key words to search for on the main page in order to make finding notes easier">
            What Is this?
        </div>

        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="spacer"></div>

        <div class="row fullWidth noMargin around-xs">
            <button class="col-xs-5 uk-button uk-button-secondary roundEdge" @click="goBack">
                Cancel
            </button>

            <button class="col-xs-5 uk-button uk-button-primary roundEdge" @click="saveAction">
                Save
            </button>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['id'],

    data() {
        return {
            // Generate new notes here so Vue can set up setters and getters for us
            emptyNote: {
                // I would normally use 0 to signify it's new
                id: 0,
                title: null,
                body: null,
                tags: ''
            }
        }
    },

    computed: {
        /*
            We could pass the entire note object through the store,
            but including the id in the path has several pros:
             * it allows the user to bookmark specific notes,
             * refresh the page without the need for persistence storage,
             * and improves reliablity that it's up to date with the backend
        */
        note() {
            if (this.notes && this.notes.length)
                return this.notes.find(note => note.id == this.id) || this.emptyNote
            return this.emptyNote
        },

        ...mapGetters({
            notes: 'getNotes',
        })
    },

    methods: {
        saveAction() {
            // title is the only field I require
            if (this.note.title) {
                this.saveNote(this.note)
                this.goBack()
            } else {
                alert("Please include a title")
            }
        },

        goBack() {
            this.$router.back()
        },

        ...mapActions(['saveNote'])
    },
}
</script>

<!--
    I found a custom input label animation I really like to use for personal project
    Credit: https://codepen.io/sivan/pen/alKwf
-->

<style scoped>
    .uk-card {
        max-width: 500px;
        margin: 20px auto;
    }

    .spacer {
        margin: 30px 0px!important;
    }

    .WhatIsThis {
        font-size: 12px;
        margin-left: 5px;
    }
</style>
