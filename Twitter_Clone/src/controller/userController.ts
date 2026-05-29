import type { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt"
import * as userHelpers from "../helper/userHelpers";

export const disHome = async (req: Request, res: Response) => {
    const userTokenDetails = (req as any).userDetails;
    const profileDetails = await userHelpers.getProfileDetails(userTokenDetails.userName)
    const homeTweets = await userHelpers.getHomeTweets(userTokenDetails.userId)

    res.render("UserPages/home", { profile: profileDetails || null, homeTweets })
}

// Profile controllers
export const disProfile = async (req: Request, res: Response) => {
    const username: any = req.params.username;
    const userTokenDetails = (req as any).userDetails;
    const profileDetails = await userHelpers.getProfileDetails(username)
    if (!profileDetails) {
        return res.status(404).json({ message: "User not found" });
    }
    const followersCount = await userHelpers.countFollowers(profileDetails.user_id)
    const followingCount = await userHelpers.countFollowing(profileDetails.user_id)
    const isFollowing = await userHelpers.isFollowing(userTokenDetails.userId, profileDetails.user_id)
    const profileTweets = await userHelpers.getProfileTweets(userTokenDetails.userId, profileDetails.user_id)
    const profileRetweets = await userHelpers.getProfileRetweets(userTokenDetails.userId, profileDetails.user_id)
    const tweetCount = await userHelpers.getTweetCount(profileDetails.user_id)

    res.render("UserPages/profilePage", {
        userToken: userTokenDetails,
        profileDetails: profileDetails,
        followersCount: followersCount,
        followingCount: followingCount,
        isFollowing: isFollowing,
        profileTweets: profileTweets,
        profileRetweets: profileRetweets,
        tweetCount: tweetCount
    })
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userDetailQ = `select profilePic, coverPic from users where user_id = ?`
        const [userDetails]: any = await pool.execute(userDetailQ, [(req as any).userDetails.userId])
        const profilePic = userDetails[0].profilePic;
        const coverPic = userDetails[0].coverPic;

        const userProfileUpdateQ = `update users set coverPic = ?, profilePic = ?, firstName = ?, lastName = ?, bio = ? where user_id = ?`

        const values = [
            req.files && (req.files as any).coverPhoto ? (req.files as any).coverPhoto[0].path : coverPic,
            req.files && (req.files as any).avatarPhoto ? (req.files as any).avatarPhoto[0].path : profilePic,
            req.body.firstName,
            req.body.lastName,
            req.body.bio,
            (req as any).userDetails.userId
        ]

        const result = await pool.execute(userProfileUpdateQ, values);

        if ((req.files as any).coverPhoto) {
            await userHelpers.deleteImage(coverPic)
        }
        if ((req.files as any).avatarPhoto) {
            await userHelpers.deleteImage(profilePic)
        }

        res.status(200).json({ message: "Profile Updated Successfully." })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Updating Profile." })
    }
}

// update follower - follow/unfollow
export const updateFollower = async (req: Request, res: Response) => {
    try {
        const userTokenDetails = (req as any).userDetails;
        const action = req.params.action === "Unfollow" ? true : false;
        const profileUsername = req.params.username as string;
        const profileDetails = await userHelpers.getProfileDetails(profileUsername)

        if (!profileDetails) {
            return res.status(404).json({ message: "User not found." })
        }

        if (action) {
            // Unfollow
            const unfollowQuery = `delete from follow where follower_id=? and following_id=?`
            await pool.execute(unfollowQuery, [userTokenDetails.userId, profileDetails.user_id])
        } else {
            // Follow
            const followQuery = `insert into follow (follower_id, following_id) values (?, ?)`
            await pool.execute(followQuery, [userTokenDetails.userId, profileDetails.user_id])
        }

        res.redirect(`/user/profile/${profileUsername}`)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Updating Follow Status." })
    }
}

// post new tweet
export const postNewTweet = async (req: Request, res: Response) => {
    try {
        const userTokenDetails = (req as any).userDetails;
        const tweetContent = req.body.tweetContent;
        const tweetImg = req.file ? req.file.path : null;

        const postTweetQuery = `insert into tweets (user_id, tweetContent, tweetImg) values (?, ?, ?)`

        try {
            const result = await pool.execute(postTweetQuery, [userTokenDetails.userId, tweetContent, tweetImg])
            res.redirect("/user/home")
        } catch (error) {
            console.log("Error in posting tweet: ", error)
        }

    } catch (error) {
        console.log(error)
    }
}
export const deleteTweet = async (req: Request, res: Response) => {
    try {

        const tweetId = req.params.tweetId as string;

        const getTweetQuery = `select * from tweets where tweet_id = ?`
        const [tweetResult]: any = await pool.execute(getTweetQuery, [tweetId])
        if (tweetResult.length === 0) {
            return res.status(404).json({ message: "Tweet not found." })
        }

        try {
            const deleteTweetQuery = `delete from tweets where tweet_id = ?`
            await pool.execute(deleteTweetQuery, [tweetId])

            const tweetImg = tweetResult[0].tweetImg
            if (tweetImg) {
                await userHelpers.deleteImage(tweetImg)
            }

            res.status(200).json({ message: "Tweet Deleted Successfully." })

        } catch (error) {
            console.log("Error in deleting tweet: ", error)
            res.status(500).json({ message: "Internal Server Error in Deleting Tweet." })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Deleting Tweet." })
    }
}

// like / unlike tweet
export const likeUnlikeTweet = async (req: Request, res: Response) => {
    try {
        const userTokenDetails = (req as any).userDetails;
        const tweetId = req.params.tweetId as string;
        const checkLikeQuery = `select * from likes where user_id=? and tweet_id=?`
        const [likeResult]: any = await pool.execute(checkLikeQuery, [userTokenDetails.userId, tweetId])

        if (likeResult.length > 0) {
            const unlikeQuery = `delete from likes where user_id=? and tweet_id=?`
            await pool.execute(unlikeQuery, [userTokenDetails.userId, tweetId])
            return res.status(200).json({ message: "Unliked" })
        } else {
            const likeQuery = `insert into likes (user_id, tweet_id) values (?, ?)`
            await pool.execute(likeQuery, [userTokenDetails.userId, tweetId])
            return res.status(200).json({ message: "Liked" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error in Liking/Unliking Tweet." })
    }
}

// post & get comments on tweet
export const postComment = async (req: Request, res: Response) => {
    try {

        const userTokenDetails = (req as any).userDetails;
        const tweetId = req.params.tweetId as string;
        const commentContent = req.body.commentText as string;

        const postCommentQuery = `insert into comments (user_id, tweet_id, commentText) values (?, ?, ?)`

        try {
            const [result] = await pool.execute(postCommentQuery, [userTokenDetails.userId, tweetId, commentContent]) as any
            if (result.affectedRows > 0) {
                const comments = await userHelpers.getCommnetsDetails(parseInt(tweetId))
                return res.status(200).json({ comments: comments })
            }
        } catch (error) {
            console.log("Error in posting comment: ", error)
            return res.status(500).json({ message: "Internal Server Error in Posting Comment." })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error in Posting Comment." })
    }
}

export const getComments = async (req: Request, res: Response) => {
    try {

        const tweetId = req.params.tweetId as string;

        try {
            const comments = await userHelpers.getCommnetsDetails(parseInt(tweetId))
            return res.status(200).json({ comments: comments })
        } catch (error) {
            console.log("Error in getting comments: ", error)
            return res.status(500).json({ message: "Internal Server Error in Getting Comments." })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error in Getting Comments." })
    }
}

// retweet functionality
export const postRetweet = async (req: Request, res: Response) => {
    try {

        const userTokenDetails = (req as any).userDetails;
        const tweetId = req.params.tweetId as string;

        const checkRetweetQ = `select * from retweets where user_id=? and tweet_id=?`
        const postRetweetQuery = `insert into retweets (user_id, tweet_id) values (?, ?)`
        try {
            const [retweetResult]: any = await pool.execute(checkRetweetQ, [userTokenDetails.userId, tweetId])

            if (retweetResult.length > 0) {
                const deleteRetweetQ = `delete from retweets where user_id=? and tweet_id=?`
                await pool.execute(deleteRetweetQ, [userTokenDetails.userId, tweetId])
                return res.status(200).json({ message: "Retweet Removed Successfully." })
            } else {
                const result = await pool.execute(postRetweetQuery, [userTokenDetails.userId, tweetId])
                return res.status(200).json({ message: "Retweeted Successfully." })
            }


        } catch (error) {
            console.log("Error in retweeting: ", error)
            return res.status(500).json({ message: "Internal Server Error in Retweeting." })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error in Retweeting." })
    }
}

// get User details for search
export const getSearchUserDetails = async (req: Request, res: Response) => {
    try {

        const searchString = req.query.searchStr as string;
        const searchQuery = `select user_id, userName, firstName, lastName, profilePic from users where userName like ? or firstName like ? or lastName like ? limit 5`
        const [result] = await pool.execute(searchQuery, [`%${searchString}%`,`%${searchString}%`,`%${searchString}%`])
        res.status(200).json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Searching User." })
    }
}

// get follow/following users
export const getFollowFollowingUsers = async (req: Request, res: Response) => {
    try {

        const userName = req.params.userName as string;
        const userData = await userHelpers.getProfileDetails(userName)
        if (!userData) {
            return res.status(404).json({ message: "User not found." })
        }
        const userId = userData.user_id;
        const followFollowingDetails = await userHelpers.getFollowFollowingUsers(userId)
        // console.log(followFollowingDetails);
        res.status(200).json(followFollowingDetails)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error in Getting Follow/Following Users." })
    }
}
// change password
export const changePassword = async (req: Request, res: Response) => {
    try {
        const newPassword: string = req.body.newPassword
        const userTokenDetails = (req as any).userDetails

        const updatePasswordQ = `update users set userPassword=? where userName=?`

        const hassedPassword = await bcrypt.hash(newPassword, 10)

        const [result] = await pool.execute(updatePasswordQ, [hassedPassword, userTokenDetails.userName])

        if (result) {
            res.clearCookie("token")
        }

        res.status(200).json({ message: "Password Updated successfully." })

    } catch (error) {
        console.log("Error in Change Password")
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

// show single post
export const showPost = async (req: Request, res: Response) => {
    const tweetId = req.query.postId
    const userTokenDetails = (req as any).userDetails
    try {
        const query = `select 
                        u.userName, u.profilePic, u.firstName, u.lastName,t.tweet_id, t.tweetContent, t.tweetImg, t.updated_at,'original' AS type,
                        (select count(*) from likes where tweet_id = t.tweet_id) AS likeCount,
                        (select count(*) from comments where tweet_id = t.tweet_id) AS commentCount,
                        (select count(*) from retweets where tweet_id = t.tweet_id) AS retweetCount,
                        exists(select 1 from likes where user_id = ? AND tweet_id = t.tweet_id) AS isLiked
                    from tweets t
                    join users u ON t.user_id = u.user_id
                    where t.tweet_id = ?`
        const [result] = await pool.execute(query , [ userTokenDetails.userId , tweetId])
        res.render("UserPages/showPost" , { data: result})
    }catch(error){
        console.log(error)
    }
    
}