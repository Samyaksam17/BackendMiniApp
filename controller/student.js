// import model
const Student = require("../model/student");
const Mail = require("../config/mail");

//add Student
const add = (req, res) => {
  var name = req.body.name;
  var dob = req.body.dob;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;
  var mobile = req.body.mobile;
  var Fathers_name = req.body.Fathers_name;
  var thought = req.body.thought;

  //validation
  req.checkBody("name", "name is required").notEmpty();
  req.checkBody("dob", "DOB is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty();
  req.checkBody("password", "password is required").notEmpty();
  req.checkBody("confirmPassword", "confirmPassword is required").notEmpty();
  req.checkBody("mobile", "mobile number is required").notEmpty();
  req.checkBody("Fathers_name", "fathers name  is required").notEmpty();
  req.checkBody("thought", "thought is required").notEmpty();

  var error = req.validationErrors();

  if (error) {
    return res.json({ status: false, message: "validation error" });
  } else {
    let newStudent = {
      name: name,
      dob: dob,
      email: email,
      password: password,
      // confirmPassword: confirmPassword,
      mobile: mobile,
      Fathers_name: Fathers_name,
      thought: thought,
      created_at: Date(),
      updated_at: Date(),
    };
    Student.addStudent(newStudent, (err, student) => {
      if (err) {
        return res.json({ status: false, error: err });
      } else {
        console.log(student);
        Mail.mailOptions = {
          from: "jsamyak407@gmail.com",
          to: student.email,
          subject: "Thankyou for signing up",
          text: "Heyyyyyy good to see you , spread love on our platform!!",
        };

        Mail.transporter.sendMail(Mail.mailOptions, function (error, email) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + email);
          }
        });
        return res.json({
          status: true,
          response: student,
          message: "Add Student Successfully",
        });
      }
    });
  }
};

// login user
const login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Student.singleUser({ email: email }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      console.log(user);

      Student.matchPassword(password, user.password, function (err, Match) {
        if (err) return res.json({ message: "error" }, err);
        if (Match) {
          res.json({
            message: "User Logged In",
            response: user
          })
          } else {
          return res.json({ status: false, message: "Invalid Password" });
        }
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

// get student by id
const userById = (req, res) => {
  let user_id = req.body.user_id;
  Student.singleUser({ _id: user_id }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      return res.json({
        response: user,
        message: "User By Id is",
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

// get all users
const allUsers = (req, res) => {
  let query = req.body.query;
  Student.getAllUsers(query, (err, result) => {
    res.json({ status: true, response: result, totaluser: result.length });
  });
};

// update student details
const update = (req, res) => {
  let user_id = req.body.user_id;
  let name = req.body.name;
  let email = req.body.email;

  Student.updateUser(
    { _id: user_id },
    { name: name, email: email },
    function (err, user) {
      if (err) return res.json({ status: false, error: err });
      if (user) {
        return res.json({
          status: true,
          message: "update success",
        });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    }
  );
};

// remove student
const remove = (req, res) => {
  const user_id = req.body.user_id;

  Student.removeUser({ _id: user_id }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      return res.json({
        status: true,
        response: user,
        message: "removed success",
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

module.exports = { add, login, userById, allUsers, update, remove };
