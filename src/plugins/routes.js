import ListNotes from '../components/ListNotes.vue';
import Note from '../components/Note.vue';

export default [
    {
        path: '/',
        name: 'notes',
        component: ListNotes,
    },
    {
        path: '/note/:id',
        name: 'note',
        component: Note,
        props: true
    }
];
