import { Schema, model , Document } from "mongoose";

interface IState extends Document{
    name : string;
    description : string;
    status : string;
    createdAt : Date;
    updatedAt : Date;
    createdBy : string;
}

const stateSchema =new Schema<IState>({
    name: { type: String, required: true},
    description: { type: String, required: true},
    status: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date,  default: Date.now},
    createdBy: { type: String, required: true}
});

stateSchema.statics.aggregateStates = async function () {
    return this.aggregate([
        {
            $group: {
                _id: {
                  year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" },
                  day: { $dayOfMonth: "$createdAt" },
                  hour: { $hour: "$createdAt" }
                },
                count: { $sum: 1 },
                statuses: { $push: "$status" }
              }
        }
    ]);
};


const State = model<IState>('State', stateSchema);
export default State;