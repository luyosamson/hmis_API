// src/models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  age: {
    type: Number,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    lowercase: true,
  },
  nextOfKin: {
    type: String,
    required: true,
  },
  nextOfKinPhone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  program_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true,
  },
  health_specialistID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateEnrolled: {
    type: Date,
    default: Date.now,
  },
});

// Auto-calculate age before saving
clientSchema.pre('save', function (next) {
  if (this.dob) {
    const ageDifMs = Date.now() - this.dob.getTime();
    const ageDate = new Date(ageDifMs);
    this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  next();
});

module.exports = mongoose.model('Client', clientSchema);


// const mongoose = require('mongoose');

// const clientSchema = new mongoose.Schema({
//   fname: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   middlename: {
//     type: String,
//     trim: true
//   },
//   lname: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   dob: {
//     type: Date,
//     required: true,
//     validate: {
//       validator: function(dob) {
//         return dob < new Date();
//       },
//       message: 'Date of birth must be in the past'
//     }
//   },
//   gender: {
//     type: String,
//     enum: ['male', 'female', 'other'],
//     required: true
//   },
//   age: {
//     type: Number,
//     min: [0, 'Age cannot be negative']
//   },
//   phone: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: function(v) {
//         return /^[0-9]{10,15}$/.test(v);
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     }
//   },
//   email: {
//     type: String,
//     lowercase: true,
//     trim: true,
//     validate: {
//       validator: function(v) {
//         return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
//       },
//       message: props => `${props.value} is not a valid email!`
//     }
//   },
//   nextOfKin: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   nextOfKinPhone: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function(v) {
//         return /^[0-9]{10,15}$/.test(v);
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     }
//   },
//   location: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   // Array of program references (many-to-many)
//   programs: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Program',
//     required: true
//   }],
//   // Single health specialist reference (many-to-one)
//   healthSpecialist: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'HealthSpecialist',
//     required: true
//   },
//   dateEnrolled: {
//     type: Date,
//     default: Date.now,
//     immutable: true
//   },
//   lastUpdated: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Auto-calculate age before saving/updating
// clientSchema.pre('save', function(next) {
//   this.updateAge();
//   this.lastUpdated = new Date();
//   next();
// });

// clientSchema.pre('findOneAndUpdate', function(next) {
//   this._update.lastUpdated = new Date();
//   next();
// });

// // Method to calculate age
// clientSchema.methods.updateAge = function() {
//   if (this.dob) {
//     const ageDifMs = Date.now() - this.dob.getTime();
//     const ageDate = new Date(ageDifMs);
//     this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
//   }
// };

// // Indexes for better performance
// // clientSchema.index({ phone: 1 }, { unique: true });
// clientSchema.index({ healthSpecialist: 1 });
// clientSchema.index({ programs: 1 });

// module.exports = mongoose.model('Client', clientSchema);