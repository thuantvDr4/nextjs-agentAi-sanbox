import {DecisionErrorType} from "@/types/agent";

export class DecisionError extends Error {
    constructor(
        public type: DecisionErrorType,
        public detail: any
    ) {
        super(type);
    }
}