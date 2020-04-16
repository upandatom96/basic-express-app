const mongoose = require('mongoose');
require('./Bookmark.model');
const Bookmark = mongoose.model('bookmark');
const bookmarkValidator = require('./bookmark.validator');

function getAllBookmarks() {
  return new Promise((resolve, reject) => {
    Bookmark.find({})
      .then((bookmarks) => {
        resolve(bookmarks);
      });
  });
}

function getBookmarkById(id) {
  return new Promise((resolve, reject) => {
    Bookmark.findOne({
      _id: id
    })
      .then((bookmark) => {
        if (bookmark) {
          resolve(bookmark);
        } else {
          reject({
            message: "Failed to find bookmark"
          });
        }
      });
  });
}

function addBookmark(bookmark) {
  return new Promise((resolve, reject) => {
    const errors = bookmarkValidator.checkForBookmarkCreateErrors(bookmark);
    if (errors.length > 0) {
      reject(errors);
    }
    else {
      new Bookmark({
        name: bookmark.name,
        url: bookmark.url,
        type: bookmark.type
      })
        .save()
        .then((resBookmark) => {
          resolve(resBookmark);
        });
    }
  });
}

function editBookmark(bookmark) {
  return new Promise((resolve, reject) => {
    const errors = bookmarkValidator.checkForBookmarkEditErrors(bookmark);
    if (errors.length > 0) {
      reject({
        errors: errors
      });
    } else {
      const id = bookmark._id;
      Bookmark.findOne({
        _id: id
      })
        .then((foundBookmark) => {
          if (!foundBookmark) {
            reject({
              message: `Failed to find bookmark`
            });
          } else {
            foundBookmark.name = bookmark.name;
            foundBookmark.url = bookmark.url;
            foundBookmark.type = bookmark.type;

            foundBookmark.save()
              .then((editedBookmark) => {
                resolve(editedBookmark);
              });
          }
        });
    }
  });
}

function deleteOneBookmark(id) {
  return new Promise((resolve, reject) => {
    Bookmark.deleteOne({
      _id: id
    })
      .then(() => {
        resolve({
          message: `Bookmark with given id deleted or never existed`
        });
      });
  });
}

module.exports = {
  getAllBookmarks,
  getBookmarkById,
  addBookmark,
  editBookmark,
  deleteOneBookmark
}
