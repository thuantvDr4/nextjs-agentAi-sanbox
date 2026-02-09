import {NextResponse} from "next/server";
import {logError, logRequest, logResponse} from "@/services/logger.service";

export const handlerFetch = async <T>(res: NextResponse): Promise<T | null> => {
    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        return logError(errorBody)
    }
    const json = await res.json();
    return logResponse(json) as Promise<T>;
}