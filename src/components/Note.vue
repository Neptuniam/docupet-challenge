<template>
<div class="">
    <div v-if="note" class="uk-card uk-card-default uk-card-body roundEdge">
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

        <div class="row fullWidth noMargin around-xs">
            <custom-button class="col-xs-10 col-md-3" colour="primary" label="Save" :click="saveAction" />

            <custom-button class="col-xs-10 col-md-3" colour="secondary" label="Cancel" :click="goBack" />

            <custom-button class="col-xs-10 col-md-3" colour="danger" label="Delete" :click="deleteAction" :disabled="!note.id" />
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2'

export default {
    props: ['id'],

    data() {
        return {
            // Generate new notes here so Vue can set up setters and getters for us
            emptyNote: {
                // I normally use 0 to signify it's new
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
            // Todo: This is a pointer so will save changes even if you cancel
            if (this.notes && this.notes.length)
                return this.notes.find(note => note.id == this.id) || this.emptyNote
            return null
        },

        ...mapGetters({
            notes: 'getNotes',
        })
    },

    methods: {
        async saveAction() {
            // title is the only field I require
            if (this.note.title) {
                const res = await Swal.fire({
                    title: 'Are you ready to<br>save your changes?',
                    // text: 'You will not be able to recover it!',
                    icon: 'question',
                    position: 'top',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, save!',
                    // confirmButtonColor: '#f0506e',
                    cancelButtonText: 'Not yet',
                    cancelButtonColor: '#080808'
                })

                if (res.value) {
                    this.saveNote(this.note)
                    this.goBack()
                }
            } else {
                alert("Please include a title")
            }
        },

        async deleteAction() {
            const res = await Swal.fire({
                title: 'Are you sure you want<br>to delete this note?',
                text: 'You will not be able to recover it!',
                icon: 'warning',
                position: 'top',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                confirmButtonColor: '#f0506e',
                cancelButtonText: 'No, keep it',
                cancelButtonColor: '#080808'
            })

            if (res.value) {
                this.deleteNote(this.note)
                this.goBack()
            }
        },

        goBack() {
            this.$router.back()
        },

        ...mapActions(['saveNote', 'deleteNote'])
    },
}
</script>

<!--
    I found a custom input label animation I really like to use for personal project
    Credit: https://codepen.io/sivan/pen/alKwf
-->

<style scoped>
    .uk-card {
        max-width: 600px;
        margin: auto;
    }

    .WhatIsThis {
        font-size: 12px;
        margin-left: 5px;

        text-decoration: underline;
    }

    .uk-button {
        margin: 5px auto;
    }
</style>
