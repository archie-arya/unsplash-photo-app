import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar'; // Import the SearchBar component
import ImageModal from './ImageModal';
import './App.css'; // Import the CSS file
import 'font-awesome/css/font-awesome.min.css';

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Function to fetch photos
    const fetchPhotos = async (query) => {
      try {
        const apiKey = 'VmWWqMyO4w-VCAv85om_FMqgVGD9cvfqbQYWyFm1l2M'; 
        const apiUrl = query
          ? `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`
          : `https://api.unsplash.com/photos?client_id=${apiKey}`;

        const response = await axios.get(apiUrl);
        setPhotos(response.data.results || response.data); // Use the 'results' property for search results
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos(searchQuery); // Fetch photos when the component mounts and when searchQuery changes
  }, [searchQuery]);

  // Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleImageClick = (photo) => {
    setSelectedImage(photo); // Set the selected image details
  };

  const closeModal = () => {
    setSelectedImage(null); // Clear the selected image
  };

  return (
    <div className="homepage">
      <h1 className="title" style={{ fontFamily: 'Pacifico', fontSize: '24px', fontWeight: 'italic' }}>
        Image Gallery
        </h1>
      <SearchBar onSearch={handleSearch} className="search-bar" />
      <div className="photo-list">
        {photos.map((photo) => (
            <div key={photo.id} className="photo-card">
            <img
                src={photo.urls.regular}
                alt={photo.alt_description}
                onClick={() => handleImageClick(photo)}
            />
            <div className="image-details">
                <div className="user-details">
                    <img
                    src={photo.user.profile_image.small}
                    alt={`${photo.user.username}'s profile thumbnail`}
                    className="user-thumbnail"
                    />
                    <span className="username">{photo.user.username}</span>
                </div>
                <div className="likes">
                    <i className="fa fa-thumbs-up"></i> {photo.likes}
                </div>
                {/* Add other image details here */}
                </div>
        </div>
        ))}
        </div>

    {selectedImage && (
        <ImageModal image={selectedImage} userThumbnail={selectedImage.user.profile_image.small} onClose={closeModal} />
    )}
    </div>
  );
}

export default PhotoGallery;
