# installation

  - install [brew](https://brew.sh/) 
  - open terminal
  
"""
brew install ffmpeg
brew install node
"""

"""
cd TO_YOUR_PROJECT_FOLDER/
npm install
node encode.js
"""

Make sure folder images and folder output exist in directory.

Make a test with ffmpeg (make sure there are images with pattern 0000001.jpg e.q. 7digits)

"""
ffmpeg -y -i images/%07d.jpg -vf fps=15,scale=720:-1 output/output.gif
"""

Change the number after scale for (720) for adapting size and fps for gif speed.