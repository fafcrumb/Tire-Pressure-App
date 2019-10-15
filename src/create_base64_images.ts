
import _data from './data.json';
import * as fs from 'fs';
import * as path from 'path';

const data: any = _data;
const imagesPath = path.join(__dirname, '../small_images');
const dataJSONPath = path.join(__dirname, 'data.json');
const base64Prefix = (fileType: string) => `data:image/${fileType};base64,`

fs.readdir(imagesPath, (err, files) => {
  if (err) console.log(err);

  for (let fileName of files) {
    let fileType = fileName.endsWith('jpg') ? 'jpeg' : undefined;
    if (fileType) {
      let fileNumber: number = parseInt(fileName.slice('frame'.length, fileName.indexOf('.')));
      let imgBase64 = base64Prefix(fileType) + fs.readFileSync(`${imagesPath}/${fileName}`, 'base64');
      data.artist_frames[fileNumber - 1].img_placeholder = imgBase64;
    } 
  }

  fs.writeFileSync(dataJSONPath, JSON.stringify(data), 'utf8');
});

// for (let artist of data.artist_frames) {
//   const imageAsBase64 = fs.readFileSync('./your-image.png', 'base64');
// }