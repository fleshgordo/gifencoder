
let chokidar = require('chokidar');
const {
  exec
} = require("child_process");



var watcher = chokidar.watch('images/', {
  ignored: /^\./,
  persistent: true
});

watcher
  .on('add', function (path) {
    console.log('File', path, 'has been added');
    if (path == "images/0000008.jpg") {
      console.log("create GIF now ... 3 .. 2 .. 1 ...")
      let newfilename = Date.now() + ".gif";
      exec("ffmpeg -y -f image2 -i images/%07d.jpg output/" + newfilename, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });

    }
  })
  .on('change', function (path) {
    console.log('File', path, 'has been changed');
    if (path == "images/myanimated.gif") {


      fs.readdir('.', (error, files) => {
        if (error) throw error;
        files.filter(name => /images\.\d+\.png$/.test(name)).forEach(fs.unlink);
      });
    }
  })
  .on('unlink', function (path) {
    console.log('File', path, 'has been removed');
  })
  .on('error', function (error) {
    console.error('Error happened', error);
  })