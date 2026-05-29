const getSearchInput = document.getElementById("searchString")

getSearchInput.addEventListener("input", async () => {
    const searchString = getSearchInput.value.trim()
    const searchContainer = document.getElementById("searchResults");
    searchContainer.innerHTML = "";

    if (searchString.length > 0) {
        try {
            const response = await fetch(`/user/searchUsers?searchStr=${searchString}`)
            const data = await response.json()
            data.forEach(element => {
                const searchResultsContainer = document.createElement("div")
                searchResultsContainer.classList.add("search-result-item")
                searchResultsContainer.innerHTML = `
                    <div class="search-result-avatar">
                        <img src="/${element.profilePic ? element.profilePic : 'uploads/defaultPhotos/avtarPhoto.png'}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                    </div>
                    <div class="search-result-info">
                        <span class="search-result-name">${element.firstName} ${element.lastName}</span>
                        <span class="search-result-username">@${element.userName}</span>
                    </div>
                `
                searchResultsContainer.addEventListener("click", () => {
                    window.location.href = `/user/profile/${element.userName}`
                })
                document.getElementById("searchResults").appendChild(searchResultsContainer)
            });
        } catch (error) {
            console.error("Error fetching search results:", error)
        }
    }

})