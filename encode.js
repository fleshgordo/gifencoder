let chokidar = require('chokidar');
const {
  exec
} = require("child_process");



var watcher = chokidar.watch('./', {
  ignored: ['**/node_modules/**/*', '**/.git/**/*','**/output/**/*'],
  persistent: true
});

watcher
  .on('add', function (path) {
    console.log('File', path, 'has been added');
    if (path.indexOf(".tar") != -1) {
      console.log("### extracting tar file")
      exec("tar -xf " + path + " -C images/");
    }
    else if (path == "images/0000499.jpg") {
      console.log("### create GIF now ... 3 .. 2 .. 1 ...")
      let newfilename = Date.now() + ".gif";
      exec("ffmpeg -y -f image2 -i ./images/%07d.jpg output/" + newfilename, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          console.log("### remove old files....")
          exec("rm ./images/*.jpg"); // remove tmp image files
          exec("rm ./*.tar"); // remove tar image

          return;
        }
        console.log(`stdout: ${stdout}`);
      });

    }
  })
  .on('change', function (path) {
    console.log('File', path, 'has been changed');
  })
  .on('unlink', function (path) {
    console.log('File', path, 'has been removed');
  })
  .on('error', function (error) {
    console.error('Error happened', error);
  })