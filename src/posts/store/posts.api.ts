import { Post } from "../types";

// const ENDPOINT = "10.100.102.22:3000";
const ENDPOINT = "localhost:3000";

export function fetchPosts(): Promise<Post[]> {
    return fetch(`http://${ENDPOINT}/posts`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
        }
    }).then(res => res.json());
}

export function addPost(post: Post): Promise<Post> {
    return fetch(`http://${ENDPOINT}/posts`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    }).then(res => res.json());
}

export function updatePost(post: Post): Promise<Post> {
    return fetch(`http://${ENDPOINT}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    }).then(res => res.json());
}

export function deletePost(postId: string): Promise<boolean> {
    return fetch(`http://${ENDPOINT}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => true)
    .catch(reason => false);
}