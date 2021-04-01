import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, ListItem, Image, Colors, BorderRadiuses } from 'react-native-ui-lib';
import { Post } from '../types';

interface PostListItemProps {
    post: Post,
    handlePress: (postId: string) => void
}

export default class PostListItem extends Component<PostListItemProps> {
    render() {
        const {post, handlePress } = this.props;
        return (
            <ListItem
                // @ts-ignore
                testID={`post-${post.id}`}
                height={77.5}
                onPress={() => handlePress(post.id)}
            >
                <ListItem.Part left>
                    <Image
                        source={{uri: post.img}}
                        style={styles.image}
                    />
                </ListItem.Part>
                <ListItem.Part middle column containerStyle={[styles.border, {marginRight: 17}]}>
                    <ListItem.Part containerStyle={{marginBottom: 3}}>
                        <Text testID="post-title" dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{post.title}</Text>
                    </ListItem.Part>
                    <ListItem.Part>
                        <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{post.text}</Text>
                    </ListItem.Part>
                </ListItem.Part>
            </ListItem>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 54,
        height: 54,
        borderRadius: BorderRadiuses.br20,
        marginHorizontal: 14,
    },
    border: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.dark60,
    }
});