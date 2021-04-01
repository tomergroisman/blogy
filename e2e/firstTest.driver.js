const when = {
    pressOn: {
        post: (id) => get.posts.post(id).tap(),
        addPost: () => get.buttons.addPost().tap(),
        savePost: () => get.buttons.savePost().tap(),
        deletePost: () => get.buttons.deletePost().tap(),
        editPost: () => get.buttons.editPost().tap(),
        postTitle: (title) => get.posts.postsListTitle(title).tap()
    },
    type: {
        title: (title) => get.addPost.titleField().typeText(title),
        text: (text) => get.addPost.textField().typeText(text)
    },
    scroll: {
        topList: () => get.posts.postsList().scrollTo('top'),
        bottomList: () => get.posts.postsList().scrollTo('bottom'),
        bottomPost: () => get.postView.post().scrollTo('bottom'),
    }
}

const get = {
    posts: {
        postsList: () => element(by.id("post-list")),
        postsListTitle: (title) => element(by.text(title)),
        post: (id) => element(by.id(`post-${id}`)),
    },
    postView: {
        post: () => element(by.id("post")),
        title: () => element(by.id("post-title")),
        text: () => element(by.id("post-text")),
    },
    addPost: {
        titleField: () => element(by.id("title-field")),
        textField: () => element(by.id("text-field")),
    },
    buttons: {
        addPost: () => element(by.id("add-post-btn")),
        savePost: () => element(by.id("save-button")),
        deletePost: () => element(by.id("delete-button")),
        editPost: () => element(by.id("edit-button")),
    }
}

module.exports = {
    when,
    get
}