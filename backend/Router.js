const bcrypt = require("bcrypt");
const { spawn } = require("child_process");

class Router {
  constructor(app, db) {
    this.login(app, db);
    this.logout(app, db);
    this.isLoggedIn(app, db);
    this.fetchM(app, db);
    this.pythonCM(app, db);
  }

  login(app, db) {
    app.post("/login", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;
      console.log(username);
      console.log(password);
      username = username.toLowerCase();
      if (username.length > 12 || password.length > 12) {
        res.json({
          success: false,
          msg: "An errors occured, please try again",
        });
        return;
      }
      let cols = [username];
      db.query(
        "SELECT * FROM user WHERE username =? LIMIT 1",
        cols,
        (err, data, fields) => {
          if (err) {
            res.json({
              success: false,
              msg: "An errors occured, please try again",
            });
            return;
          }
          if (data && data.length === 1) {
            bcrypt.compare(
              password,
              data[0].password,
              (bcryptErr, verified) => {
                if (verified) {
                  req.session.userID = data[0].id;
                  res.json({
                    success: true,
                    username: data[0].username,
                  });
                  return;
                } else {
                  res.json({
                    success: false,
                    msg: "Invalid Password",
                  });
                }
              }
            );
          } else {
            res.json({
              success: false,
              msg: "User not found try again!!!",
            });
          }
        }
      );
    });
  }

  fetchM(app, db) {
    app.post("/fetchM", (req, res) => {
      db.query("SELECT m.id, m.name,m.author, m.img,CONCAT('[', GROUP_CONCAT(CONCAT('{\"id\": ', r.id, ', \"review\": \"', r.review, '\", \"rating\": ', r.rating, '}')), ']') AS reviews_with_ratings FROM bookdetails m JOIN bookreviews r ON m.id = r.book_id GROUP BY m.id, m.name, m.img;", (err, data, fields) => {
        if (err) {
          res.json({
            success: false,
            msg: "en errors occured, please try again"+err,
          });
          return;
        }
        res.json({
          success: true,
          id: data,
        });
        return;
      });
      console.log("ABI3");
    });
  }

  pythonCM(app, db) {
    app.post("/newReview", (req, res) => {
      const bookid = req.body.bookid;
      const review = req.body.review;
      const bookname = req.body.bookname;
      const rating = req.body.rating;
      console.log("ABIP");
      console.log(bookid);
      console.log("ABIP2");
      const query =
        "INSERT INTO bookreviews (book_id, name,review,rating) VALUES (?, ?, ?, ?)";
      const values = [bookid, bookname, review,rating];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error occurred:", err);
          res.json({
            success: false,
            msg: "An error occurred while inserting data, please try again",
          });
          return;
        }

        console.log("Insert Successful");
        res.json({
          success: true,
          msg: "Record inserted successfully",
          id: result.insertId, // Return the ID of the inserted record
        });
      });
      console.log("ABI3");
      //console.log(outputData);
    });

    app.post("/deleteReview", (req, res) => {
      const reviewId = req.body.id;
  
      // Check if the ID is provided
      if (!reviewId) {
        return res.json({
          success: false,
          msg: "Review ID is required",
        });
      }
  
      // SQL query to delete the review by ID
      const query = "DELETE FROM bookreviews WHERE id = ?";
  
      db.query(query, [reviewId], (err, result) => {
        if (err) {
          console.error("Error occurred while deleting review:", err);
          res.json({
            success: false,
            msg: "An error occurred while deleting the review. Please try again.",
          });
          return;
        }
  
        // Check if a row was actually deleted
        if (result.affectedRows === 0) {
          res.json({
            success: false,
            msg: "No review found with the given ID",
          });
        } else {
          res.json({
            success: true,
            msg: "Review deleted successfully",
          });
        }
      });
    });
  }

  logout(app, db) {
    app.post("/logout", (req, res) => {
      if (req.session.userID) {
        req.session.destroy();
        res.json({
          success: true,
        });
        return true;
      } else {
        res.json({
          success: false,
        });
        return false;
      }
    });
  }
  isLoggedIn(app, db) {
    app.post("/isLoggedIn", (req, res) => {
      if (req.session.userID) {
        let cols = [req.session.userID];
        db.query(
          "SELECT * FROM user WHERE id=? LIMIT 1",
          cols,
          (err, data, fields) => {
            if (data && data.length === 1) {
              res.json({
                success: true,
                username: data[0].username,
              });
              return true;
            } else {
              res.json({
                success: false,
              });
            }
          }
        );
      } else {
        res.json({
          success: false,
        });
      }
    });
  }
}
module.exports = Router;
