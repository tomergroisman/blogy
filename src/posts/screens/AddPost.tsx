import React, { Component } from 'react';
import { View, TextField, Colors } from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import * as presenter from './AddPost.presenter';
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
        if (state === "title") {
            presenter.onChangeTitle(this.props.componentId, value)
        }
    }
    
    // navigationButtonPressed callback
    navigationButtonPressed({ buttonId }: { buttonId: string }) {
        if (buttonId === "cancelBtn") {
            Navigation.dismissModal(this.props.componentId);
        }
        else if (buttonId === "saveBtn") {
            presenter.onSavePressed(
                this.props.componentId,
                this.state.title,
                this.state.text,
                this.props.updatePost
            )
        }
    }

    // componentDidMount callback
    componentDidMount() {
        presenter.onChangeTitle(this.props.componentId, this.props.updatePost?.title || "");
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