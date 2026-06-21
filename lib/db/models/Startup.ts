import mongoose, { Schema, Document } from 'mongoose';

export interface IStartup extends Document {
  idea: string;
  targetMarket: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  reportId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StartupSchema = new Schema<IStartup>(
  {
    idea: { type: String, required: true },
    targetMarket: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
    reportId: { type: String },
  },
  { timestamps: true }
);

const Startup = mongoose.models.Startup || mongoose.model<IStartup>('Startup', StartupSchema);
export default Startup;
