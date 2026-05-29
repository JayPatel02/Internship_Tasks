function openEditProfile() {
    document.getElementById('editDiv').style.display = 'flex';
}

function closeEditProfile() {
    document.getElementById('editDiv').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('editDiv');
    if (event.target == modal) {
        closeEditProfile();
    }
}

document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch("/user/profile/update", {
        method: "POST",
        body: new FormData(document.getElementById('editProfileForm'))
    })
    if (res.ok) {
        window.location.reload();
    }
})

function switchTab(tabName) {
    const postsCont = document.getElementById('posts-container');
    const repostsCont = document.getElementById('reposts-container');
    const postsTab = document.getElementById('posts-tab');
    const repostsTab = document.getElementById('reposts-tab');

    if (tabName === 'posts') {
        postsCont.style.display = 'block';
        repostsCont.style.display = 'none';
        postsTab.style.fontWeight = 'bold';
        postsTab.style.color = 'var(--text)';
        repostsTab.style.fontWeight = 'normal';
        repostsTab.style.color = 'var(--text-light)';
    } else {
        postsCont.style.display = 'none';
        repostsCont.style.display = 'block';
        repostsTab.style.fontWeight = 'bold';
        repostsTab.style.color = 'var(--text)';
        postsTab.style.fontWeight = 'normal';
        postsTab.style.color = 'var(--text-light)';
    }
}

function openFollowFollowingDisplay(type , userName) {
    document.getElementById('followFollowingDisplay').style.display = 'flex';
    switchFollowModel(type , userName);
}

function closeFollowFollowingDisplay() {
    document.getElementById('followFollowingDisplay').style.display = 'none';
}

async function switchFollowModel(type,userName) {
    const followersTab = document.getElementById('followersTab');
    const followingTab = document.getElementById('followingTab');

    if (type === 'followers') {
        followersTab.classList.add('active');
        followingTab.classList.remove('active');
    } else {
        followingTab.classList.add('active');
        followersTab.classList.remove('active');
    }

    const container = document.getElementById('userListContainer');
    container.innerHTML = '<div class="loading">Loading...</div>';

    const res = await fetch(`/user/getFollowFollowingUsers/${userName}`)
    if (res.ok) {
        const data = await res.json();
        const users = type === 'followers' ? data.followers : data.following;
        if (users.length === 0) {
            container.innerHTML = `<div class="no-users">No ${type} found.</div>`;
            return;
        }
        container.innerHTML = users.map(user => `
        <div class="user-item" onclick="window.location.href='/user/profile/${user.userName}'">
            <div class="user-avatar">
                <img src="/${user.profilePic ? user.profilePic : 'uploads/defaultPhotos/avtarPhoto.png'}" 
                     style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="user-info">
                <span class="user-name">${user.firstName} ${user.lastName}</span>
                <span class="user-handle">@${user.userName}</span>
            </div>
        </div>
    `).join('');
    } else {
        container.innerHTML = '<div class="error">Failed to load users.</div>';
    }
}

function openChangePassword() {
    document.getElementById('changePasswordDiv').style.display = 'flex';
}

function closeChangePassword() {
    document.getElementById('changePasswordDiv').style.display = 'none';
}

async function changePassword(){
    if(validateCurrentNewPass() && validatePass() && comparePass() ){
        const res = await fetch("/user/changePassword",{
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ newPassword : currpassword.value.trim()})
        })
        if(res.ok){
            window.location.reload()
        }
    }
}

function validateCurrentNewPass(){
    const currentPassInput = document.getElementById("currentPass")
    const newPassInput = document.getElementById("pass") 
    let isValid = true
    if(currentPassInput.value.trim() === ""){
        currentPassInput.style.border = "1px solid red"
        isValid = false
    } else {
        currentPassInput.style.border = "1px solid #e6ecf0"
    }
    if(currentPassInput.value.trim() === newPassInput.value.trim()){
        document.getElementById("passErr").style.display = "block"
        isValid = false
    }else{
        document.getElementById("passErr").style.display = "none"
    }
    return isValid;
}