import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_WORD } from "../utils/mutations";
import { QUERY_MY_WORDS_AND_MY_FRIENDS } from "../utils/queries";
export default function SendWord() {
  const { data, loading } = useQuery(QUERY_MY_WORDS_AND_MY_FRIENDS);
  const [sendWord, error] = useMutation(SEND_WORD);
  const [friends, setFriends] = useState([]);
  const [friendUsername, setFriendUsername] = useState("");
  const [recipientId, setRecipientId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [words, setWords] = useState([]);
  const [wordsToSend, setWordsToSend] = useState([]);
  const handleSendWord = async (word) => {
    let userId = data.me._id;
    try {
      const { data } = await sendWord({
        variables: {
          word: words,
          userId: userId,
          recipientId: recipientId,
        },
      });
    } catch (error) {
      console.log("Could not send word");
    }
  };
  const addWordToSend = (word) => {
    setWordsToSend([...wordsToSend, word]);
    setWords(data.me.words);
    setSearchTerm("");
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (data) {
      if (data.me.friends.length > 0) {
        setFriends(data.me.friends);
      }
      if (data.me.words.length > 0) {
        setWords(data.me.words);
      }
    }
  }, [data]);
  const filteredFriends = friends.filter((friend) =>
    friend.toLowerCase().includes(friendUsername.toLowerCase())
  );
  const filteredWords = words.filter((word) =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("words", words);
  console.log("friends", friends);
  return (
    <div>
      <h1>Send a Bouquet</h1>
      <h1>{wordsToSend.join(" ")}</h1>
      <div className="items-center">
        <input
          className="text-xl md:text-3xl mx-2 md:mx-5 border-2 border-gray-400 pt-2 px-4 rounded"
          type="text"
          placeholder="Search for a word..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <ul className="absolute mt-1 bg-white border border-gray-300 rounded z-10 left-1/2 transform -translate-x-1/2 w-full md:w-80">
            {filteredWords.map((word) => (
              <li
                key={word}
                onClick={() => addWordToSend(word)}
                className={`cursor-pointer  px-4 hover:bg-blue-300 hover:text-black`}
              >
                {word}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul className="absolute mt-1 bg-white border border-gray-300 rounded z-10 left-1/2 transform -translate-x-1/2 w-full md:w-80">
        {filteredFriends.map((friend) => (
          <li
            key={friend}
            onClick={() => handleSendWord(friend)}
            className={`cursor-pointer  px-4 hover:bg-blue-300 hover:text-black`}
          >
            {friend}
          </li>
        ))}
      </ul>
    </div>
  );
}
