import { Post } from "../types";

const initialPosts: Post[] = [
    {
        "id": "1",
        "title": "First Post",
        "text": "Wow, that's exciting!",
        "img": "https://picsum.photos/200/200/?image=449"
    },
    {
        "id": "2",
        "title": "Android Post",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis non augue a feugiat. Vestibulum eget quam vel mi elementum tempus. Maecenas eros nunc, consequat vel condimentum a, semper in diam. Sed tincidunt porttitor efficitur. Donec finibus eu nulla commodo fringilla. Quisque suscipit elementum viverra. Etiam dictum nibh ac sem auctor convallis.\n\nMaecenas eu erat diam. Cras hendrerit nisi vel mi imperdiet, sit amet commodo arcu laoreet. Mauris pulvinar, tortor non tincidunt luctus, mauris magna condimentum est, congue hendrerit metus ex quis leo. Phasellus aliquam quam vitae laoreet suscipit. Duis auctor ultricies faucibus. In hac habitasse platea dictumst. Aliquam vehicula ut urna nec vestibulum. Vivamus nec diam vestibulum ex facilisis fermentum. Mauris consectetur turpis felis, ac accumsan leo tincidunt sit amet. Morbi sed elit id eros fermentum viverra eu auctor lectus. Mauris efficitur tortor non purus venenatis pulvinar ac id tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor nisi eu commodo eleifend. In lacus dui, condimentum nec lobortis et, auctor sagittis risus. Sed lobortis commodo purus, et pharetra massa rutrum eu.",
        "img": "https://picsum.photos/200/200/?image=238"
    },
    {
        "id": "3",
        "title": "Delete Test e2e",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis non augue a feugiat. Vestibulum eget quam vel mi elementum tempus. Maecenas eros nunc, consequat vel condimentum a, semper in diam. Sed tincidunt porttitor efficitur. Donec finibus eu nulla commodo fringilla. Quisque suscipit elementum viverra. Etiam dictum nibh ac sem auctor convallis.\n\nMaecenas eu erat diam. Cras hendrerit nisi vel mi imperdiet, sit amet commodo arcu laoreet. Mauris pulvinar, tortor non tincidunt luctus, mauris magna condimentum est, congue hendrerit metus ex quis leo. Phasellus aliquam quam vitae laoreet suscipit. Duis auctor ultricies faucibus. In hac habitasse platea dictumst. Aliquam vehicula ut urna nec vestibulum. Vivamus nec diam vestibulum ex facilisis fermentum. Mauris consectetur turpis felis, ac accumsan leo tincidunt sit amet. Morbi sed elit id eros fermentum viverra eu auctor lectus. Mauris efficitur tortor non purus venenatis pulvinar ac id tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor nisi eu commodo eleifend. In lacus dui, condimentum nec lobortis et, auctor sagittis risus. Sed lobortis commodo purus, et pharetra massa rutrum eu.",
        "img": "https://picsum.photos/200/200/?image=238"
    }
];

let mockServerPosts: Post[] = [...initialPosts];

function reset(): void {
    mockServerPosts = [...initialPosts];
}

function fetchPosts(): Promise<Post[]> {
    const posts = [...mockServerPosts];
    return Promise.resolve(posts);
}

function addPost(post: Post): Promise<Post> {
    const newPost: Post = {
        ...post,
        id: (mockServerPosts.length + 1).toString()
    }
    mockServerPosts.push(newPost);
    return Promise.resolve(newPost);
}

function updatePost(updatePost: Post): Promise<Post> {
    mockServerPosts = mockServerPosts.map(post => post.id === updatePost.id ? updatePost : post);
    return Promise.resolve(updatePost);
}

function deletePost(postId: string): Promise<boolean> {
    const idx: number = mockServerPosts.findIndex(post => post.id === postId);
    if (idx !== -1) {
        mockServerPosts.splice(idx, 1);
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}

interface MockServerApi {
    reset: () => void,
    fetchPosts(): Promise<Post[]>
    addPost: (post: Post) => Promise<Post>,
    updatePost: (updatePost: Post) => Promise<Post>,
    deletePost: (postId: string) => Promise<boolean>,
}

const MockServerApi: MockServerApi = {
    reset,
    fetchPosts,
    addPost,
    updatePost,
    deletePost
}

module.exports = MockServerApi;