// console.log('myscript yo')

zip.useWebWorkers = false;

document.querySelectorAll(".content-navigation .content-navigation")[0].innerHTML += '<li><a id="clickme" class="button red" >Fakku Downloader</a></li>'

var fakkuDownloader = document.querySelectorAll('#clickme')[0];

var path = document.querySelectorAll(".images a img")[0].src.replace('thumbs', 'images').replace(/\d+.thumb.jpg/, '')
var pages = parseInt(document.querySelectorAll(".wrap")[1].querySelectorAll("div.row")[4].querySelectorAll("div.right")[0].innerHTML.match(/\d+/g), 10);
var zipFileName = path.replace(/https:\/\/t.fakku.net\/images\/manga\/.\//, '').replace(/\/images.+/, '') + '.zip'

document.getElementById("clickme").addEventListener("click", function(e) {

  fakkuDownloader.innerHTML = 'downloading...'  

  var downloaded = 0;

  // console.log(path)
  // console.log('pages: ' + pages)

  var blobs = [];


    // console.log('zip.createWriter')

    for (var i = 1; i <= pages; i++) {

      // console.log('loop')

      var filenamez = pad(i) + '.jpg'
      var page_path = path + filenamez;

      // console.log(filenamez)
      // console.log(page_path)

      var xhr = new XMLHttpRequest();
      xhr.filename = filenamez
      xhr.open('GET', page_path, true);
      xhr.responseType = 'blob';

      xhr.onload = function(e) {
        // console.log('onload')
        if (this.status == 200) {
          var blob = new Blob([this.response], {type: 'image/jpeg'});
          blob.filename = this.filename
          // console.log(blob)

          blobs.push(blob)

          downloaded++
          fakkuDownloader.innerHTML = 'downloading: ' + downloaded + '/' + pages

          if (downloaded === pages){
            // console.log('fine downloads')

            // var compressi = 0;

            zip.createWriter(new zip.BlobWriter("application/zip"), function(zipWriter) {

              zipBlob(zipWriter, blobs)

            });

           

          }

        }
      };

      xhr.send();



    };

  

  e.preventDefault();
});

function zipBlob(zipWriter, blobsArray) {
  // use a zip.BlobWriter object to write zipped data into a Blob object
  // zip.createWriter(new zip.BlobWriter("application/zip"), function(zipWriter) {
    // use a BlobReader object to read the data stored into blob variable

    // console.log('lol')

    zipWriter.add(blobsArray[0].filename, new zip.BlobReader(blobsArray[0]), function() {

      // console.log('lol1d')

      blobsArray.shift()

      fakkuDownloader.innerHTML = 'compressing: ' + (pages - blobsArray.length) + '/' + pages

      if (blobsArray.length === 0){
        // console.log('lol finale')
        zipWriter.close(function(zippedBlob){
          fakkuDownloader.innerHTML = 'complete!'
          // console.log(zippedBlob);
          saveAs(zippedBlob, zipFileName);
        });
      } else {
        // callback();
        // console.log('lol continus')
        zipBlob(zipWriter, blobsArray);
      }

      

      // close the writer and calls callback function
      // zipWriter.close(callback);
    });
  // }, onerror);
}

function onerror(message) {
  // console.error(message);
}

function pad(number) {
  if (number<=999) { number = ("00"+number).slice(-3); }
  return number;
}