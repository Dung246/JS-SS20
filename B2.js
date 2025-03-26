document.addEventListener('DOMContentLoaded', loadBookmarks);

function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function loadBookmarks() {
    const bookmarksList = document.getElementById('bookmarksList');
    bookmarksList.innerHTML = '';
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.forEach((bookmark, index) => {
        const bookmarkItem = document.createElement('div');
        bookmarkItem.className = 'bookmark';
        bookmarkItem.innerHTML = `
            <span>🔗 <a href="${bookmark.url}" target="_blank">${bookmark.name}</a></span>
            <button onclick="deleteBookmark(${index})">&times;</button>
        `;
        bookmarksList.appendChild(bookmarkItem);
    });
}

function addBookmark() {
    const name = document.getElementById('bookmarkName').value.trim();
    const url = document.getElementById('bookmarkUrl').value.trim();

    if (!name || !url) {
        alert('Please fill in both fields');
        return;
    }

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push({ name, url });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('bookmarkName').value = '';
    document.getElementById('bookmarkUrl').value = '';
    closeModal();
    loadBookmarks();
}

function deleteBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    loadBookmarks();
}
