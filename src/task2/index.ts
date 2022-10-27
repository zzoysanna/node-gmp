import fs from 'fs'
import csvtojson from 'csvtojson'

function convertFile (fileName: string): void {
  csvtojson()
    .fromStream(fs.createReadStream(`./csv/${fileName}.csv`))
    .on('error', (error: Error) => console.log('read error', error))
    .pipe(
      fs.createWriteStream(`./output/${fileName}.txt`)
    )
    .on('error', (error: Error) => console.log('write error', error))
    .on('finish', () => console.log(`${fileName}.txt is ready`))
}

console.log('enter name of csv file:')
process.stdin.on('data', (fileName: Buffer) => {
  try {
    const name = fileName.toString().trim()
    fs.accessSync(`./csv/${name}.csv`)
    convertFile(name)
  } catch (error) {
    console.log('no access to file')
  }
})
