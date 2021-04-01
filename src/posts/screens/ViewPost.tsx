import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Button, LoaderScreen } from 'react-native-ui-lib';
import { Navigation } from 'react-native-navigation';
import { connect } from 'remx';
import * as postActions from '../store/posts.actions';
import { showAddPostModal } from '../navigation/posts.navigation';
import { postsStore } from '../store/posts.store';
import { Post, ScreenProps } from '../types';

interface ViewPostProps extends ScreenProps {
    postId: string,
    post: Post | undefined
}

class ViewPost extends Component<ViewPostProps> {
    // Delete post handler
    handleDelete = () => {
        if (this.props.post) {
            postActions.deletePost(this.props.post.id);
            Navigation.pop(this.props.componentId);
        }
    }

    // Edit post handler
    handleEdit = () => {
        if (this.props.post) {
            showAddPostModal(this.props.post);
        }
    }

    // render callback
    render() {
        if (!this.props.post) {
            return <LoaderScreen />
        }
        return (
            <ScrollView testID="post">
                <View flex spread padding-s6>
                    <View>
                        <Text testID="post-title" text30T purple10>{this.props.post.title}</Text>
                        <Text testID="post-text" text65L dark20 marginT-s5>{this.props.post.text}</Text>
                    </View>
                    <View spread row marginT-s7>
                        <Button
                            testID="delete-button"
                            flex-1
                            onPress={this.handleDelete}
                            label="Delete Post"
                            borderRadius={7}
                            marginH-6
                            text80L
                            red20
                            bg-red70
                        />
                        <Button
                            testID="edit-button"
                            flex-1
                            onPress={this.handleEdit}
                            label="Edit Post"
                            borderRadius={7}
                            marginH-6
                            text80L
                            yellow10
                            bg-yellow70
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(props: ViewPostProps) {
    return {
        post: postsStore.getPost(props.postId)
    }
}

export default connect(mapStateToProps)(ViewPost);