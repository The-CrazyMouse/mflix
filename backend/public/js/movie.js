// Get the movie ID from the URL path
const movieId = window.location.pathname.split('/')[2];

async function fetchMovieDetails() {
    // Fetch movie details from API
    const response = await fetch(`/api/movies/${movieId}`, {
        method: 'GET'
    });
    const data = await response.json();

    if (data.error) {
        alert(data.error);
        return;
    }

    // Update movie title and plot
    document.getElementById('movieTitle').textContent = data.title;
    document.getElementById('moviePlot').textContent = data.plot;

    // Fetch comments for the movie
    const commentsResponse = await fetch(`/api/comments/${movieId}`, {
        method: 'GET'
    });
    const commentsData = await commentsResponse.json();

    if (commentsData.error) {
        alert(commentsData.error);
        return;
    }

    // Display comments
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';  // Clear previous comments

    commentsData.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<p><strong>${comment.name}</strong>: ${comment.text}</p>`;
        commentsList.appendChild(commentElement);
    });
}

document.getElementById('commentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const text = document.getElementById('commentText').value;

    const response = await fetch(`/api/movies/${movieId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
    });

    if (response.ok) {
        fetchMovieDetails();  // Refresh the comments section
        document.getElementById('commentText').value = '';  // Clear the comment input
    } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add comment');
    }
});

fetchMovieDetails();  // Load movie details and comments when the page loads

