import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const quizResultSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1
    },
    answers: [
      {
        questionId: String,
        selectedIndex: Number,
        isCorrect: Boolean
      }
    ],
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export type QuizResultDocument = InferSchemaType<typeof quizResultSchema>;

const QuizResult = mongoose.models.QuizResult || mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;
