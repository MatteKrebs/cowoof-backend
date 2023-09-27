const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    petName: {
      type: String,
      required: [true, "This pet needs a name!"],
    },
    petAge: {
      type: Number,
      required: false
    },
    petAbout: {
      type: String,
      required: [true, "Woof! Tell us a little about yourself!"]
    },
    petImage: {
      type: String,
      default: 'https://i.pravatar.cc/300'
    },
    ownerId: {
      type: Schema.Types.ObjectId, ref: 'User' 
    },
    
  },
  {
    timestamps: true,
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;