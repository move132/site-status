import fs from 'fs'
import yaml from 'js-yaml'

const config = yaml.load(fs.readFileSync('./config.yaml', 'utf-8'))

export default config