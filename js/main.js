(function() {
    var reload_imageGallery = document.getElementById('reload_imageGallery');
    reload_imageGallery.addEventListener('click', function(){
        imageGallery.refreshImageGallery();
    });

    if (!('content' in document.createElement('template'))) {
        alert('templates are not supported in this browser');
    }

    reload_imageGallery.click();
})();



function jsonFlickrFeed(response) {
    if(response && response.items){
        response.items.forEach(function(item){
            imageGallery.createThumbnail(item);
        });
    }
}