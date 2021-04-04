import { PostStore } from "./posts.store";

describe('Posts Store', () => {
    let postsStore: PostStore;

    beforeEach(() => {
        postsStore = require('./posts.store').postsStore;
    });

    // it('should have an initial state without any posts', () => {
    //     expect(postsStore).toBe([]);
    // });
    // it('should set posts', () => {});
    // it('should add a post', () => {});
    // it('should delete a post', () => {});
});

export {}