import pool from "../config/db";
import fs from "fs";

export async function getProfileDetails(username: string) {
    try {
        const query = `select * from users where userName=? `
        let [result] = await pool.execute(query, [username]) as any;
        return result[0]

    } catch (error) {
        console.log(error)
    }
}

export const countFollowers = async (userId: number) => {
    try {
        const query = `select count(*) as followersCount from follow where following_id=?`
        const [result] = await pool.execute(query, [userId]) as any;

        return result[0].followersCount;

    } catch (error) {
        console.log(error, "Error in Counting Followers.")
    }
}

export const countFollowing = async (userId: number) => {
    try {
        const query = `select count(*) as followingCount from follow where follower_id=?`
        const [result] = await pool.execute(query, [userId]) as any;
        return result[0].followingCount;

    } catch (error) {
        console.log(error, "Error in Counting Following.")
    }
}

export async function isFollowing(followerId: number, followingId: number) {
    try {

        const query = `select * from follow where follower_id=? and following_id=?`
        const [result] = await pool.execute(query, [followerId, followingId]) as any;

        return result.length > 0; // Returns true if following, false otherwise

    } catch (error) {
        console.log(error, "Error in Checking Following.")
    }
}

export const deleteImage = async (imagePath: string ) => {
    try {
        fs.unlinkSync(imagePath);
    } catch (error) {
        console.log(error, "Error in Deleting Image.")
    }
}

export const getProfileTweets = async (logedInUserId: number, profileUserId: number) => {
    try {
        const query = `select 
                            u.userName, u.profilePic, u.firstName, u.lastName,t.tweet_id, t.tweetContent, t.tweetImg, t.updated_at,'original' AS type,
                            (select count(*) from likes where tweet_id = t.tweet_id) AS likeCount,
                            (select count(*) from comments where tweet_id = t.tweet_id) AS commentCount,
                            (select count(*) from retweets where tweet_id = t.tweet_id) AS retweetCount,
                            exists(select 1 from likes where user_id = ? AND tweet_id = t.tweet_id) AS isLiked
                        from tweets t
                        join users u ON t.user_id = u.user_id
                        where t.user_id = ?
                        group by t.tweet_id
                        order by t.updated_at DESC;`

        const [tweets] = await pool.execute(query, [logedInUserId, profileUserId]) as any;

        return tweets;

    } catch (error) {
        console.log(error, "Error in Getting Profile Tweets.")
    }
}

export const getProfileRetweets = async (logedInUserId: number, profileUserId: number) => {
    try {

        const profileRetweetsQuery = `select 
                                u.userName, u.profilePic, u.firstName, u.lastName,t.tweet_id, t.tweetContent, t.tweetImg, rt.created_at AS updated_at,'retweet' AS type,
                                rt_user.userName AS retweeterName,
                                (select count(*) from likes where tweet_id = t.tweet_id) AS likeCount,
                                (select count(*) from comments where tweet_id = t.tweet_id) AS commentCount,
                                (select count(*) from retweets where tweet_id = t.tweet_id) AS retweetCount,
                                exists(select 1 from likes where user_id = ? AND tweet_id = t.tweet_id) AS isLiked
                            from retweets rt
                            join tweets t ON rt.tweet_id = t.tweet_id
                            join users u ON t.user_id = u.user_id 
                            join users rt_user ON rt.user_id = rt_user.user_id
                            where rt.user_id = ?;`

        const [profileRetweets] = await pool.execute(profileRetweetsQuery, [logedInUserId, profileUserId]) as any;

        return profileRetweets;

    } catch (error) {
        console.log(error, "Error in Getting Profile Retweets.")
    }
}

export const getHomeTweets = async (logedInUserId: number) => {
    try {

        const getTweetsQ = `select 
                                u.userName, u.profilePic, u.firstName, u.lastName,t.tweet_id, t.tweetContent, t.tweetImg, t.updated_at,'original' AS type,
                                (select count(*) from likes where tweet_id = t.tweet_id) AS likeCount,
                                (select count(*) from comments where tweet_id = t.tweet_id) AS commentCount,
                                (select count(*) from retweets where tweet_id = t.tweet_id) AS retweetCount,
                                exists(select 1 from likes where user_id = ? AND tweet_id = t.tweet_id) AS isLiked
                            from tweets t
                            join users u ON t.user_id = u.user_id
                            where t.user_id = ? OR t.user_id IN (select following_id from follow where follower_id = ?);`

        const [tweets] = await pool.execute(getTweetsQ, [logedInUserId, logedInUserId , logedInUserId]) as any;

        const getRetweetsQ = `select 
                                u.userName, u.profilePic, u.firstName, u.lastName,t.tweet_id, t.tweetContent, t.tweetImg, rt.created_at AS updated_at,'retweet' AS type,
                                rt_user.userName AS retweeterName,
                                (select count(*) from likes where tweet_id = t.tweet_id) AS likeCount,
                                (select count(*) from comments where tweet_id = t.tweet_id) AS commentCount,
                                (select count(*) from retweets where tweet_id = t.tweet_id) AS retweetCount,
                                exists(select 1 from likes where user_id = ? AND tweet_id = t.tweet_id) AS isLiked
                            from retweets rt
                            join tweets t ON rt.tweet_id = t.tweet_id
                            join users u ON t.user_id = u.user_id 
                            join users rt_user ON rt.user_id = rt_user.user_id
                            where rt.user_id = ? OR rt.user_id IN (select following_id from follow where follower_id = ?);`

        const [retweets] = await pool.query(getRetweetsQ, [logedInUserId.toString(), logedInUserId.toString(), logedInUserId.toString()]) as any;

        const timeline = [...tweets, ...retweets].sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        return timeline;

    } catch (error) {
        console.log(error, "Error in Getting Home Tweets.")
    }
}

export const getCommnetsDetails = async (tweetId: number) => {
    try {
        const query = `select u.userName , u.profilePic , t.tweet_id , c.commentText ,c.created_at
                        from tweets as t
                        join comments as c on c.tweet_id = t.tweet_id
                        join users as u on u.user_id = c.user_id
                        where t.tweet_id = ? 
                        order by c.created_at desc;`

        const [comments] = await pool.execute(query, [tweetId]) as any;
        return comments;
    } catch (error) {
        console.log(error, "Error in Getting Comments Details.")
    }
}


export const getTweetCount = async (userId: number) => {
    try {
        const query = `select count(*) as tweetCount from tweets where user_id=?`
        const [result] = await pool.execute(query, [userId]) as any;
        return result[0].tweetCount;
    } catch (error) {
        console.log(error, "Error in Getting Tweet Count.")
    }
}

export const getFollowFollowingUsers = async (userId: number) => {
    try {
        const followersQuery = `select u.user_id, u.userName, u.firstName, u.lastName, u.profilePic from follow as follow
                                join users as u 
                                on follow.follower_id = u.user_id
                                where follow.following_id=?`

        const followingQuery = `select u.user_id, u.userName, u.firstName, u.lastName, u.profilePic from follow as follow
                                join users as u 
                                on follow.following_id = u.user_id
                                where follow.follower_id=?`

        const [followers] = await pool.execute(followersQuery, [userId]) as any;
        const [following] = await pool.execute(followingQuery, [userId]) as any;

        return { followers, following }

    } catch (error) {
        console.log(error, "Error in Getting Follow/Following Users.")
    }
}