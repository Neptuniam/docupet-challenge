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

// const router = new VueRouter({
//   routes // short for `routes: routes`
// })
