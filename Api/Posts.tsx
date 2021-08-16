import http from "./Common";

class Post {
    createPost(data: any, token: any) {
        return http.post(`/post/create`, data, {
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
    }

    createComment(data: any, token: any) {
        return http.post(`/comment/create`, data, {
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
    }

    getPosts(data: object) {
        return http.get(`/post/list`, {
            headers: {
                "Content-type": "application/json",
                // Authorization: "Bearer " + token,
            },
        });
    }

    getPostsDetails(data: any, token: string) {
        console.log(data);

        return http.get(`/post/${data.id}`, {
            headers: {
                "Content-type": "application/json",
                // Authorization: "Bearer " + token,
            },
        });
    }

    getPostsComments(data: any) {
        return http.get(`/post/${data.id}/comment`, {
            headers: {
                "Content-type": "application/json",
                // Authorization: "Bearer " + token,
            },
        });
    }

    makeVote(data: any, token: any) {
        return http.post(`/vote`, data, {
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
    }
}

export default new Post();
