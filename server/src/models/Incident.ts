import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const incidentNoteSchema = new Schema(
  {
    author: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const incidentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['login', 'phishing', 'data', 'endpoint'],
      required: true
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['Open', 'Investigating', 'Resolved'],
      default: 'Open'
    },
    description: {
      type: String,
      required: true
    },
    evidence: [String],
    notes: [incidentNoteSchema]
  },
  { timestamps: true }
);

export type IncidentDocument = InferSchemaType<typeof incidentSchema>;

const Incident = mongoose.models.Incident || mongoose.model('Incident', incidentSchema);

export default Incident;
