<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Profile</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="top">
        <script src="header.js"></script>
    </div>
    <div class="blank-space"></div>
    <div class="profile-container">
        <h1>Edit Your Profile</h1>
        <form id="profileForm">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name">
            <label for="bio">Bio:</label>
            <textarea id="bio" placeholder="Tell us about yourself"></textarea>
            <label for="genres">Favorite Genres:</label>
            <select id="genres" multiple>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
            </select>
            <label for="favoriteBooks">Favorite Books:</label>
            <input type="text" id="favoriteBooks1" placeholder="Book 1">
            <input type="text" id="favoriteBooks2" placeholder="Book 2">
            <input type="text" id="favoriteBooks3" placeholder="Book 3">
            <label for="profilePhoto">Profile Photo:</label>
            <input type="file" id="profilePhoto">
            <button type="submit">Save Profile</button>
        </form>
    </div>
    <div class="footer">
        <script src="footer.js"></script>
    </div>
    <script>
        document.getElementById('profileForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', document.getElementById('name').value);
            formData.append('bio', document.getElementById('bio').value);
            formData.append('genres', Array.from(document.getElementById('genres').selectedOptions).map(option => option.value));
            formData.append('favoriteBooks', [
                document.getElementById('favoriteBooks1').value,
                document.getElementById('favoriteBooks2').value,
                document.getElementById('favoriteBooks3').value
            ]);
            formData.append('profilePhoto', document.getElementById('profilePhoto').files[0]);

            try {
                const response = await fetch('/profile', {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    body: formData
                });
                if (response.ok) {
                    window.location.href = '/profile.html';
                } else {
                    console.error('Failed to update profile');
                }
            } catch (err) {
                console.error('Error updating profile:', err);
            }
        });
    </script>
</body>
</html>
