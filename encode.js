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
    if (path == "./0000008.jpg") {
      console.log("create GIF now ... 3 .. 2 .. 1 ...")
      let newfilename = Date.now() + ".gif";
      exec("ffmpeg -y -f image2 -i ./%07d.jpg output/" + newfilename, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          console.log('---- remove old files....')
          exec("rm ./*.jpg");

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