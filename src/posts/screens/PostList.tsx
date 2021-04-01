import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native-ui-lib';
import {connect} from 'remx';
import { Navigation } from 'react-native-navigation';
import * as postActions from '../store/posts.actions';
import { postsStore } from '../store/posts.store';
import { Post, ScreenProps } from '../types';
import * as postsNavigation from '../navigation/posts.navigation';
import PostListItem from '../components/PostListItem';

interface PostsListProps extends ScreenProps {
    posts: Post[]
}

class PostsList extends Component<PostsListProps> {
    constructor(props: PostsListProps) {
        super(props);

        Navigation.events().bindComponent(this);
    }

    // Navigation static options callback
    static options() {
        return {
            topBar: {
                title: {
                    text: 'Blog'
                },
                rightButtons: [
                    {
                        id: 'addPost',
                        text: 'Add',
                        testID: "add-post-btn"
                    }
                ]
            }
        };
    }

    // Returns the rendered post
    renderPost = ({ item }: { item: Post }) => {
        return (
            <PostListItem post={item} handlePress={this.handlePress} />
        )
    }

    // Extract key props for a post
    postKeyExtractor = (post: Post) => {
        return `${post.id}-key`
    }

    // Post press handler
    handlePress = (postId: string) => {
        postsNavigation.pushViewPostScreen(this.props.componentId, postId)
    }

    // navigationButtonPressed callback
    navigationButtonPressed() {
        postsNavigation.showAddPostModal();
    }

    // componentDidMount callback
    componentDidMount() {
        postActions.fetchPosts();
    }

    // render callback
    render() {
        return (
            <View>
                <FlatList
                    testID="post-list"
                    data={this.props.posts}
                    renderItem={this.renderPost}
                    keyExtractor={this.postKeyExtractor}
                />
            </View>
        );
    }

}

function mapStateToProps() {
    return {
        posts: postsStore.getPosts()
    };
}

export default connect(mapStateToProps)(PostsList);