async function searchFormHandler(event) {
        event.preventDefault();
        let searchedUser = document.querySelector('#search-users').value.trim()
        if (searchedUser) {
            window.location = ('/api/searches/' + searchedUser)
        }
}
document.querySelector('#search-input-cont').addEventListener('submit', searchFormHandler)