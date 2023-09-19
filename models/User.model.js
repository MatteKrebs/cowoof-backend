const { Schema, model } = require("mongoose");

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
    loctionPostalCode: {
          type: Number,
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
      default: '/Users/Matt/Desktop/Ironhack/woof-practice/server/public/images/CW-user-avatar.png'
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

const User = model("User", userSchema);

module.exports = User;