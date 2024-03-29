import { Users } from './Users'
export const POSTS = [
    {
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/rn-ig-clone-e753f.appspot.com/o/postImage%2Fe2cb1db4-eb68-4271-90b4-ff50b8b3ec6d.jpeg?alt=media&token=7ce2b7e6-9ced-4061-9cfd-c85088db0fc2",
        user: Users[0].username,
        likes: 54001,
        caption: "Re-contextualized real-time software Hello world. Last Year was fun",
        profile_picture: Users[0].image,
        comments: [
            {
                username: "User123",
                comment: "This is a great post! Thanks for sharing."
            },
            {
                username: "RandomUser",
                comment: "I really enjoyed reading this. Very informative!"
            },
        ]
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5_ST-MLDy1Sq109Xqar4uP6dS2WNYUDv6qg&usqp=CAU",
        user: Users[1].username,
        likes: 74,
        caption: "Networked bifurcated forecast",
        profile_picture: Users[1].image,
        comments: [
            {
                username: "FeedbackMaster",
                comment: "Interesting content. I learned something new today."
            },
            {
                username: "AnonymousUser",
                comment: "I have a different perspective on this, but it's an engaging topic."
            }
        ]
    },
    {
        imageUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202401/rohit-sharma--virat-kohli-16210057-16x9.jpg?VersionId=7OIdApCT1V0WGQiTITCb2SBoz5BOYLMc",
        user: "droscoe2",
        likes: 13,
        caption: "Centralized fresh-thinking success",
        profile_picture: "Female",
        comments: [
            {
                username: "FeedbackMaster",
                comment: "Interesting content. I learned something new today."
            },
            {
                username: "AnonymousUser",
                comment: "I have a different perspective on this, but it's an engaging topic."
            }
        ]
    },
    {
        imageUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202401/rohit-sharma--virat-kohli-16210057-16x9.jpg?VersionId=7OIdApCT1V0WGQiTITCb2SBoz5BOYLMc",
        user: "dadvani3",
        likes: 89,
        caption: "Compatible mobile neural-net",
        profile_picture: "Female",
        comments: [
            {
                username: "FeedbackMaster",
                comment: "Interesting content. I learned something new today."
            },
            {
                username: "AnonymousUser",
                comment: "I have a different perspective on this, but it's an engaging topic."
            }
        ]
    }
]