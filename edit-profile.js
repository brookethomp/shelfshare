document.addEventListener('DOMContentLoaded', () => {
    const editProfileForm = document.getElementById('editProfileForm');
    const profilePhotoInput = document.getElementById('profilePhoto');
    const nameInput = document.getElementById('name');
    const bioInput = document.getElementById('bio');
    const genresInput = document.getElementById('genres');
    const booksInput = document.getElementById('books');
    const message = document.getElementById('message');

    // Load current profile data
    async function loadProfileData() {
        try {
            const response = await fetch('/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const user = await response.json();

            // Populate the form with existing profile data
            nameInput.value = user.name || '';
            bioInput.value = user.bio || '';
            genresInput.value = user.genres?.join(', ') || '';
            booksInput.value = user.favoriteBooks?.join(', ') || '';
        } catch (error) {
            console.error('Error loading profile data:', error);
            message.textContent = 'Failed to load profile data.';
            message.style.color = 'red';
        }
    }

    // Handle form submission to update profile
    editProfileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('bio', bioInput.value);
        formData.append('genres', genresInput.value.split(',').map((genre) => genre.trim()));
        formData.append('favoriteBooks', booksInput.value.split(',').map((book) => book.trim()));

        // Handle file upload if a new photo is provided
        if (profilePhotoInput.files[0]) {
            formData.append('profilePhoto', profilePhotoInput.files[0]);
        }

        try {
            const response = await fetch('/profile', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (result.status === 'success') {
                message.textContent = 'Profile updated successfully!';
                message.style.color = 'green';
                // Redirect to the profile page
                setTimeout(() => {
                    window.location.href = '/profile.html';
                }, 2000);
            } else {
                throw new Error(result.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            message.textContent = 'Failed to update profile.';
            message.style.color = 'red';
        }
    });

    // Load profile data on page load
    loadProfileData();
});
