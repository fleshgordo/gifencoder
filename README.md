# Create gifs on the fly

### Installation

  - install [brew](https://brew.sh/) 
  - open terminal
  
```bash
brew install ffmpeg
brew install node
```

```bash
cd TO_YOUR_PROJECT_FOLDER/
npm install
```

Make sure folder images and folder output exist in directory.

### Test

Make a test with ffmpeg (make sure there are images with pattern 0000001.jpg e.q. 7digits)

```bash
ffmpeg -y -i images/%07d.jpg -vf fps=15,scale=720:-1 output/output.gif
```

Change the number after scale for (720) for adapting size and fps for gif speed.

### Run

```bash
node encode.js
```