import { Router } from "express";
import authUser from "../middleware/authUser";
import * as userController from "../controller/userController";
import { upload } from "../services/multerServices";

const userRouter = Router();

userRouter.get("/home" , authUser , userController.disHome)

// Profile Routes
userRouter.get("/profile/:username" , authUser , userController.disProfile)
userRouter.post("/profile/update" , authUser , upload.fields([{ name: "coverPhoto", maxCount: 1 }, { name: "avatarPhoto", maxCount: 1 }]) , userController.updateProfile)

// update follower - follow/unfollow
userRouter.post("/updateFollower/:username/:action" , authUser , userController.updateFollower)

// post new tweet
userRouter.post("/postTweet" , authUser , upload.single("tweetImg") , userController.postNewTweet)
userRouter.delete("/deleteTweet/:tweetId" , authUser , userController.deleteTweet)

// like/unlike tweet
userRouter.post("/tweet/like/:tweetId" , authUser , userController.likeUnlikeTweet)

// retweet functionality
userRouter.post("/retweet/:tweetId" , authUser , userController.postRetweet)

// comment on tweet
userRouter.post("/tweet/comment/:tweetId" , authUser , userController.postComment)
userRouter.get("/getComments/:tweetId" , authUser , userController.getComments)

// search user by username
userRouter.get("/searchUsers" , authUser , userController.getSearchUserDetails)

// get follow/following users
userRouter.get("/getFollowFollowingUsers/:userName" , authUser , userController.getFollowFollowingUsers)

// change password
userRouter.post("/changePassword" , authUser , userController.changePassword)

// show tweet (share post)
userRouter.get("/showPost" , authUser , userController.showPost)

export default userRouter;