var ExifImage = require('exif').ExifImage;
 
try {
    new ExifImage({ image : 'IMG_20161017_182800.jpg' }, function (error, exifData) {
        if (error)
            console.log('Error: '+error.message);
        else
            console.log(exifData.exif.DateTimeOriginal); // Do something with your data! 
    });
} catch (error) {
    console.log('Error: ' + error.message);
}
