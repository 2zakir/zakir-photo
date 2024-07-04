document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const downloadBtn = document.getElementById('download');
    let currentIndex = 0;
    let zoomLevel = 1;

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            currentIndex = index;
            showImage(thumbnail.dataset.full);
        });
    });

    closeBtn.addEventListener('click', function () {
        closeLightbox();
    });

    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        showImage(thumbnails[currentIndex].dataset.full);
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        showImage(thumbnails[currentIndex].dataset.full);
    });

    zoomInBtn.addEventListener('click', function () {
        zoomLevel += 0.1;
        updateZoom();
    });

    zoomOutBtn.addEventListener('click', function () {
        zoomLevel = Math.max(1, zoomLevel - 0.1);  // Ensure zoom level doesn't go below 1
        updateZoom();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });

    lightboxImg.addEventListener('wheel', function (event) {
        event.preventDefault();
        if (event.deltaY < 0) {
            zoomLevel += 0.2;
        } else {
            zoomLevel = Math.max(1, zoomLevel - 0.2);
        }
        updateZoom();
    });

    function showImage(src) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        downloadBtn.href = src;  // Set the download link
        resetZoom();
    }

    function updateZoom() {
        lightboxImg.style.transform = `scale(${zoomLevel})`;
    }

    function resetZoom() {
        zoomLevel = 1;
        updateZoom();
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        resetZoom();
    }
});
