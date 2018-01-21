var imageGallery = imageGallery || {};

imageGallery = (function() {
    var TITLE_LENGTH = 25;
    var imageGalleryList = document.getElementById('image-gallery');


    function createThumbnail(setting) {
        var tmpl = document.getElementById('thumbnail-template').content.cloneNode(true);
        tmpl.getElementById('imageTitle').innerText = setting.title.trim()? setting.title.substring(0,TITLE_LENGTH) : "No Title";
        tmpl.getElementById('imageAuthor').innerText = setting.author? setting.author.substring(setting.author.lastIndexOf("(\"")+2,setting.author.lastIndexOf("\")")) : "No Author" ;
        tmpl.getElementById('imageDate').innerText = setting.date_taken ? formatDate(new Date(setting.date_taken)) : "";
        tmpl.getElementById('imageLink').setAttribute('href', setting.link);
        tmpl.getElementById('imageSrc').setAttribute('src',setting.media.m);
        tmpl.getElementById('authorImages').addEventListener('click',function(){
            refreshImageGallery(setting.author_id)
        });


        imageGalleryList.appendChild(tmpl);
    }

    function refreshImageGallery(authorId){
        imageGalleryList.innerHTML = "";
        document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('head')[0].lastChild);
        getRequest(authorId || "");
    }

    function getRequest(userId){
        var script = document.createElement('script');
        if(userId){
            script.src = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&id='+userId;
        }
        else{
            script.src = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
        }

        document.getElementsByTagName('head')[0].appendChild(script);
    }



    function formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    return {
        createThumbnail:createThumbnail,
        refreshImageGallery:refreshImageGallery
    }
})();