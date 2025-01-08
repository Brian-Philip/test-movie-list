import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { CsvDataDto } from "../dtos/csv-data.dto";


export async function importAllCSV(directoryPath: string): Promise<CsvDataDto[]> {
    const directory = path.resolve(directoryPath);
    const files = fs.readdirSync(directory);
    const allData: CsvDataDto[] = [];
    for (const file of files) {
        const filePath = path.join(directory, file);

        if (file.endsWith('.csv')) {
            console.log(`Importando arquivo: ${file}`);

            try {
                allData.push(...await parseCSV(filePath));
                console.log(`Arquivo ${file} processado com sucesso:`);
            } catch (error) {
                console.error(`Erro ao processar o arquivo ${file}:`, error);
            }
        }
    }
    return allData;
}
async function parseCSV(filePath: string) {
    const data: CsvDataDto[] = [];
    const parser = fs.createReadStream(filePath).pipe(parse({ delimiter: ";", from_line: 2 }));
    for await (const record of parser) {
        data.push(record);
    }

    return data;
}