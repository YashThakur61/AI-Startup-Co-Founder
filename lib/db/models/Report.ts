import mongoose, { Schema, Document } from 'mongoose';
import type { ResearchResult, BusinessResult, PlanningResult, PitchResult } from '@/types';

export interface IReport extends Document {
  startupId: string;
  research: ResearchResult;
  business: BusinessResult;
  planning: PlanningResult;
  pitch: PitchResult;
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    startupId: { type: String, required: true, index: true },
    research: { type: Schema.Types.Mixed, required: true },
    business: { type: Schema.Types.Mixed, required: true },
    planning: { type: Schema.Types.Mixed, required: true },
    pitch: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);
export default Report;
