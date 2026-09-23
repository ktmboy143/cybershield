import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const securityReportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['quarterly', 'phishing', 'password', 'website', 'incident'],
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['Complete', 'Needs review', 'In progress'],
      default: 'Complete'
    },
    summary: {
      type: String,
      required: true
    },
    generatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export type SecurityReportDocument = InferSchemaType<typeof securityReportSchema>;

const SecurityReport = mongoose.models.SecurityReport || mongoose.model('SecurityReport', securityReportSchema);

export default SecurityReport;
