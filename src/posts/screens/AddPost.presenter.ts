import { Navigation } from 'react-native-navigation';
import * as postActions from '../store/posts.actions';
import { Post } from '../types';

export interface PresenterRoot {
    onChangeTitle: (componentId: string, title: string) => void,
    onSavePressed: (componentId: string, title: string, text: string, postToUpdate?: Post) => void,
}

// Enable save button if post title is not empty
export function onChangeTitle(componentId: string, title: string) {
    Navigation.mergeOptions(componentId, {
        topBar: {
            rightButtons: [{
                id: 'saveBtn',
                text: 'Save',
                enabled: !!title,
                testID: "save-button"
            }]
        }
    });
}

// Add or update post and dismiss modal on save button click
export function onSavePressed(componentId: string, title: string, text: string, postToUpdate?: Post) {
    if (postToUpdate) {
        postActions.updatePost({
            ...postToUpdate,
            title: title,
            text: text
        })
    }
    else {
        const randomImageNumber = Math.floor((Math.random() * 500) + 1);
        postActions.addPost({
            title,
            text,
            img: `https://picsum.photos/200/200/?image=${randomImageNumber}`
        });
    }

    Navigation.dismissModal(componentId);
}