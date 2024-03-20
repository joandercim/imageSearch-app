import { IItem } from "../models/IItem";
import ImgCard from "./ImgCard";

interface ISearchResultsProps {
    searchResults: IItem[] | undefined
}

function SearchResults({ searchResults }: ISearchResultsProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-2 mt-10"
    >
      {searchResults?.map((item, index) => {
        return (
          <ImgCard
            imgUrl={item.link}
            imgTitle={item.title}
            key={`${item.title}_${index}`}
          />
        );
      })}
    </div>
  );
}
export default SearchResults;
