import mongoose, { Schema, models } from "mongoose";

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
      likes: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );

  const Recipe = models.Recipe || mongoose.model("Recipe", recipeSchema);
  export default Recipe;