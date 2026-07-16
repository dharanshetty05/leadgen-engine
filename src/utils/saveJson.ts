import fs from "fs/promises";

export async function saveJson(path: string, data: unknown) {

    await fs.writeFile(
        path,
        JSON.stringify(data, null, 2)
    );

}