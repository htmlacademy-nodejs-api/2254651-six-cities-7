import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { RentOffer } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private onImportedRentOffer(offer: RentOffer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [fileName] = parameters;
    const fileReader = new TSVFileReader(fileName.trim());
    fileReader.on('line', this.onImportedRentOffer);
    fileReader.on('end', this.onCompleteImport);
    try {
      fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${fileName}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
