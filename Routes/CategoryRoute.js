const express = require('express');
const router = express.Router();
const {getCategory , createCategory , getCategoryById , updateCategory , deleteCategory} = require("./..//Controllers/CategoryControllers");

router.route('/').get(getCategory)
                 .post(createCategory);

router.route('/:id').get(getCategoryById)
                    .put(updateCategory)
                    .delete(deleteCategory);

module.exports = router;