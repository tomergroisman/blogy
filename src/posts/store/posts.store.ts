import * as remx from 'remx';
import { Post } from '../types';

interface PostStoreState {
    posts: Post[]
}

interface PostStoreGetters {
    getPosts: () => Post[],
    getPost: (postId: string) => Post | undefined
}

interface PostStoreSetters {
    setPosts: (posts: Post[]) => void,
    addPost: (post: Post) => void,
    updatePost: (updatePost: Post) => void,
    deletePost: (postId: string) => void,
}

export type PostStore = PostStoreGetters & PostStoreSetters;


// Initial state
const initialState: PostStoreState = {
    posts: []
};

// State registration
const state = remx.state<PostStoreState>(initialState);

// Getters object
const getters: PostStoreGetters = remx.getters({
    // Get current posts list from the store
    getPosts() {
        return state.posts;
    },
    // Get current posts list from the store
    getPost(postId: string) {
        return state.posts.find(post => post.id === postId);
    }
});

// Setters object
const setters: PostStoreSetters = remx.setters({
    // Set posts to new posts list
    setPosts(posts: Post[]) {
        state.posts = posts;
    },
    // Add post to the posts list
    addPost(post: Post) {
        postsStore.setPosts([ ...state.posts, post ])
    },
    // Update a post on the posts list
    updatePost(updatePost: Post) {
        const postIdx = state.posts.findIndex(post=> post.id === updatePost.id);
        const newPosts = [ ...state.posts ];
        newPosts.splice(postIdx, 1, updatePost);
        postsStore.setPosts(newPosts);
    },
    // Delete a post from the posts list
    deletePost(postId: string) {
        postsStore.setPosts(state.posts.filter(post => post.id !== postId));
    },
});

// Module export
export const postsStore: PostStore = {
    ...getters,
    ...setters
};