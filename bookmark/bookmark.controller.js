const express = require('express');
const bookmarkController = express.Router();
const {
  getAllBookmarks,
  getBookmarkById,
  addBookmark,
  editBookmark,
  deleteOneBookmark
} = require("./bookmark.manager");
const authUtil = require('../utilities/auth.util');

bookmarkController.get('/', (req, res) => {
  getAllBookmarks()
    .then((bookmarks) => {
      res.send(bookmarks);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

bookmarkController.get('/:id', (req, res) => {
  const id = req.params.id;
  getBookmarkById(id)
    .then((bookmark) => {
      res.send(bookmark);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

bookmarkController.post('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const bookmark = req.body;
  addBookmark(bookmark)
    .then((addedBookmark) => {
      res.send(addedBookmark);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

bookmarkController.delete('/:id', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const id = req.params.id;
  deleteOneBookmark(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

bookmarkController.put('/', authUtil.jwtAuthenticated, authUtil.jwtAdmin, (req, res) => {
  const bookmark = req.body;
  editBookmark(bookmark)
    .then((editedBookmark) => {
      res.send(editedBookmark);
    })
    .catch((err) => {
      res.statusCode = 500;
      res.send(err);
    });
});

module.exports = bookmarkController;