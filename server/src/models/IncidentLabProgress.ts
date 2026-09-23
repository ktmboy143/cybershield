import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const incidentLabProgressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    completedScenarios: { type: [String], default: [] },
    scores: { type: Map, of: Number, default: {} }
  },
  { timestamps: true }
);

export type IncidentLabProgressDocument = InferSchemaType<typeof incidentLabProgressSchema>;
const IncidentLabProgress = mongoose.models.IncidentLabProgress as mongoose.Model<IncidentLabProgressDocument> ||
  mongoose.model<IncidentLabProgressDocument>('IncidentLabProgress', incidentLabProgressSchema);

export default IncidentLabProgress;
