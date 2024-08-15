import mongoose, { Schema, models } from "mongoose";
import User from "./user";

const recipeSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      imageUrl: {
          type: String,
          required: true,
      },
      description: {
        type: String,
      },
      cookingTime: {
        type: Number,
      },
      likedBy: [
        {
          type: Schema.Types.ObjectId, 
          ref: 'User'
        }
      ],
    },
    { timestamps: true }
  );

  const Recipe = models.Recipe || mongoose.model("Recipe", recipeSchema);
  export default Recipe;