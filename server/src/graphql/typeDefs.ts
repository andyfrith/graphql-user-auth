import { gql } from 'apollo-server-express';
import * as fs from 'fs';
import * as path from 'path';

const schemaDirectory = path.join(__dirname, '../../graphql/');
const schema = fs
  .readdirSync(schemaDirectory)
  .filter((fileName) => fileName.endsWith('.graphql'))
  .map((fileName) => path.join(schemaDirectory, fileName))
  .map((filePath) => fs.readFileSync(filePath, 'utf8'))
  .reduce((a, b) => {
    return a + '\n\n' + b;
  }, '');

export const typeDefs = gql`
  ${schema}
`;
