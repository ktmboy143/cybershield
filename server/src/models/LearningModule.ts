import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const learningModuleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true
    },
    durationMinutes: {
      type: Number,
      required: true,
      min: 5
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export type LearningModuleDocument = InferSchemaType<typeof learningModuleSchema>;

const LearningModule = mongoose.models.LearningModule as mongoose.Model<LearningModuleDocument> ||
  mongoose.model<LearningModuleDocument>('LearningModule', learningModuleSchema);

export default LearningModule;
