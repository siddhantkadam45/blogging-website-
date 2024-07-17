// atoms.js
import { atomFamily, atom } from 'recoil';

export const blogPostFamily = atomFamily({
  key: 'blogPostFamily',
  default: (id) => ({
    id,
    title: '',
    content: '',
    published: false,
    authorId: '',
  }),
});

export const blogPostIdsState = atom({
  key: 'blogPostIdsState',
  default: [],
});


export const idnumber = atom({
    key:'idnumber',
    default:''
})

export const globalid = atom({
  key:'globalid',
  default:''
})