import { NavigationRoot } from "react-native-navigation/lib/dist/Navigation";
import { PostActions } from "../store/posts.actions";
import { Post } from "../types";
import { PresenterRoot } from "./AddPost.presenter";

describe('AddPost presenter', () => {

    let Presenter: PresenterRoot, Navigation: NavigationRoot, postsActions: PostActions;
    const mockComponentId: string = 'mock-componentId';
    const mockTitle: string = 'mock-title';
    const mockText: string = 'mock-text';

    beforeEach(() => {
        jest.mock('react-native-navigation');
        Navigation = require('react-native-navigation').Navigation;
    
        jest.mock('../store/posts.actions');
        postsActions = require('../store/posts.actions');
    
        Presenter = require('./AddPost.presenter');
    });

    afterEach(() => {
        jest.resetModules();
    });
   
    it('should enable the save button if title is not blank', () => {
        Presenter.onChangeTitle(
            mockComponentId,
            mockTitle
        );
        // @ts-ignore
        expect(Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled).toBeTruthy();
    });

    it('should not enable the save button if title is blank', () => {
        Presenter.onChangeTitle(
            mockComponentId,
            ""
        );
        // @ts-ignore
        expect(Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled).not.toBeTruthy();
    });

    it('should dismiss the modal when clicking on save', () => {
        Presenter.onSavePressed(
            mockComponentId,
            mockTitle,
            mockText
        );
        // @ts-ignore
        expect(Navigation.dismissModal).toBeCalledWith(mockComponentId)
    });

    it('should call add post action when clicking on save with a random image', () => {
        Presenter.onSavePressed(
            mockComponentId,
            mockTitle,
            mockText
        );
        // @ts-ignore
        expect(postsActions.addPost).toBeCalledWith({
            title: mockTitle,
            text: mockText,
            img: expect.any(String)
        });
    });

    it('should call update post action when clicking on save if given post to update', () => {
        const updatePost: Post = {
            id: "mocked-id",
            title: "old-title",
            text: "old-title",
            img: "old-img",
        }

        Presenter.onSavePressed(
            mockComponentId,
            mockTitle,
            mockText,
            updatePost
        );
        // @ts-ignore
        expect(postsActions.updatePost).toBeCalledWith({
            ...updatePost,
            title: mockTitle,
            text: mockText
        });
    });
});