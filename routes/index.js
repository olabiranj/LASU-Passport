var express = require('express');
var router = express.Router();
let fs = require('fs');
// dependencies
const download = require('image-downloader');


/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.render('index', { msg: ""});
  })
  .post((req, res, next) => {
    let mat = req.body.matric;
    let MAT = mat.trim()
    // Download to a directory and save with the original filename
    const options = {
      url: `http://studentservices.lasu.edu.ng/returningstudents/images/stud_image/${MAT}.jpg`,
      dest: './public/uploads'                  // Save to /path/to/dest/image.jpg
    }

    download.image(options)
      .then(({ filename, image }) => {
        console.log('File saved to', filename);
        res.download(`./${filename}`);
        res.redirect('/');
      })
      .catch((err) => {
        res.render('index', { msg: "You input a wrong matric number or you're probably not a lasuite"})
      })
  })

router.get('/test', (req, res, next) => {
  res.download("./public/uploads/150115008.jpg", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Image successfully download');
    }
  });

})

module.exports = router;