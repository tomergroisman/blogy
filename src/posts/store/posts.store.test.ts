import { Post } from "../types";
import { PostStore } from "./posts.store";

describe('Posts Store', () => {
    let postsStore: PostStore;

    const mockPosts: Post[] = [

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
      }
    ]

    const newPost: Post = {
        "id": "3",
        "title": "New Post",
        "text": "Unit testing post",
        "img": "https://picsum.photos/200/200/?image=1"
    }

    beforeEach(() => {
        postsStore = require("./posts.store").postsStore;
    });

    it('should have an initial state without any posts', () => {
        expect(postsStore.getPosts()).toEqual([]);
    });

    it('should set posts', () => {
        postsStore.setPosts(mockPosts);
        expect(postsStore.getPosts()).toEqual(mockPosts);
    });

    it('should add a post', () => {
        postsStore.setPosts(mockPosts);
        postsStore.addPost(newPost);

        expect(postsStore.getPosts()).toEqual([ ...mockPosts, newPost ]);
    });

    it('should get a post', () => {
        postsStore.setPosts(mockPosts);

        expect(postsStore.getPost("1")).toEqual(mockPosts[0]);
    });

    it('should delete a post', () => {
        postsStore.setPosts(mockPosts);
        postsStore.addPost(newPost);
        postsStore.deletePost("3");

        expect(postsStore.getPosts()).toEqual(mockPosts);
    });

    it('should update a post', () => {
        postsStore.setPosts(mockPosts);
        const updatedPost: Post = {
            ...mockPosts[0],
            title: "update"
        }
        postsStore.updatePost(updatedPost);

        expect(postsStore.getPost("1")).toEqual({
            ...mockPosts[0],
            ...updatedPost,
        });
    });
});

export {}