import React from 'react';

function ImageModal({ image, userThumbnail, onClose }) {
  const downloadImage = () => {
    // Create an anchor element to trigger the download
    const link = document.createElement('a');
    link.href = image.urls.full;
    link.download = 'downloaded_image.jpg'; // You can customize the download filename
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className="clicked-image"
        />
        <div className="image-details">
          <div className="user-info">
            {userThumbnail ? (
              <img
                src={userThumbnail}
                alt={`${image.user.username}'s profile thumbnail`}
                className="user-thumbnail"
              />
            ) : (
              <div>Loading...</div> // You can provide a loading indicator here
            )}
            <div className="username-details">
              <h3>{image.user.name}</h3>
              <p>@{image.user.username}</p>
            </div>
          </div>
          <div className="download-likes">
            <p>{image.downloads} downloads</p>
            <p>
              <i className="fa fa-thumbs-up"></i> {image.likes}
            </p>
          </div>
          <div className="tags">
          <p>Tags: {image.tags ? image.tags.map((tag) => tag.title).join(', ') : 'No tags'}</p>
          </div>
          <button onClick={downloadImage}>Download</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
