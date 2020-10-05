/* Storing
- (file/disk storage) to folder and save
> const upload = multer({ dest: 'uploads/' });
- (memory storage) in memory and buffer
> const upload = multer({ storage: storage })
> just process and upload them into cloudinary
*/

const multer = require('multer');
const storage = multer.memoryStorage();
const ALLOWED_FORMAT = ['image/jpeg', 'image/jpg', 'image/png'];
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      // To accept the file pass `true`:
      cb(null, true);
    } else {
      // Pass an error if something goes wrong and to reject this file pass `false`:
      cb(new Error('Not supported file format!'), false);
    }
  }
});

module.exports = upload;
