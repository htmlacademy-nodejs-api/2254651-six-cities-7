import got from 'got';
import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TSVRentOfferGenerator } from '../../shared/libs/rent-offer-generator/tsv-rent-offer-generator.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async write(filePath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVRentOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filePath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
      console.log('initialData ', this.initialData);
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, url] = parameters;
    const rentOfferCount = Number.parseInt(count, 10);

    console.log('count ', count);
    console.log('filePath ', filePath);
    console.log('url ', url);
    try {
      await this.load(url);
      await this.write(filePath, rentOfferCount);
    } catch (error: unknown) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error);
      }
    }
  }
}
