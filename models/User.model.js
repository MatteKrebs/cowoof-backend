const { Schema, model } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userName: {
      type: String,
      required: [true, "Name is required."],
    },
    locationCountry: {
          type: String,
          // required: [true, 'Country is required.'],
        },
    locationCity: {
          type: String,
          // required: [true, 'City is required.'],
        },
    locationPostalCode: {
          type: String,
          // required: [true, 'Postal code is required.'],
        },
    availabilityNeeded: {
      type: [String],
      enum: ['Morning', 'Afternoon', 'Evening', 'Night', 'All Day', 'Overnight']
    },
    availabilityToHelp: {
      type: [String],
      enum: ['Morning', 'Afternoon', 'Evening', 'Night', 'All Day', 'Overnight']
    },
    userImage: {
      type: String,
    },
    userDescription: {
      type: String
    },
    usersPetId: {
      type: [Schema.Types.ObjectId], ref: 'Pet'
    },
    usersGroups: {
      type: [Schema.Types.ObjectId], ref: 'Group'
    }
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
const User = model("User", userSchema);

module.exports = User;