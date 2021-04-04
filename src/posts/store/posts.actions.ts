import { v4 as uuid } from 'uuid';
import { postsStore } from './posts.store';
import * as postsApi from './posts.api';
import { Post } from '../types';

export interface PostActions {
    fetchPosts: () => void,
    addPost: (post: Omit<Post, "id">) => void,
    updatePost: (post: Post)=> void,
    deletePost: (postId: string) => void,
}

// Fetch posts from server and set to store
export async function fetchPosts() {
    const posts: Post[] = await postsApi.fetchPosts();
    postsStore.setPosts(posts);
}

// Add post to server and store
export async function addPost(post: Omit<Post, "id">) {
    const newPost = await postsApi.addPost({
        id: uuid(),
        ...post
    })
    postsStore.addPost(newPost);
}

// Update post on the server and the store
export async function updatePost(post: Post) {
    await postsApi.updatePost(post)
    postsStore.updatePost(post);
}

// Delete a post from server and store
export async function deletePost(postId: string) {
    await postsApi.deletePost(postId)
    postsStore.deletePost(postId);
}