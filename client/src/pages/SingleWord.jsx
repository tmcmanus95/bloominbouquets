import { useParams } from "react-router-dom";
export default function SingleWord() {
  const { word } = useParams();
  const getWordData = async () => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const wordData = await response.json();
      console.log(wordData);
    } catch (error) {
      console.error("Error fetching word data:", error);
    }
    useEffect(() => {
      getWordData();
    }, [word]);
  };

  if (wordData) {
    console.log(wordData);
  }
}
