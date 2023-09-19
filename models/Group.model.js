const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: [false, "Naming this group helps people find you!"],
    },
    groupCountry: {
      type: String,
    },
    groupCity: {
      type: String
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