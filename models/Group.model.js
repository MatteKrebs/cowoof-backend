const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: [false, "Naming this group helps people find you!"],
    },
    location: {
      country: {
        type: String,
        required: [true, 'Country is required.'],
      },
      city: {
        type: String,
        required: [true, 'City is required.'],
      }
    },
    groupAdmin: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    members: {
      type: [Schema.Types.ObjectId], ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);

const Group = model("Group", groupSchema);

module.exports = Group;