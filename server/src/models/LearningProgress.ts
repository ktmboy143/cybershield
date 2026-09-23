import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const learningProgressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    completedLessons: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export type LearningProgressDocument = InferSchemaType<typeof learningProgressSchema>;

const LearningProgress = mongoose.models.LearningProgress || mongoose.model('LearningProgress', learningProgressSchema);

export default LearningProgress;
