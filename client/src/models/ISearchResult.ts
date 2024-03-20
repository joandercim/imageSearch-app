import { IItem } from './IItem';
import { ISearchInformation } from './ISearchInformation';

export interface ISearchResults {
  searchInformation: ISearchInformation;
  items: IItem[];
  spelling: {
    correctedQuery: string;
  };
}
