import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  execute(..._parameters: string[]): void {
    console.info(`
    ${chalk.bgMagenta('Программа подготовки данных для REST API сервера.')}
        Пример:
            cli.js ${chalk.green('--<command>')} ${chalk.blue('[--arguments]')}
        Команды:
            ${chalk.green(
    '--version'
  )}:                   # выводит номер версии
            ${chalk.green('--help')}:                      # печатает этот текст
            ${chalk.green('--import')} ${chalk.blue(
  '<path>'
)}:             # импортирует данные из TSV
            ${chalk.green('--generate')} ${chalk.blue(
  '<n> <path> <url>'
)}: # генерирует произвольное количество тестовых данных
    `);
  }
}
