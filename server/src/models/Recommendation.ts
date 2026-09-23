import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const recommendationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    category: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export type RecommendationDocument = InferSchemaType<typeof recommendationSchema>;

const Recommendation = mongoose.models.Recommendation || mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
