const driver = require('./firstTest.driver');
const mockServerApi = require('../src/posts/store/posts.api.e2e.ts')

describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    afterEach(() => {
        mockServerApi.reset();
    });

    it('should display the posts list on app launch', async () => {
        await expect(driver.get.posts.postsList()).toBeVisible();
    });

    it('should display a post', async () => {
        const postId = "1";

        await driver.when.pressOn.post(postId);
        await expect(driver.get.postView.title()).toHaveText("First Post");
        await expect(driver.get.postView.text()).toHaveText("Wow, that's exciting!");
    });

    it('should add a post', async () => {
        const postTitle = "E2E Test";
        const postId = "4";

        await driver.when.pressOn.addPost();
        await driver.when.type.title(postTitle);
        await driver.when.pressOn.savePost();
        await driver.when.scroll.bottomList();
        await driver.when.pressOn.post(postId);

        await expect(driver.get.postView.title()).toHaveText(postTitle);
    });

    it('should delete a post', async () => {
        const postId = "3";

        await driver.when.scroll.bottomList();
        await driver.when.pressOn.post(postId);
        await driver.when.scroll.bottomPost();
        await driver.when.pressOn.deletePost();

        await expect(driver.get.posts.post(postId)).not.toBeVisible();
    });

    it('should update a post', async () => {
        const postId = "1";

        await driver.when.scroll.topList();
        await driver.when.pressOn.post(postId);
        await driver.when.scroll.bottomPost();
        await driver.when.pressOn.editPost();
        await driver.when.type.title(' - edit');
        await driver.when.pressOn.savePost();

        await expect(driver.get.postView.title()).toHaveText("First Post - edit");
    });
});
