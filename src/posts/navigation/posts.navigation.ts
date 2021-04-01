import { Navigation } from "react-native-navigation"
import { Post } from "../types"

// Push view post screen to the stack
export function pushViewPostScreen(componentId: string, postId: string) {
    Navigation.push(componentId, {
        component: {
            name: 'blog.ViewPost',
            passProps: {
                postId,
            }
        }
    });
}

// Show add post screen as modal
export function showAddPostModal(updatePost?: Post) {
    const title: string = updatePost ? "Edit Post" : "Add Post";
    
    Navigation.showModal({
        stack: {
            children: [
                {
                    component: {
                        name: "blog.AddPost",
                        passProps: {
                            updatePost
                        },
                        options: {
                            topBar: {
                                title: {
                                    text: title
                                }
                            }
                        }
                    }
                }
            ]
        }
    })
}