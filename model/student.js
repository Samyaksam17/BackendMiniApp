const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const { query } = require("express");
const { options } = require("../routes");

// Student schema

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  confirmPassword: {
    type: String,
    // required: true,
    min: 6,
  },
  mobile: {
    type: Number,
    min: 10,
  },
  Fathers_name: {
    type: String,
  },
  thought: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

// validator
studentSchema.plugin(uniqueValidator);

const Student = mongoose.model("student", studentSchema);

// add student
const addStudent = (newStudent, callback) => {
  bcrypt.genSalt(8, async function (err, salt) {
    bcrypt.hash(await newStudent.password, salt, function (err, hash) {
      console.log(newStudent.password);
      newStudent.password = hash;
      console.log(newStudent.password); //password encrypted now
      Student.create(newStudent, callback);
    });
  });
};

// get user by id
const singleUser = (query, callback) => {
  Student.findOne(query, callback);
};

// get all users
const getAllUsers = (query, callback) => {
  Student.find(query, callback);
};

// update user
const updateUser = (query, update, options, callback) => {
  Student.findOneAndUpdate(query, update, options, callback);
};

// Compare Password
const matchPassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, function (err, Match) {
      console.log(password);
      console.log(hash)
      // if (err) throw err;
      callback(null, Match);
  });
}

// delete user
const removeUser = (query, callback) => {
  Student.remove(query, callback);
};

module.exports = {
  addStudent,
  singleUser,
  getAllUsers,
  matchPassword,
  updateUser,
  removeUser,
};
