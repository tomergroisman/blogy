import { Post } from "../types";
import { PostActions } from "./posts.actions";
import { PostStore } from "./posts.store";

describe("Post Actions", () => {

    // @ts-ignore
    let postsActions: PostActions, mockStore: PostStore, mockFetchPosts, mockAddPost;

    const mockPosts: Post[] = [
        {
            id: "1",
            title: 'Post 1',
            text: 'Post 1 text',
            img: 'https://picsum.photos/200/200/?image=977'
        },
        {
            id: "2",
            title: 'Post 2',
            text: 'Post 2 text',
            img: 'https://picsum.photos/200/200/?image=1'
        }
    ];

    const mockPost: Omit<Post, "id"> = {
        title: 'Post 3',
        text: 'Post 3 text',
        img: 'https://picsum.photos/200/200/?image=77'
    };

    beforeEach(() => {
        jest.mock('./posts.store');
        mockStore = require('./posts.store').postsStore;

        mockFetchPosts = jest.fn().mockResolvedValue(mockPosts);
        mockAddPost = jest.fn().mockImplementation(post => Promise.resolve({...post, id: 'mock-id'}));
        jest.mock('./posts.api', () => ({
            // @ts-ignore
            fetchPosts: mockFetchPosts,
            // @ts-ignore
            addPost: mockAddPost,
            deletePost: jest.fn(),
            updatePost: jest.fn()
        }));

        postsActions = require('./posts.actions');
    });

    it("should fetch posts", async () => {
        await postsActions.fetchPosts();
        expect(mockStore.setPosts).toHaveBeenCalledWith(mockPosts)
    });

    it("should add a new post", async () => {
        await postsActions.addPost(mockPost);
        expect(mockStore.addPost).toHaveBeenCalledWith({ ...mockPost, id: 'mock-id' })
    });

    it("should delete a post", async () => {
        await postsActions.deletePost("mock-id");
        expect(mockStore.deletePost).toHaveBeenCalledWith('mock-id')
    });

    it("should update a post", async () => {
        const updatedPost: Post = {
            id: "1",
            title: 'Post 1 - Edit',
            text: 'Post 1 text',
            img: 'https://picsum.photos/200/200/?image=977'
        }
        const serverUpdatePost = require('./posts.api').updatePost;
        await postsActions.updatePost(updatedPost);
        expect(mockStore.updatePost).toHaveBeenCalledWith(updatedPost)
        expect(serverUpdatePost).toHaveBeenCalledWith(updatedPost)
    });

})