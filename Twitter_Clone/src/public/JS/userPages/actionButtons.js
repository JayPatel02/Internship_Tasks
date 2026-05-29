async function handleLogout() {
    if (!confirm("Are you sure, You want to logout?")) return
    const res = await fetch("/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
    if (res.status == 200) window.location.href = "/login"
    else alert("Logout Failed.")
}

async function handleDelete(tweetId) {
    if (!confirm("Are you sure you want to delete this tweet?")) return;

    const res = await fetch(`/user/deleteTweet/${tweetId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        window.location.reload();
    } else {
        alert("Failed to delete the tweet.");
    }
}

async function handleLike(tweetId) {
    const sperateId = tweetId.split("-")[1];
    const res = await fetch(`/user/tweet/like/${sperateId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const resData = await res.json();
        const likeSpan = document.getElementById(`like:${tweetId}`);
        const likeIcon = document.getElementById(`likeIcon:${tweetId}`);
        if (resData.message === "Liked") {
            likeSpan.innerText = parseInt(likeSpan.innerText) + 1;
            likeIcon.innerText = "❤️";
        } else {
            if (parseInt(likeSpan.innerText) > 0)
                likeSpan.innerText = parseInt(likeSpan.innerText) - 1;
            likeIcon.innerText = "🤍";
        }
    } else {
        alert("Failed to like the tweet.");
    }
}

async function handleRetweet(tweetId) {
    const res = await fetch(`/user/retweet/${tweetId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        window.location.reload();
    } else {
        alert("Failed to retweet.");
    }
}

async function handleUpdateProfile() {
    if (validateStr()) {
        const formData = new FormData(document.getElementById("editProfileForm"))
        const res = await fetch("/user/profile/update", {
            method: "post",
            body: formData
        })
        const response = await res.json()
        console.log(response)
        if (res.status == 413) {
            document.getElementById("fileSizeErr").style = "block"
            document.getElementById("fileSizeErr").innerText = response.message
        } else {
            document.getElementById("fileSizeErr").style = "none"
        }
        if (res.ok) window.location.reload()
    }
}

async function handleComment(tweetId) {
    const commentSection = document.getElementById(`commentSection:${tweetId}`);
    const sperateId = tweetId.split("-")[1];
    document.getElementById(`commentInput:${tweetId}`).value = "";
    if (commentSection.style.display === "none") {
        commentSection.style.display = "block";

        const res = await fetch(`/user/getComments/${sperateId}`)
        const commentRes = await res.json();
        const commentData = commentRes.comments;
        disPlayComments(commentData, tweetId);

    } else {
        commentSection.style.display = "none";
    }
}

async function postComment(tweetId) {
    const commentInput = document.getElementById(`commentInput:${tweetId}`);
    const commentCount = document.getElementById(`commentCount:${tweetId}`);
    const sperateId = tweetId.split("-")[1];

    if (commentInput.value.trim() === "") {
        commentInput.style.border = "1px solid red";
        return;
    }
    const res = await fetch(`/user/tweet/comment/${sperateId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ commentText: commentInput.value.trim() })
    })
    if (res.ok) {
        document.getElementById(`commentInput:${tweetId}`).value = "";
        commentCount.textContent = parseInt(commentCount.textContent) + 1;
        const commentRes = await res.json();
        const commentData = commentRes.comments;
        disPlayComments(commentData, tweetId);

    } else {
        alert("Failed to post comment.")
    }
}

function disPlayComments(commentData, tweetId) {
    const commentContainer = document.getElementById(`commentsContainer:${tweetId}`);
    commentContainer.innerHTML = "";
    commentData.forEach(comment => {
        const commentElement = document.createElement("div");
        commentElement.style.borderTop = "1px solid #eee";
        commentElement.style.padding = "10px 0";
        commentElement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="/${comment.profilePic || "uploads/defaultPhotos/avtarPhoto.png"}" alt="Profile Picture" style="width: 30px; height: 30px; border-radius: 50%;">
                <span style="font-weight: 600; cursor: pointer;" onclick="window.location.href='/user/profile/${comment.userName}'">${comment.userName}</span>
                <span style="font-size: 12px; color: gray;">${formateDate(comment.created_at)}</span>
            </div>`;
        const textElement = document.createElement("p");
        textElement.style.cssText = "margin: 0; font-size: 0.95rem; line-height: 1.4; color: var(--text); word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; display: block; width: 100%;";

        textElement.textContent = comment.commentText;

        commentElement.appendChild(textElement);
        commentContainer.appendChild(commentElement);
    });
}

function formateDate(dateString) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(dateString);

    const hour12 = date.toLocaleString('en-US', { hour: 'numeric', hour12: true, timeZone });
    const [hour, ampm] = hour12.split(' ');

    const min = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short', timeZone });
    const year = date.getFullYear();

    return `${hour.padStart(2, '0')}:${min} ${ampm}, ${day} ${month}, ${year}`;
}

function handleShare(tweetId) {
    navigator.clipboard.writeText(window.location.origin + `/user/showPost?postId=${tweetId}`)
    alert(`Link copied!`)
}