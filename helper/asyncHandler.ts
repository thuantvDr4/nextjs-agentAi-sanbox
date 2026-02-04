import { NextResponse} from "next/server";
import {logResponse} from "@/services/logger.service";

export const handlerFetch = async<T> (res:NextResponse): Promise<T | null> => {
    console.log("%c[API REQUEST]", "color: #00C853", res);

    if (!res.ok) {
        return null;
    }
    const json = await res.json();
    return logResponse(json) as Promise<T>;
}