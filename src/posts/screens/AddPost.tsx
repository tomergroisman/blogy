import React, { Component } from 'react';
import { View, TextField, Colors } from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import * as postActions from '../store/posts.actions';
import { Post, ScreenProps } from '../types';

interface AddPostProps extends ScreenProps {
    updatePost?: Post
}

interface AddPostState {
    title: string,
    text: string
}

class AddPost extends Component<AddPostProps, AddPostState> {
    constructor(props: AddPostProps) {
        super(props);

        this.state = {
            title: props.updatePost?.title || "",
            text: props.updatePost?.text || ""
        }

        Navigation.events().bindComponent(this);
    }

    // Navigation static options callback
    static options() {
        return {
            topBar: {
                leftButtons: [
                    {
                        id: 'cancelBtn',
                        text: "Cancel",
                        color: Colors.secondary
                    }
                ],
            }
        }
    }

    
    // Change text handler
    handleChangeText = (value: string, state: "title" | "text") => {
        this.setState({
            ...this.state,
            [state]: value
        });
    }
    
    // Save post handler
    handleSave = () => {
        if (this.props.updatePost) {
            postActions.updatePost({
                ...this.props.updatePost,
                title: this.state.title,
                text: this.state.text
            })
        }
        else {
            const randomImageNumber = Math.floor((Math.random() * 500) + 1);
            postActions.addPost({
                title: this.state.title,
                text: this.state.text,
                img: `https://picsum.photos/200/200/?image=${randomImageNumber}`
            });
        }
    }
    
    // navigationButtonPressed callback
    navigationButtonPressed({ buttonId }: { buttonId: string }) {
        if (buttonId === "cancelBtn") {
            Navigation.dismissModal(this.props.componentId);
        }
        else if (buttonId === "saveBtn") {
            this.handleSave();
            Navigation.dismissModal(this.props.componentId);
        }
    }

    // Return the save button props
    mergeSaveButton = () => {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [{
                    id: 'saveBtn',
                    text: 'Save',
                    enabled: !!this.state.title,
                    testID: "save-button"
                }]
            }
        });
    }

    // componentDidUpdate callback
    componentDidUpdate() {
        this.mergeSaveButton();
    }

    componentDidMount() {
        this.mergeSaveButton();
    }

    // render callback
    render() {
        return (
            <View flex padding-s6>
                <TextField
                    testID="title-field"
                    text70
                    containerStyle={{marginBottom: 12}}
                    floatingPlaceholder
                    placeholder="Post Title"
                    onChangeText={(value: string) => this.handleChangeText(value, "title")}
                    floatOnFocus
                    value={this.state.title}
                />
                <TextField
                    testID="text-field"
                    text70
                    floatingPlaceholder
                    placeholder="Post Text"
                    onChangeText={(value: string) => this.handleChangeText(value, "text")}
                    value={this.state.text}
                    expandable
                    topBarProps={{ doneLabel: "Done" }}
                />
            </View>
        );
    }
}

export default AddPost;